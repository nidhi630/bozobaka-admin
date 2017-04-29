"use strict";

class User {
    constructor(user) {
        this.id = user.id;
        this.ownerId = user.ownerId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.role = user.role;
        this.email = user.email;
        this.created = user.created;
        this.updated = user.updated;
    }

    get displayName() {
        return this.firstName ? this.firstName + (this.lastName ? " " + this.lastName : "") : "Not Assigned";
    }
}

export default User;