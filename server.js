"use strict";

let express = require('express');

// create our app
let app = express();

app.use(express.static('public'));

app.listen(3000, function () {
   console.log("listening on http://localhost:3000");
});