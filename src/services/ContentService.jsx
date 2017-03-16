"use strict";

import APIService from "./APIService";
import APIEndpoints from "./../models/APIEndpoints";
import Course from "./../models/Course";
import Reviewer from "./../models/Reviewer";
import ContentWriter from "./../models/ContentWriter";
import Admin from "./../models/Admin";

const ContentService = {
    fetchCourses(courseID) {
        return new Promise((resolve, reject) => {
            APIService.makeRequest({
                method: "get",
                url: courseID ? APIEndpoints.coursesWithCount + "/" + courseID : APIEndpoints.coursesWithCount,
            }).then((res) => {
                resolve(Course.parseCourses(res.data));
            }).catch((err) => APIService.errorHandler(reject, err));
        });
    },

    updateCourse(course, config) {
        return new Promise((resolve, reject) => {
            APIService.makeRequest({
                method: config.method,
                url: config.method === "post" ? APIEndpoints.courses : APIEndpoints.courses + "/" + course.id,
                data: course
            }).then((res) => {
                (config.method !== "delete") ? resolve(new Course(res.data)) : resolve(res.data);
            }).catch((err) => APIService.errorHandler(reject, err));
        });
    },

    fetchAdmins() {
        return new Promise((resolve, reject) => {
            APIService.makeRequest({
                method: "get",
                url: APIEndpoints.admins
            }).then((res) => {
                resolve(Admin.parseAdmins(res.data));
            }).catch((err) => APIService.errorHandler(reject, err));
        });
    },

    fetchReviewers() {
        return new Promise((resolve, reject) => {
            APIService.makeRequest({
                method: "get",
                url: APIEndpoints.reviewers,
            }).then((res) => {
                console.log(res.data);
                resolve(Reviewer.parseReviewers(res.data));
            }).catch((err) => APIService.errorHandler(reject, err));
        });
    },

    fetchContentWriters() {
        return new Promise((resolve, reject) => {
            APIService.makeRequest({
                method: "get",
                url: APIEndpoints.contentWriters,
            }).then((res) => {
                resolve(ContentWriter.parseContentWriters(res.data));
            }).catch((err) => APIService.errorHandler(reject, err));
        });
    },

    updateAdmin(admin, config) {
        return new Promise((resolve, reject) => {
            APIService.makeRequest({
                method: config.method,
                url: config.method === "post" ? APIEndpoints.addUser : APIEndpoints.admins + "/" + admin.id,
                data: admin
            }).then((res) => {
                config.method !== "delete" ? resolve(new Admin(res.data[0])) : resolve(res.data);
            }).catch((err) => APIService.errorHandler(reject, err));
        });
    },

    updateContentWriters(contentWriter, config) {
        return new Promise((resolve, reject) => {
            APIService.makeRequest({
                method: config.method,
                url: config.method === "post" ? APIEndpoints.addUser : APIEndpoints.contentWriters + "/" + contentWriter.id,
                data: contentWriter
            }).then((res) => {
                console.log(res);
                config.method !== "delete" ? resolve(new ContentWriter(res.data[0])) : resolve(res.data);
            }).catch((err) => APIService.errorHandler(reject, err));
        });
    },

    updateReviewers(reviewer, config) {
        return new Promise((resolve, reject) => {
            APIService.makeRequest({
                method: config.method,
                url: config.method === "post" ? APIEndpoints.addUser : APIEndpoints.reviewers + "/" + reviewer.id,
                data: reviewer
            }).then((res) => {
                console.log(res);
                config.method !== "delete" ? resolve(new Reviewer(res.data[0])) : resolve(res.data);
            }).catch((err) => APIService.errorHandler(reject, err));
        });
    }
};

export default ContentService;