const { response, request, next } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/userSchema");

const passwordValidation = async (req = request, res = response, next) => {
  const { id } = req.user;
  const { password } = req.body;
  if (password) {
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({
        msg: "Hey Dude, it something wrong with your credential, it is not in DB",
      });
    }
    const comparePassword = await bcryptjs.compareSync(password, user.password);
    if (!comparePassword) {
      return res.status(401).json({
        msg: "Hey Dude, it something wrong with your password, it doesnt match",
      });
    }
  }
  next();
};

module.exports = { passwordValidation };
