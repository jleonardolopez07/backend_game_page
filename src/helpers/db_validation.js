const Consola = require("../models/consoleSchema");
const Serie = require("../models/serieSchema");
const User = require("../models/userSchema");

const emailValidation = async (email = "") => {
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error("Hey Dude, the email exist Already-helpers");
  }
};

const notExistEmail = async (email = "") => {
  const EmailExist = await User.findOne({ email });
  if (!EmailExist) {
    throw new Error(
      "Hey Dude, something went wrong, please check your credential -email not found"
    );
  }
};

const idValidation = async (id = "") => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error("Hey Dude, the id not exist in db-helpers");
  }
};

const stateValidation = async (email = "") => {
  const stateExist = await User.findOne({ email });
  if (!stateExist.state) {
    throw new Error(
      "Hey Dude, something went wrong, please check your credential -state:false"
    );
  }
};

const existSerie = async (name = "") => {
  const serieExist = await Serie.findOne({ name });
  if (serieExist) {
    throw new Error("Hey Dude, this Serie exist already");
  }
};

const notExistSerie = async (name = "") => {
  const serieExist = await Serie.findOne({ name });
  if (!serieExist) {
    throw new Error("Hey Dude, this Serie not exist already");
  }
};

/* const existSerieInTrue = async (name = "", req = request) => {
  console.log("haber si entra aqui");
  const serieExist = await Serie.findOne({ name: name });
  if (serieExist) {
    console.log("si entro por aqui");
    req.serie = serieExist;
  } else {
    throw new Error("Hey Dude, It cannot find the serie, try another option");
  }
}; */

const existConsole = async (consola = "") => {
  const consoleExist = await Consola.findOne({ consola });
  if (!consoleExist) {
    throw new Error("Hey Dude, The console is not in DB");
  }
};

module.exports = {
  idValidation,
  emailValidation,
  notExistEmail,
  stateValidation,
  existSerie,
  existConsole,
  notExistSerie,
};
