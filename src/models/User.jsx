"use strict";

class User {
    constructor(user) {
        this.id = user.id;
        this.ownerId = user.ownerId;
        this.firstName = user.firstName ? user.firstName : "Not Assgined";
        this.lastName = user.lastName;
        this.role = user.role;
        this.created = user.created;
        this.updated = user.updated;
    }
}

export default User;