"use strict";

import APIService from "./APIService";
import Constants from "./../models/Constants";
import APIEndpoints from "./../models/APIEndpoints";
import Course from "./../models/Course";

const ContentService = {
    fetchCourses(courseID) {
        return new Promise((resolve, reject) => {
            let request = APIService.makeRequest({
                method: "get",
                url: courseID ? APIEndpoints.coursesWithCount + "/" + courseID : APIEndpoints.coursesWithCount,
            });

            request.then((res) => {
                resolve(Course.parseCourses(res.data));
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
                reject(err.response);
            });
        });
    }
};

export default ContentService;