/*
 created by aditya on 17-02-2017
 */


"use strict";

const APIEndpoints = {
    apiBase: "http://52.3.133.9:3000",
    login: "/api/users/login",
    userProfile: "api/profiles",
    addUser: "api/users/addUser",
    courses: "/api/courses",
    coursesWithCount: "/api/courses/withCount",
    reviewers: "api/profiles/reviewers",
    contentWriters: "api/profiles/contentWriters",
    admins: "api/profiles/admins",
    allSections: "api/sections",

    getCourseSectionEndpoint(courseId, sectionId) {
        let endPoint = this.courses + "/" + courseId + "/sections";
        return sectionId ? endPoint + "/" + sectionId : endPoint;
    },

    getL1Endpoint(sectionId, l1Id) {
        let endPoint = this.allSections + "/" + sectionId + "/l1s";
        return l1Id ? endPoint + "/" + l1Id : endPoint;
    }
};

export default APIEndpoints;