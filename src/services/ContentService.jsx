"use strict";

import APIService from "./APIService";
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

    updateCourse(course, config) {
        return new Promise((resolve, reject) => {
            let request = APIService.makeRequest({
                method: config.method,
                url: config.method === "post" ? APIEndpoints.courses : APIEndpoints.courses + "/" + course.id,
                data: course
            });

            request.then((res) => {
                console.log(res);
                if (config.method !== "delete") {
                    resolve(new Course(res.data));
                } else {
                    resolve(res.data);
                }
            }).catch((err) => {
                console.log(err);
                reject(err);
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
    },

    updateContentWriters(contentWriter, config) {
        return new Promise((resolve, reject) => {
            let request = APIService.makeRequest({
                method: config.method,
                //url: APIEndpoints.,
                data: contentWriter
            });

            request.then((res) => {
                console.log(res);
                config.method !== "delete" ? resolve(new ContentWriter(res.data)) : resolve(res.data);
            }).catch((err) => {
                console.log(err);
                reject(err.response);
            });
        });
    },

    updateReviewers(contentWriter, config) {
        return new Promise((resolve, reject) => {
            let request = APIService.makeRequest({
                method: config.method,
                //url: APIEndpoints.,
                data: contentWriter
            });

            request.then((res) => {
                console.log(res);
                config.method !== "delete" ? resolve(new Reviewer(res.data)) : resolve(res.data);
            }).catch((err) => {
                console.log(err);
                reject(err.response);
            });
        });
    }
};

export default ContentService;