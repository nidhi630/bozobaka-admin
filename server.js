"use strict";

const express = require('express');
const path = require('path');

// create our app
let app = express();

app.use(express.static('public'));

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.listen(3000, function () {
   console.log("listening on http://localhost:3000");
});