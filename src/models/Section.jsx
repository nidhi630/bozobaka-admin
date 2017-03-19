"use strict";

import Course from "./Course";
import L1 from "./L1";

export default class Section {
    constructor(section) {
        this.id = section.id;
        this.name = section.name;
        this.courseId = section.courseId;
        if (section.course) {
            this.course = new Course(section.course);
        }
        if (section.l1s) {
            this.l1s = L1.parseL1s(section.l1s);
        }
        this.created = section.created;
        this.updated = section.updated;
    }

    static parseSections(sections = []) {
        let parsedSections = [];
        for (let i = 0; i < sections.length; i++) {
            parsedSections.push(new Section(sections[i]));
        }
        return parsedSections;
    }
}