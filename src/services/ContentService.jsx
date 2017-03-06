"use strict";

import APIService from "./APIService";
import Constants from "./../models/Constants";
import APIEndpoints from "./../models/APIEndpoints";

const ContentService = {
    courses: [],

    fetchCourses(courseID) {
        return new Promise((resolve, reject) => {
            let request = APIService.makeRequest({
                method: "get",
                url: courseID ? APIEndpoints.courses + "/" + courseID : APIEndpoints.courses,
                params: {
                    "filter\[include\]": "admin"
                }
            });

            request.then((res) => {
                this.courses = res.data;
                resolve(res.data);
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
                reject(err.response);
            });
        });
    }
};

export default ContentService;