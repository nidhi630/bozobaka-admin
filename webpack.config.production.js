/**
 * Created by aditya on 11/2/17.
 */

"use strict";

const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');

let config = {
    devtool: 'cheap-module-source-map',
    entry: './src/app.jsx',
    output: {
        path: __dirname,
        filename: './public/js/bundle-[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                },
                test: /\.jsx?$/,
                exclude: /(node_module|bower_components)/
            }
        ]
    },
    plugins: [
        new AssetsPlugin({
            filename: 'manifest.json',
            prettyPrint: true
        })
    ]
};

module.exports = config;
