const { response } = require("express");
const Console = require("../models/consoleSchema");
const Game = require("../models/gameSchema");
const Serie = require("../models/serieSchema");
const User = require("../models/userSchema");
const { ObjectId } = require("mongoose").Types;

const datosPermitidos = ["serie", "user", "game"];

const buscarUser = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);
  if (esMongoID) {
    const userfind = await User.findById(termino);
    return res.json({ result: userfind ? [userfind] : [] });
  }
  const regex = new RegExp(termino, "i");
  const user = await User.find({ name: regex });
  /*   const user = await User.find({            // deje de la forma de arriba la busqueda proque esta no filtra correctamente
    $or: [{ nombre: regex }, { email: regex }],
    $and: [{ state: true }],
  }); */
  res.json({ result: user });
};

const buscarSerie = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);
  if (esMongoID) {
    const seriefind = await User.findById(termino)
      .populate("user", "name")
      .populate("consola", "name");
    return res.json({ result: seriefind ? [seriefind] : [] });
  }
  const regex = new RegExp(termino, "i");

  const serie = await Serie.find({ name: regex })
    .populate("user", "name")
    .populate("consola", "name");
  res.json({ result: serie });
};

const buscarGame = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);
  if (esMongoID) {
    const gamefind = await Game.findById(termino)
      .populate("serie", "name")
      .populate("consola", "name");
    return res.json({ result: gamefind ? [gamefind] : [] });
  }
  const regex = new RegExp(termino, "i");

  const game = await Game.find({ linkGame: regex })
    .populate("serie", "name")
    .populate("consola", "name");
  res.json({ result: game });
};

const browserController = (req, res = response) => {
  const { dato, valor } = req.params;

  if (!datosPermitidos.includes(dato)) {
    return res.status(400).json({
      msg: `La serie permitidas son ${datosPermitidos}`,
    });
  }

  switch (dato) {
    case "user":
      buscarUser(valor, res);
      break;
    case "serie":
      buscarSerie(valor, res);
      break;
    case "game":
      buscarGame(valor, res);
      break;

    default:
      res.status(500).json({ msg: "Se me olvido hacer esta busqueda" });
  }
};

module.exports = { browserController };
