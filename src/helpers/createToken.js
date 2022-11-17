const jwt = require("jsonwebtoken");

const createJWT = (id = "") => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Hey Dude, it cannot create token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { createJWT };
