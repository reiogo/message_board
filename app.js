const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const PORT = 8000;

const links = [
  { href: "/", text: "Home" },
  { href: "new", text: "Message Submission" },
];


const messages = [
  {
    id: 1,
    text: "Buongiorno",
    user: "Giuseppe",
    added: new Date().toDateString()
  },
  {
    id: 2,
    text: "Hi there!",
    user: "Amando",
    added: new Date().toDateString()
  },
  {
    id: 3,
    text: "Hello World!",
    user: "Charles",
    added: new Date().toDateString()
  }
];

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {title: "Mini Messageboard", messages: messages, links: links});
});
app.get("/new", (req, res) => {
  res.render("form", {links: links});
});
app.get("/message", (req, res) => {
  res.render("message", {title: "Mini Messageboard", messages: messages, messageId: req.query.id, links: links});
});

app.use(express.urlencoded({ extended: true }));
app.post("/new", (req, res) => {
  messageText = req.body.message
  messageUser = req.body.user
  const idNum = messages.length + 1;
  messages.push({ id: idNum, text: messageText, user: messageUser, added: new Date().toDateString()});
  res.redirect("/");
});

app.use(express.static(assetsPath));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen( PORT, () => {
  console.log("Running");
});

