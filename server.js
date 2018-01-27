const fetch = require("node-fetch");
const express = require("express");
const config = require("./config.json");
const app = express();
const PORT = config.PORT || 3000; //if doesnt exist port = 3000
const firebase = require("./firebase.js");
const POENINJA_BASEURL =
    "http://poe.ninja/api/Data/GetCurrencyOverview?league=";
app.use(express.static("public"));
app.get("/poeninja", (req, res) => {
    //req.body.league GETLEAGUE
    const dbReference = firebase.database().ref(); //reference to the database

    const jsonNinja = fetch(`${POENINJA_BASEURL}Abyss`)
        .then(data => data.json())
        .then(json => {
            const filteredJson = json.lines.reduce((acc, cur) => {
                acc.push({
                    name: cur.currencyTypeName,
                    chaos: cur.chaosEquivalent
                });
                return acc;
            }, []);
            dbReference.child("/poeninja/currency/").set(filteredJson);
            res.send(filteredJson);
        });
});
// app.get("/fb", (req, res) => {
//     const dbReference = firebase.database().ref(); //reference to the database
//     dbReference.child("/cashmoneyz/vaal").set("1 HH");
//     dbReference
//         .child("/cashmoneyz/")
//         .once("value")
//         .then(s => console.log(s.val()));
// });

app.listen(PORT);
console.log(`Listening on, Port : ${PORT}`);
console.log(firebase.app().name);
