"use strict";

import {getDateWithoutTime} from "./../utils/dateTimeUtils";

export default class Theory {
    constructor(theory) {
        this.id = theory.id;
        this.sectionId = theory.sectionId;
        this.l1Id = theory.l1Id;
        if (theory.l1) {
            this.l1 = theory.l1;
        }
        this.l2Id = theory.l2Id;
        this.l3Id = theory.l3Id;
        this.l4Id = theory.l4Id;
        this.heading = theory.heading;
        this.theory = theory.theory;
        this.status = theory.status;
        this.type = theory.type;
        this.created = theory.created ? getDateWithoutTime(theory.created) : "";
    }

    static parseTheories(theories = []) {
        let parsedTheories = [];
        theories.forEach((theory) => {
            parsedTheories.push(new Theory(theory));
        });
        return parsedTheories;
    }

    static validateTheory(theory) {
        let validatedTheory = new Theory(theory);
        delete validatedTheory.created;
        if (!validatedTheory.sectionId || !validatedTheory.l1Id || !validatedTheory.l2Id ||
            !validatedTheory.l3Id || !validatedTheory.heading || !validatedTheory.theory) {
            throw new Error("Invalid Theory Input");
        }
        return validatedTheory;
    }
}
