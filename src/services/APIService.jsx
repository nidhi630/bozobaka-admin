/*
 created by aditya on 17-02-2017
 */

"use strict";

import axios from 'axios';

import APIEndpoints from './../models/APIEndpoints';
import LoginService from './LoginService';

axios.interceptors.request.use((config) => {
    config.headers["Authorization"] = LoginService.getAccessToken();
    config.headers["Content-Type"] = "application/json";
    return config;
});

const APIService = {
    makeRequest(config) {
        return axios.request({
            method: config.method,
            baseURL: config.baseURL ? config.baseUrl : APIEndpoints.apiBase,
            url: config.url,
            data: config.data,
            headers: config.headers ? config.headers : {},
            params: config.params,
            timeout: config.timeout ? config.timeout : 5000,
            cancelToken: config.cancelToken
        });
    }
};

export default APIService;