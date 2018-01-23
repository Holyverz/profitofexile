const fetch = require("node-fetch");
const express = require("express");
const config = require("./config.json");
const app = express();
const PORT = config.PORT || 3000; //if doesnt exist port = 3000
const POENINJA_BASEURL =
    "http://poe.ninja/api/Data/GetCurrencyOverview?league=";
app.use(express.static("public"));

app.get("/poeninja", (req, res) => {
    //req.body.league GETLEAGUE
    const jsonNinja = fetch(`${POENINJA_BASEURL}Abyss`)
        .then(data => data.json())
        .then(json => res.send(json));
});

app.listen(PORT);
console.log(`Listening on, Port : ${PORT}`);
