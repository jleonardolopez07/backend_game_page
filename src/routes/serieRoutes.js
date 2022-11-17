const Router = require("express");
const { check } = require("express-validator");
const {
  getSerie,
  getSerieById,
  postSerie,
  putSerie,
  deleteSerie,
} = require("../controllers/serieController");
const {
  existSerie,
  existConsole,
  notExistSerie,
} = require("../helpers/db_validation");
const {
  haveRolFromToken,
} = require("../middlewears/stateValidationRoleFromToken");
const { tokenValidation } = require("../middlewears/tokenValidation");
const { generalResult } = require("../middlewears/validationResult");

const serieRoutes = Router();

serieRoutes.get("/", [tokenValidation, generalResult], getSerie);

serieRoutes.get(
  "/:id",
  [
    tokenValidation,
    check("id", "It is not mongo Id").isMongoId(),
    //check("name").custom(existSerie),
    generalResult,
  ],
  getSerieById
);

serieRoutes.post(
  "/",
  [
    tokenValidation,
    haveRolFromToken("ADMIN_ROLE"),
    check("link", "Hey Dude, please type the link of teh serie")
      .not()
      .isEmpty(),
    check("name", "Hey Dude, please type the name of the serie")
      .not()
      .isEmpty(),
    check("name").custom(existSerie),
    check("consola", "Hey Dude, please type the name of the console")
      .not()
      .isEmpty(),
    check("consola").custom(existConsole),
    generalResult,
  ],
  postSerie
);

serieRoutes.put(
  "/",
  [
    tokenValidation,
    haveRolFromToken("ADMIN_ROLE"),
    check("name", "Hey Dude, please type the name of the serie")
      .not()
      .isEmpty(),
    check("newName", "Hey Dude, please type the name of the serie")
      .not()
      .isEmpty(),
    check("newName").custom(existSerie),
    generalResult,
  ],
  putSerie
);

serieRoutes.delete(
  "/",
  [
    tokenValidation,
    haveRolFromToken("ADMIN_ROLE"),
    check("name", "Hey Dude, please type the name of the serie")
      .not()
      .isEmpty(),
    check("name").custom(notExistSerie),
    generalResult,
  ],
  deleteSerie
);

module.exports = { serieRoutes };
