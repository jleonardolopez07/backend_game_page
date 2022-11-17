const { response, request, next } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const tokenValidation = async (req = request, res = response, next) => {
  const token = req.header("x_token");
  if (!token) {
    return res.status(401).json({ msg: "It is missing token in the request" });
  }

  try {
    //Verify token
    const { id } = await jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    //Get user with id
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(401)
        .json({ msg: "Hey Dude, your ID have not been validated" });
    }
    if (!user.state) {
      return res.status(401).json({ msg: "Hey Dude, your state is in False" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Hey Dude, token have not been validated",
    });
  }
};

module.exports = { tokenValidation };
