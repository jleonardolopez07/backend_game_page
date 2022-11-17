const { request, response } = require("express");
const { scrappingGame } = require("../helpers/scrappingGame");
const Consola = require("../models/consoleSchema");
const Game = require("../models/gameSchema");
const Serie = require("../models/serieSchema");

const getSerie = async (req, res = response) => {
  const { page = 5, since = 0 } = req.query;
  const user = req.user;

  const resp = await Promise.all([
    Serie.countDocuments(),
    Serie.find({ state: true })
      .limit(Number(page))
      .skip(Number(since))
      .populate("user", "name")
      .populate("consola"),
  ]);

  res.json({
    msg: "mensaje get desde controller serie",
    resp,
  });
};

const getSerieById = async (req, res) => {
  const { id } = req.params;
  const serie = await Serie.findById(id);
  if (!serie) {
    res.json({ msg: `Hey Dude, the serie id:${id} it is not found in DB` });
  }
  res.json({
    msg: "mensaje get con id desde router series",
    serie,
  });
};

const postSerie = async (req, res) => {
  const user = req.user;
  const { link, name, consola } = req.body;
  const consolaCall = await Consola.find({ consola });
  const data = {
    name,
    link,
    user: user.id,
    consola: consolaCall[0].id,
  };

  const serie = new Serie(data);
  await serie.save();
  let dataGame = [];
  //const arrayGame2 = arrayGame[1];
  if (serie) {
    // await scrappingGame(link).then((val) => {return const game= new Game});
    await scrappingGame(link).then((val) => dataGame.push(val));
    const newArray = await dataGame[0].map((value) => {
      const data = {
        name: value.name,
        linkGame: value.linkGame,
        year: value.year,
        serie: serie.id,
        serieName: serie.name,
        unitSold: value.unitSold,
        gameRanking: value.gameRankings,
        consola: consolaCall[0].id,
      };
      const game = new Game(data);
      return game.save();
    });
  }
  res.json({
    msg: "mensaje post desde router series",
    serie,
  });
};

const putSerie = async (req, res) => {
  const { name, newName } = req.body;

  const serie = await Serie.findOneAndUpdate(
    { name },
    { name: newName },
    { new: true }
  );
  if (!serie) {
    res.json({ msg: `Hey Dude, the Serie  is not found in DB` });
  }

  res.json({
    msg: "mensaje put desde router series",
    serie,
  });
};

const deleteSerie = async (req, res) => {
  const { name } = req.body;

  const game = await Game.find({ serieName: name.toUpperCase() }).populate(
    "serie",
    "name"
  );

  const borrarGame = game.forEach(
    async (value) => await Game.findOneAndDelete(value.id)
  );
  const serie = await Serie.findOneAndDelete({ name: name.toUpperCase() });
  /*   const seriefind = await Serie.findOneAndUpdate(
    { name },
    { state: false },
    { new: true }
  ); */

  res.json({
    msg: `${serie.name} have been deleted`,
  });
};
module.exports = { getSerie, getSerieById, postSerie, putSerie, deleteSerie };
