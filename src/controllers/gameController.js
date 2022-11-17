const { request, response } = require("express");
const Game = require("../models/gameSchema");

const getGame = async (req, res = response) => {
  const { page = 5, since = 0 } = req.query;

  const resp = await Promise.all([
    Game.countDocuments(),
    Game.find({ state: true })
      .limit(Number(page))
      .skip(Number(since))
      .populate("consola")
      .populate("serie", "name"),
  ]);

  res.json({
    msg: "mensaje get desde controller Game",
    resp,
  });
};

const getGameById = async (req, res) => {
  const { id } = req.params;
  const game = await Game.findById(id);
  if (!game) {
    res.json({ msg: `Hey Dude, the game id:${id} it is not found in DB` });
  }
  res.json({
    msg: "mensaje get game with id since controller",
    game,
  });
};

module.exports = { getGame, getGameById };
