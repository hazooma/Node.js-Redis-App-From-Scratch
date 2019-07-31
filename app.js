import express from "express";
import expresshbs from "express-handlebars";
import path from "path";
import bodybarser from "body-parser";
import methodoverride from "method-override";
import redis from "redis";

// Create Redis Client
let client = redis.createClient();
client.on("connect", () => {
  console.log("REdis Connected !");
});

// Chose port
const PORT = 4000;

// Init app
const app = express();

// View Engine
app.engine("handlebars", expresshbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body Parser
app.use(bodybarser.json());
app.use(bodybarser.urlencoded({ extended: false }));

app.use(methodoverride("_method"));

app.get("/", (req, res, next) => {
  res.render("searchusers");
});

app.post("/users/serach", (req, res, next) => {
  let id = req.body.id;
});
app.listen(PORT, error => {
  if (error) console.log(error);
  else console.log("conncted");
});
