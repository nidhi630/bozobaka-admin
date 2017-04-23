"use strict";

import Admin from "./Admin";

class Course {
    constructor(c) {
        this.id = c.id;
        this.name = c.name;
        this.displayName = c.displayName ? c.displayName : c.name;
        this.language = c.language;

        if (c.admins) {
            this.admins = Admin.parseAdmins(c.admins);
        }

        if (typeof c.reviewerCount === "number") {
            this.reviewerCount = c.reviewerCount;
        }

        if (typeof c.contentWriterCount === "number") {
            this.contentWriterCount = c.contentWriterCount;
        }
    }

    static parseCourses(courses) {
        let courseObjs = [];
        for (let i = 0; i < courses.length; i = i + 1) {
            courseObjs.push(new Course(courses[i]));
        }
        return courseObjs;
    }
}

export default Course;
