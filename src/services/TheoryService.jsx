"use strict";

import {makeRequest, errorHandler} from "./APIService";
import {THEORY} from "./../models/APIEndpoints";
import Theory from "./../models/Theory";

export function updateTheory(params) {
    return new Promise((resolve, reject) => {
        const url = params.method === "post" ? THEORY : THEORY + "/" + params.data.id;
        makeRequest({
            method: params.method,
            url: url,
            data: params.data
        }).then((res) => {
            console.log("theory post data", res);
            resolve(new Theory(res.data));
        }).catch((err) => errorHandler(reject, err));
    });
}
