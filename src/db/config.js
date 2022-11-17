const mongoose = require("mongoose");
const url_mongoose = process.env.MONGO_URL;

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    return console.log("Congrat Dude, we connected with DB");
  } catch (error) {
    throw new Error("Sorry Dude, the app cannot reach it");
  }
};

connectDB();
module.exports = { connectDB };
