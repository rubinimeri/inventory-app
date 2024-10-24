const express = require("express");
const path = require("node:path");
require("dotenv").config();

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Inventory App"));

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}!`));