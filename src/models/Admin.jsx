"use strict";

import Course from "./Course";
import User from "./User";

export default class Admin extends User {
    constructor(admin) {
        super(admin);
        this.courses = admin.courses ? Course.parseCourses(admin.courses) : [];
    }

    static parseAdmins(admins) {
        let toReturn = [];
        for (let i = 0; i < admins.length; i++) {
            toReturn.push(new Admin(admins[i]));
        }
        return toReturn;
    }
}

