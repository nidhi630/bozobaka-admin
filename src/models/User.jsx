"use strict";

class User {
    constructor(user) {
        this.id = user.id;
        this.ownerId = user.ownerId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.role = user.role;
        user.email ? this.email = user.email : null;
        user.created ? this.created = user.created : null;
        user.updated ? this.updated = user.updated : null;
    }

    get displayName() {
        return this.firstName ? this.firstName + (this.lastName ? " " + this.lastName : "") : "Not Assigned";
    }
}

export default User;