"use strict";

import User from "./User";
import Section from "./Section";

export default class Reviewer extends User {
    constructor(data) {
        super(data);
        this.sections = data.sections ? Section.parseSections(data.sections) : [];
    }

    static parseReviewers(reviewers = []) {
        let parsedReviewers = [];
        for (let i=0; i<reviewers.length; i++) {
            parsedReviewers.push(new Reviewer(reviewers[i]));
        }
        return parsedReviewers;
    }
}