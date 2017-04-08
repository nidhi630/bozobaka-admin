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
    theory: "api/theories",

    getCourseSectionEndpoint(courseId, sectionId) {
        let endPoint = this.courses + "/" + courseId + "/sections";
        return sectionId ? endPoint + "/" + sectionId : endPoint;
    },

    getL1Endpoint(sectionId, l1Id) {
        let endPoint = this.allSections + "/" + sectionId + "/l1s";
        return l1Id ? endPoint + "/" + l1Id : endPoint;
    },

    getL2Endpoint(l1Id, l2Id) {
        let endPoint = "api/l1s/" + l1Id + "/l2s";
        return l2Id ? endPoint + "/" + l2Id : endPoint;
    },

    getL3Endpoint(l2Id, l3Id) {
        let endPoint = "api/l2s/" + l2Id + "/l3s";
        return l3Id ? endPoint + "/" + l3Id : endPoint;
    },

    getL4Endpoint(l3Id, l4Id) {
        let endPoint = "api/l3s/" + l3Id + "/l4s";
        return l4Id ? endPoint + "/" + l4Id : endPoint;
    }
};

export default APIEndpoints;