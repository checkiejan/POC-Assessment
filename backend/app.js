const express = require("express");
const suggestRoute = require("./routes/suggestRoute");
const assignmentRoute = require("./routes/assignmentRoute");
const missionRoute = require("./routes/missionRoute")
const bodyParser = require("body-parser");
var cors = require('cors');
const app = express();

app.use(cors());
port = 8080;
app.use(bodyParser.json());
// app.use(express.json())
app.use("/api/suggest", suggestRoute);
app.use("/api/mission", missionRoute);
app.use("/api/assignment", assignmentRoute);

app.listen(port);