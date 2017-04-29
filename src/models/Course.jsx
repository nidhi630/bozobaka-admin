"use strict";

import Admin from "./Admin";

class Course {
    constructor(c) {
        this.id = c.id;
        this.name = c.name || "";
        this.displayName = c.displayName ? c.displayName : c.name;
        this.language = c.language || "";
        this.adminIds = c.adminIds || [];
        this.admins = Admin.parseAdmins(c.admins || []);
        this.reviewerCount = c.reviewerCount || 0;
        this.contentWriterCount = c.contentWriterCount || 0;
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
