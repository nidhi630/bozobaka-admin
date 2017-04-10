/*
 created by aditya on 17-02-2017
 */

"use strict";

import {makeRequest} from "./APIService";
import {LOGIN} from "./../models/APIEndpoints";

const USER_ID_KEY = "userId";
const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";

const LoginService = {
    ACCESS_TOKEN: undefined,
    USER_ID: undefined,

    getAccessToken() {
        if (!this.ACCESS_TOKEN) {
            this.ACCESS_TOKEN = window.localStorage.getItem(ACCESS_TOKEN_KEY);
        }
        return this.ACCESS_TOKEN;
    },

    getUserID() {
        if (!this.USER_ID) {
            this.USER_ID = window.localStorage.getItem(USER_ID_KEY);
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
        window.localStorage.setItem(ACCESS_TOKEN_KEY, data.id);
        window.localStorage.setItem(USER_ID_KEY, data.userId);
    },

    logout() {
        window.localStorage.removeItem(ACCESS_TOKEN_KEY);
        window.localStorage.removeItem(USER_ID_KEY);
        this.ACCESS_TOKEN = undefined;
        this.USER_ID = undefined;
    }
};

export default LoginService;