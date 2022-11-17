const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/userSchema");

const getUser = async (req, res = response) => {
  const { until = 5, since = 0 } = req.query;
  const resp = await Promise.all([
    User.countDocuments({ estado: true }),
    User.find({ estado: true }).limit(Number(until)).skip(Number(since)),
  ]);

  res.json({ msg: "from get app without id", resp });
};

const getUserById = async (req, res = response) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({
    msg: user,
  });
};

const postUser = async (req = request, res = response) => {
  const { name, email, password } = req.body;

  const user = new User({ name, email, password });

  const salt = bcryptjs.genSaltSync(10);
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({ msg: "from post user app", user });
};

const putUser = async (req, res = response) => {
  const { id } = req.user;
  const { name, email, password, newPassword } = req.body;

  try {
    if (password && newPassword) {
      const salt = bcryptjs.genSaltSync(10);
      const changePassword = bcryptjs.hashSync(newPassword, salt);
      const passwordChangeByTokenVerify = await User.findByIdAndUpdate(
        id,
        { password: changePassword },
        { new: true }
      );
    }

    const nameAndEmailChangeByTokenVerify = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );
    if (!nameAndEmailChangeByTokenVerify) {
      res
        .status(401)
        .json({ msg: "Hey Dude something went wrong - controller " });
    }

    res.json({
      msg: "from put app",
      user: nameAndEmailChangeByTokenVerify,
    });
  } catch (error) {
    res.json({ msg: "your password is incorrect, please try again" });
  }
};

const deleteUser = async (req, res = response) => {
  const { id } = req.user;
  const stateChange = await User.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  if (!stateChange) {
    res
      .status(401)
      .json({ msg: "Hey Dude something went wrong - controller " });
  }
  res.json({ msg: `${stateChange.name} have been stop the account` });
};

module.exports = { getUser, postUser, putUser, deleteUser, getUserById };
