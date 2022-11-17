const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUser,
  postUser,
  putUser,
  deleteUser,
  getUserById,
} = require("../controllers/userController");
const {
  emailValidation,
  idValidation,
  stateValidation,
} = require("../helpers/db_validation");
const { passwordValidation } = require("../middlewears/passwordValidation");
const {
  haveRolFromToken,
} = require("../middlewears/stateValidationRoleFromToken");
const { tokenValidation } = require("../middlewears/tokenValidation");
const { generalResult } = require("../middlewears/validationResult");
const routes = Router();
/////////////////////////////////////////////////////////////////////////////////////

routes.get("/", [tokenValidation, generalResult], getUser);
routes.get(
  "/:id",
  [
    tokenValidation,
    check("id", "It is not mongo Id").isMongoId(),
    generalResult,
  ],
  getUserById
);

routes.post(
  "/",
  [
    check("name", "Hey Dude, please type your name").not().isEmpty(),
    check("email", "Hey Dude, please type your email").not().isEmpty(),
    check("email", "email exist Dude").custom(emailValidation),
    check("password", "Hey Dude, please type your password").not().isEmpty(),
    check("password", "Hey Dude, your password is not long").isLength({
      min: 5,
      max: 6,
    }),
    // check("role", "Hey Dude, the rol is wrong").isIn([
    //"ADMIN_ROLE",
    // "USER_ROLE",
    // ]),
    generalResult,
  ],
  postUser
);

routes.put(
  "/",
  [
    tokenValidation,
    //haveRolFromToken("ADMIN_ROLE"),
    //check("name", "Hey Dude, please type your name").not().isEmpty(),
    //check("id", "Hey Dude, it is not a id valid").isMongoId(),
    //check("id").custom(idValidation),
    passwordValidation,
    generalResult,
  ],
  putUser
);

routes.delete(
  "/",
  [tokenValidation, haveRolFromToken("ADMIN_ROLE", "USER_ROLE"), generalResult],
  deleteUser
);

module.exports = { routes };
