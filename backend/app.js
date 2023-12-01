const express = require("express");
const suggestRoute = require("./routes/suggestRoute");
const bodyParser = require("body-parser");
var cors = require('cors');
const app = express();

app.use(cors());
port = 8080
app.use(bodyParser.json());
app.use("/api/suggest", suggestRoute);

app.listen(port);