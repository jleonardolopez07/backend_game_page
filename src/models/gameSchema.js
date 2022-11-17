const { Schema, model } = require("mongoose");

const gameSchema = Schema({
  name: { type: String, uppercase: true },
  year: { type: Number },
  linkGame: { type: String },
  unitSold: { type: String },
  gameRanking: { type: String, uppercase: true },
  serie: { type: Schema.Types.ObjectId, ref: "Serie" },
  serieName: { type: String },
  consola: { type: Schema.Types.ObjectId, ref: "consola" },
});

module.exports = model("Game", gameSchema);
