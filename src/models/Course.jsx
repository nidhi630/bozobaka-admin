"use strict";

import User from "./User";

class Course {
    constructor(c) {
        this._id = c.id;
        this._name = c.name;
        this._displayName = c.displayName;
        this._language = c.language;
        this._adminId = c.adminId;
        this._admin = new User(c.admin ? c.admin : {});
        this._reviewerCount = c.reviewerCount;
        this._contentWriterCount = c.contentWriterCount;
    }

    static parseCourses(courses) {
        let courseObjs = [];
        for (let i=0; i<courses.length; i++) {
            courseObjs.push(new Course(courses[i]));
        }
        return courseObjs;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get displayName() {
        return this._displayName;
    }

    set displayName(value) {
        this._displayName = value;
    }

    get language() {
        return this._language;
    }

    set language(value) {
        this._language = value;
    }

    get adminId() {
        return this._adminId;
    }

    set adminId(value) {
        this._adminId = value;
    }

    get admin() {
        return this._admin;
    }

    set admin(value) {
        this._admin = value;
    }

    get reviewerCount() {
        return this._reviewerCount;
    }

    set reviewerCount(value) {
        this._reviewerCount = value;
    }

    get contentWriterCount() {
        return this._contentWriterCount;
    }

    set contentWriterCount(value) {
        this._contentWriterCount = value;
    }
}

export default Course;