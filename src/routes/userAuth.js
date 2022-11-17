const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/userLogin");
const { notExistEmail, stateValidation } = require("../helpers/db_validation");
const { generalResult } = require("../middlewears/validationResult");

const routerAuth = Router();

routerAuth.post(
  "/",
  [
    check("email", "your Email cannot be in blank, type one please")
      .not()
      .isEmpty(),
    check("password", "your Password cannot be in blank, type one please")
      .not()
      .isEmpty(),
    check("email").custom(notExistEmail),
    check("email").custom(stateValidation),
    generalResult,
  ],
  login
);

module.exports = { routerAuth };
