/**
 * Created by aditya on 9/5/17.
 */

const webpack = require("./../webpack.config");

const config = {
    port: 4000
};

config.bundle = {
    js: {
        main: webpack.output.filename
    }
};

module.exports = config;
