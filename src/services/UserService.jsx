/*
 created by aditya on 06-03-2017
 */

"use strict";

import {makeRequest, errorHandler} from "./APIService";
import {USER_PROFILE} from "./../models/APIEndpoints";
import LoginService from "./LoginService";
import User from "./../models/User";

export function getUserProfile() {
    let that = this;
    return new Promise((resolve, reject) => {
        makeRequest({
            url: USER_PROFILE,
            method: "get",
            params: {
                filter: JSON.stringify({
                    where: {
                        ownerId: LoginService.getUserID()
                    }
                })
            }
        }).then((res) => {
            if (res && res.data && res.data.constructor === Array && res.data.length === 1) {
                resolve(new User(res.data[0]));
            } else {
                reject();
            }
        }).catch((err) => errorHandler(reject, err));
    });
}
