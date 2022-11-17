const Router = require("express");
const { check } = require("express-validator");
const { tokenValidation } = require("../middlewears/tokenValidation");
const {
  haveRolFromToken,
} = require("../middlewears/stateValidationRoleFromToken");
const { generalResult } = require("../middlewears/validationResult");
const { getGame, getGameById } = require("../controllers/gameController");

const gameRoutes = Router();

gameRoutes.get(
  "/",
  [tokenValidation, haveRolFromToken("ADMIN_ROLE", "USER_ROLE"), generalResult],
  getGame
);

gameRoutes.get(
  "/:id",
  [
    tokenValidation,
    haveRolFromToken("ADMIN_ROLE", "USER_ROLE"),
    check("id", "It is not mongo Id").isMongoId(),
    generalResult,
  ],
  getGameById
);

module.exports = { gameRoutes };
