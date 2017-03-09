"use strict";

class User {
    constructor(user) {
        this._id = user.id;
        this._ownerId = user.ownerId;
        this._firstName = user.firstName;
        this._lastName = user.lastName;
        this._role = user.role;
        this._created = user.created;
        this._updated = user.updated;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get ownerId() {
        return this._ownerId;
    }

    set ownerId(value) {
        this._ownerId = value;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get role() {
        return this._role;
    }

    set role(value) {
        this._role = value;
    }

    get created() {
        return this._created;
    }

    set created(value) {
        this._created = value;
    }

    get updated() {
        return this._updated;
    }

    set updated(value) {
        this._updated = value;
    }
}

export default User;