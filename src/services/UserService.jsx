/*
 created by aditya on 06-03-2017
 */

"use strict";

import APIService from "./APIService";
import APIEndpoints from "./../models/APIEndpoints";
import LoginService from "./LoginService";
import User from "./../models/User";

const UserService = {
    getUserProfile() {
        let that = this;
        return new Promise((resolve, reject) => {
            let request = APIService.makeRequest({
                url: APIEndpoints.userProfile,
                method: "get",
                params: {
                    filter: JSON.stringify({
                        where: {
                            ownerId: LoginService.getUserID()
                        }
                    })
                }
            });

            request.then((res) => {
                console.log(res);
                if (res.data instanceof Array && res.data.length === 1) {
                    resolve(new User(res.data[0]));
                } else {
                    reject();
                }
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    }
};

export default UserService;