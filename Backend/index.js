/*----- Express -----*/
const express = require("express");
const app = express();
let port = process.env.PORT || 5555;

/*----- Modules -----*/
require("./models/dbConfig");
const bodyParser = require("body-parser");
const cors = require("cors");

/*----- Routes -----*/

const LettersRoutes = require("./routes/lettersController");
var corsOptions = {
    origin: 'https://longest-fr.netlify.app',
    optionsSuccessStatus: 200
  }
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use("/letters", LettersRoutes);

app.listen(port, () => console.log("Server started"));
