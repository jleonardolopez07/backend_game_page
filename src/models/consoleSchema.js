const { Schema, model } = require("mongoose");

const consoleSchema = Schema({
  consola: {
    type: String,
    required: [true, "Hey Dude, please supply the name console"],
    uppercase: true,
  },
});

consoleSchema.methods.toJSON = function (params) {
  const { __v, ...data } = this.toObject();
  //usuario.uid = _id;
  return data;
};
module.exports = model("consola", consoleSchema);
