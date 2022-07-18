const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const api = require("./controllers/chargeCtrl");
const { port } = require("./consts/consts");
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

app.use("/api", api);

app.listen(port, () => {
  console.log(`server listen on port: ${port}`);
});
