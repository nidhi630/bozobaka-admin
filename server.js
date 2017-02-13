"use strict";

let express = require('express');

// create our app
let app = express();

app.use(express.static('public'));

// redirect all urls to /
app.use(function (req, res, next) {
    res.redirect('/');
});

app.listen(3000, function () {
   console.log("listening on http://localhost:3000");
});