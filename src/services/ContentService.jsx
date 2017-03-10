"use strict";

import APIService from "./APIService";
import Constants from "./../models/Constants";
import APIEndpoints from "./../models/APIEndpoints";
import Course from "./../models/Course";
import Reviewer from "./../models/Reviewer";
import ContentWriter from "./../models/ContentWriter";

const ContentService = {
    fetchCourses(courseID) {
        return new Promise((resolve, reject) => {
            let request = APIService.makeRequest({
                method: "get",
                url: courseID ? APIEndpoints.coursesWithCount + "/" + courseID : APIEndpoints.coursesWithCount,
            });

            request.then((res) => {
                console.log(res.data);
                resolve(Course.parseCourses(res.data));
            }).catch((err) => {
                console.log(err);
                reject(err.response);
            });
        });
    },

    fetchReviewers() {
        return new Promise((resolve, reject) => {
            let request = APIService.makeRequest({
                method: "get",
                url: APIEndpoints.reviewers,
            });

            request.then((res) => {
                console.log(res.data);
                resolve(Reviewer.parseReviewers(res.data));
            }).catch((err) => {
                console.log(err);
                reject(err.response);
            });
        });
    },

    fetchContentWriters() {
        return new Promise((resolve, reject) => {
            let request = APIService.makeRequest({
                method: "get",
                url: APIEndpoints.contentWriters,
            });

            request.then((res) => {
                console.log(res.data);
                resolve(ContentWriter.parseContentWriters(res.data));
            }).catch((err) => {
                console.log(err);
                reject(err.response);
            });
        });
    }
};

export default ContentService;