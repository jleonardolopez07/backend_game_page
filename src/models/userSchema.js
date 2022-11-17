const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "Please type your name Dude-From Schema"],
  },
  email: {
    type: String,
    required: [true, "Please type your email Dude-From Schema"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please type your password Dude-From Schema"],
  },
  role: {
    type: String,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
    default: "USER_ROLE",
  },
  games: {
    type: String,
  },
  state: {
    type: Boolean,
    default: true,
  },
});

userSchema.methods.toJSON = function (params) {
  const { __v, password, _id, ...usuario } = this.toObject();
  //usuario.uid = _id;
  return usuario;
};
module.exports = model("User", userSchema);
