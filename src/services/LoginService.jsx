/*
 created by aditya on 17-02-2017
 */

"use strict";

import APIEndpoints from './../models/APIEndpoints';
import APIHelpers from './../Helpers/APIHelpers';

let LoginService = {
    login(credentials) {
        return new Promise((resolve, reject) => {
            if (credentials.email && credentials.password) {
                let url = APIHelpers.getUrl(APIEndpoints.login, null);
                return axios.post(url, credentials).then(function (response) {
                    console.log(response);
                    resolve(response);
                }).catch(function (error) {
                    console.log(error);
                    reject(error);
                });
            } else {
                reject();
            }
        });
    }
};

module.exports = LoginService;