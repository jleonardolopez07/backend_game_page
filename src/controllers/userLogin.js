const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const { createJWT } = require("../helpers/createToken");
const User = require("../models/userSchema");

const login = async (req, res = response) => {
  const { password, email } = req.body;
  const usuario = await User.findOne({ email });

  try {
    //Compare pasword
    const comparePassword = await bcryptjs.compareSync(
      password,
      usuario.password
    );
    if (!comparePassword) {
      return res.status(401).json({
        msg: "Hey Dude, Something went wrong with your password, try to check it first",
      });
    }
    //create token
    const token = await createJWT(usuario.id);

    res.json({
      msg: "You Dude are Login",
      token,
    });
  } catch (error) {
    if (error) {
      res.status(400).json({
        msg: "Hey Dude, Token cannot create",
      });
    }
  }
};

module.exports = { login };
