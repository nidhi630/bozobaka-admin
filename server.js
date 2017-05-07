"use strict";

const express = require("express");
const path = require("path");

// create our app
let app = express();

app.use(express.static("public"));
app.set("views", path.join(__dirname, "public"));

// set the view engine to ejs
app.set("view engine", "ejs");

// send all requests to index so browserHistory in React Router works
app.get("*", function (req, res) {
    const manifest = require("./manifest.json");

    res.render("index", {
        bundlePath: manifest.main.js.substring(8),
        vendorPath: manifest.vendor.js.substring(8)
    });
});

app.listen(3000, function () {
    console.log("listening on http://localhost:3000");
});
