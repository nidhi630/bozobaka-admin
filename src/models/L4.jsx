"use strict";

export default class L4 {
    constructor(l4) {
        this.id = l4.id;
        this.l3Id = l4.l3Id;
        this.name = l4.name;
        this.displayName = l4.displayName;
        this.created = l4.created;
        this.updated = l4.updated;
    }

    static parseL4s(items = []) {
        let l4s = [];
        for (let i = 0; i < items.length; i++) {
            l4s.push(new L4(items[i]));
        }
        return l4s;
    }
}