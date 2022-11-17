const axios = require("axios");
const cheerio = require("cheerio");

const scrappingGame = async (link) => {
  const datosGame = [];
  try {
    const response = await axios.get(link);
    const $ = await cheerio.load(response.data);

    const tabla = $('table[class="wikitable plainrowheaders"]>tbody > tr');

    const runer = tabla.map((i, el) => {
      const name = $(el).find("th >i >a").text();
      const linkGame = $(el).find("th >i >a").attr("href");
      const year = Number($(el).find("td:first").text());
      const getUnitsSold = $(el).find("td:nth-child(3)").text();
      const getGameRankings = $(el).find("td:nth-child(4)").text();

      const unitSold = Number(getUnitsSold.slice(0, getUnitsSold.indexOf("[")));
      const gameRankings = getGameRankings.slice(
        0,
        getGameRankings.indexOf("[")
      );

      datosGame.push({
        name,
        year,
        linkGame,
        unitSold,
        gameRankings,
      });
    });
    //console.log(datosGame);
    return datosGame;
    //console.log(datosGame);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { scrappingGame };
