/**
 * Created by aditya on 11/2/17.
 */

"use strict";

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

let config = {
    context: __dirname,
    devtool: "cheap-module-source-map",
    entry: [
        "./src/app.jsx"
    ],
    output: {
        path: __dirname,
        filename: "./public/js/bundle.js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".css"]
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
                include: /flexboxgrid/,
            }
        ]
    },
    plugins: [
    ]
};

module.exports = config;