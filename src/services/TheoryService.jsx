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
        }).then(res => {
            console.log("theory post data", res);
            resolve(new Theory(res.data));
        }).catch(err => errorHandler(reject, err));
    });
}

export function fetchTheory(params) {
    return new Promise((resolve, reject) => {
        const url = params.id ? THEORY + "/" + params.id : THEORY;
        makeRequest({
            url,
            params: {
                filter: JSON.stringify({
                    where: {
                        courseId: params.courseId
                    }
                })
            }
        }).then(res => {
            resolve(Theory.parseTheories(res.data));
        }).catch(err => errorHandler(reject, err));
    });
}
