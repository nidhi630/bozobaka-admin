"use strict";

import User from "./User";
import Section from "./Section";

export default class ContentWriter extends User {
    constructor(data) {
        super(data);
        this.sections = Section.parseSections(data.sections);
    }

    static parseContentWriters(contentWriters = []) {
        let parsedContentWriters = [];
        for (let i = 0; i < contentWriters.length; i++) {
            parsedContentWriters.push(new ContentWriter(contentWriters[i]));
        }
        return parsedContentWriters;
    }
}