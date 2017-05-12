/**
 * Created by aditya on 11/2/17.
 */

"use strict";

const AssetsPlugin = require("assets-webpack-plugin");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");

const config = {
    devtool: "cheap-module-source-map",
    entry: "./src/app.jsx",
    output: {
        path: path.join(__dirname, "/public"),
        filename: "./js/[name]-[chunkhash].js"
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
        new CleanWebpackPlugin([
            "./public/js"
        ], {
            verbose: true,
            dry: false,
            exclude: []
        }),
        new AssetsPlugin({
            filename: "manifest.json",
            prettyPrint: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        })
    ]
};

module.exports = config;
