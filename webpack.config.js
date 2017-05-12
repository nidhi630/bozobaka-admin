/**
 * Created by aditya on 11/2/17.
 */

"use strict";

const path = require("path");

const config = {
    devtool: "cheap-module-source-map",
    entry: "./src/app.jsx",
    output: {
        path: path.join(__dirname, "/public"),
        filename: "./js/bundle.js"
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        loaders: [
            {
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-0"]
                },
                test: /\.jsx?$/,
                exclude: /(node_module|bower_components)/
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader?modules",
                include: /flexboxgrid/
            }
        ]
    },
    plugins: [
    ]
};

module.exports = config;
