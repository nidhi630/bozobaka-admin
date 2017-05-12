/**
 * Created by aditya on 9/5/17.
 */

"use strict";

const manifest = require("./../manifest.json");

const config = {
    port: 8080
};

config.bundle = {
    js: {
        main: manifest.main.js,
        vendor: manifest.vendor.js
    }
};

module.exports = config;
