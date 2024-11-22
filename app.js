const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const PORT = 3000;


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.use(express.static(assetsPath));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen( PORT, () => {
  console.log("Running");
});

