/*
 created by aditya on 17-02-2017
 */

"use strict";

import APIService from "./APIService";
import Constants from "./../models/Constants";
import APIEndpoints from "./../models/APIEndpoints";

const LoginService = {
    ACCESS_TOKEN: undefined,

    getAccessToken() {
        if (!this.ACCESS_TOKEN) {
            this.ACCESS_TOKEN = window.localStorage.getItem(Constants.ACCESS_TOKEN_KEY);
        }
        return this.ACCESS_TOKEN;
    },

    checkIfLoggedIn() {
        return this.getAccessToken() ? true : false;
    },

    login(credentials) {
        return new Promise((resolve, reject) => {
            if (credentials.email && credentials.password) {
                let request = APIService.makeRequest({
                    url: APIEndpoints.login,
                    method: 'post',
                    data: credentials,

                });
                request.then((res) => {
                    console.log(res);
                    resolve(res);
                }).catch((err) => {
                    console.log(err);
                    reject(err);
                });
            } else {
                reject();
            }
        });
    },

    logout() {
        window.localStorage.removeItem(Constants.ACCESS_TOKEN_KEY);
        this.ACCESS_TOKEN = undefined;
    }
};

export default LoginService;