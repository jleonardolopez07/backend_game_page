const { response, request, next } = require("express");
const Roles = require("../models/roleSchema");

const haveRolFromToken = (...roles) => {
  return async (req, res = response, next) => {
    // const { role } = req.user.role;
    if (!req.user) {
      return res.status(401).json({
        msg: "He Dude, it try to verify your Role before to verify token",
      });
    }
    const { role } = req.user;
    const roleExist = await Roles.findOne({ role });

    if (!roleExist) {
      return res.status(401).json({
        msg: "Hey Dude, it something wrong with Rol, it is not in DB",
      });
    }

    if (!roles.includes(roleExist.role)) {
      return res.status(401).json({
        msg: "He Dude, You don't have a rol that allow you here",
      });
    }
    next();
  };
};

module.exports = { haveRolFromToken };
