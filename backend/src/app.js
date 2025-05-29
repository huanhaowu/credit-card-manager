const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/cards", require("./routes/card.routes"));

module.exports = app;
