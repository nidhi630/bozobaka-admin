"use strict";

import User from "./User";

class Course {
    constructor(c) {
        this.id = c.id;
        this.name = c.name;
        this.displayName = c.displayName ? c.displayName : c.name;
        this.language = c.language;
        this.adminId = c.adminId;
        this.admin = new User(c.admin ? c.admin : {});
        this.reviewerCount = c.reviewerCount;
        this.contentWriterCount = c.contentWriterCount;
    }

    static parseCourses(courses) {
        let courseObjs = [];
        for (let i=0; i<courses.length; i++) {
            courseObjs.push(new Course(courses[i]));
        }
        return courseObjs;
    }
}

export default Course;