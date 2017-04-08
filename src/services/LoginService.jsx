/*
 created by aditya on 17-02-2017
 */

"use strict";

import {makeRequest} from "./APIService";
import Constants from "./../models/Constants";
import {LOGIN} from "./../models/APIEndpoints";

const LoginService = {
    ACCESS_TOKEN: undefined,
    USER_ID: undefined,

    getAccessToken() {
        if (!this.ACCESS_TOKEN) {
            this.ACCESS_TOKEN = window.localStorage.getItem(Constants.ACCESS_TOKEN_KEY);
        }
        return this.ACCESS_TOKEN;
    },

    getUserID() {
        if (!this.USER_ID) {
            this.USER_ID = window.localStorage.getItem(Constants.USER_ID_KEY);
        }
        return this.USER_ID;
    },

    checkIfLoggedIn() {
        return !!(this.getAccessToken() && this.getUserID());
    },

    login(credentials) {
        return new Promise((resolve, reject) => {
            if (credentials.email && credentials.password) {
                let request = makeRequest({
                    url: LOGIN,
                    method: "post",
                    data: credentials,
                });
                request.then((res) => {
                    this._loginHelper(res.data);
                    resolve(res.data);
                }).catch((err) => {
                    console.log(err);
                    reject(err);
                });
            } else {
                reject();
            }
        });
    },

    _loginHelper(data) {
        this.logout();
        window.localStorage.setItem(Constants.ACCESS_TOKEN_KEY, data.id);
        window.localStorage.setItem(Constants.USER_ID_KEY, data.userId);
    },

    logout() {
        window.localStorage.removeItem(Constants.ACCESS_TOKEN_KEY);
        window.localStorage.removeItem(Constants.USER_ID_KEY);
        this.ACCESS_TOKEN = undefined;
        this.USER_ID = undefined;
    }
};

export default LoginService;