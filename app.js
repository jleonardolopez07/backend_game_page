const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { routes } = require("./src/routes/userRoutes");
const { connectDB } = require("./src/db/config");
const { routerAuth } = require("./src/routes/userAuth");
const { serieRoutes } = require("./src/routes/serieRoutes");
const browserRouter = require("./src/routes/browserRoutes");
const { gameRoutes } = require("./src/routes/gameRoutes");

const port = process.env.PORT;
const userPath = "/api/user";
const userAuth = "/api/user/auth";
const seriePath = "/api/serie";
const browserPath = "/api/browser";
const gamePath = "/api/game";
// puedo mejorar estos path colocandolos todos en un objeto
const app = express();

app.use(cors());
//app.use(express.static());
app.use(express.json());
app.use(userPath, routes);
app.use(userAuth, routerAuth);
app.use(seriePath, serieRoutes);
app.use(gamePath, gameRoutes);
app.use(browserPath, browserRouter);

app.all("*", (req, res) => {
  res.status(400).send("Hey Dude, sorry but this is Error 404, page not found");
});

app.listen(port, () => {
  console.log(`Server is connected to port: ${port}`);
});
