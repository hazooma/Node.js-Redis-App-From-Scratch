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
  client.hgetall(id, (err, obj) => {
    if (!obj) {
      res.render("searchusers", { error: "User Not Found !" });
    } else {
      obj.id = id;
      res.render("details", { user: obj });
    }
  });
});

app.get("/addusers", (req, res, next) => {
  res.render("addusers");
});

app.post("/addusers", (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  client.hmset(4, "username", username, "email", email, err => {
    if (!err) {
      console.log("added");
    }
  });
});

app.listen(PORT, error => {
  if (error) console.log(error);
  else console.log("conncted");
});
