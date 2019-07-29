import express from "express";
import expresshbs from "express-handlebars";
import path from "path";
import bodybarser from "body-parser";
import methodoverride from "method-override";
import redis from "redis";

// chose port
const PORT = 6666;

// init app
const app = express();

app.engine("handlebars", expresshbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
