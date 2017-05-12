/**
 * Created by aditya on 9/5/17.
 */
/* eslint no-process-env: 0 */

"use strict";

const env = process.env.NODE_ENV || "development";
const envConfig = require("./" + env);

/*
 * config object contains platform independent configs
 * extend this object with additional properties as per the platform
 */
const config = {};

Object.assign(config, envConfig);

config.port = process.env.PORT || config.port;

module.exports = config;
