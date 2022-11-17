const { Schema, model } = require("mongoose");

const rolesSchema = Schema({
  role: {
    type: String,
    required: [true, "Hey Dude, please supply the rol"],
  },
});

module.exports = model("role", rolesSchema);
