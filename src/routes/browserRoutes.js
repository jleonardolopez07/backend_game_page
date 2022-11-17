const Router = require("express");
const { browserController } = require("../controllers/browserController");

const browserRouter = Router();

browserRouter.get("/:dato/:valor", browserController);

module.exports = browserRouter;
