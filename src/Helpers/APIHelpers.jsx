/*
 created by aditya on 17-02-2017
 */


"use strict";

import APIEndpoints from './../models/APIEndpoints';

module.exports = {
    getUrl(endpoint, params) {
        let url = APIEndpoints.apiBase + endpoint;
        if (params && typeof params === 'object' && params.length > 0) {
            url += "?";
            let keys = Object.keys(params);
            for (let key in keys) {
                url += (key + "=" + params[key] + '&');
            }
        }
        return encodeURI(url);
    }
};