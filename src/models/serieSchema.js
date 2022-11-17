const { Schema, model } = require("mongoose");

const serieSchema = Schema({
  name: {
    type: String,
    required: [true, "The name of teh serie is required - Schema"],
    unique: true,
    uppercase: true,
  },
  link: {
    type: String,
    required: [true, "The name of teh serie is required - Schema"],
    unique: true,
  },
  state: { type: Boolean, default: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  consola: {
    type: Schema.Types.ObjectId,
    ref: "consola",
    require: true,
    uppercase: true,
  },
});

serieSchema.methods.toJSON = function (params) {
  const { __v, ...data } = this.toObject();
  //usuario.uid = _id;
  return data;
};

module.exports = model("Serie", serieSchema);
