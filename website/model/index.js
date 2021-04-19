const express = require("express");
const app = express();
var cors = require("cors");
const PORT = 8000;

app.use(cors());
app.use(express.static("public"));

app.use("/model", express.static(__dirname + "/model.json"));

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
