"use strict";

import L4 from "./L4";

export default class L3 {
    constructor(l3) {
        this.id = l3.id;
        this.l2Id = l3.l2Id;
        this.name = l3.name;
        this.displayName = l3.displayName;
        this.created = l3.created;
        this.updated = l3.updated;
        this.l4s = (l3.l4s && l3.l4s.length) ? L4.parseL4s(l3.l4s) : [];
    }

    static parseL3s(items = []) {
        let l3s = [];
        for (let i = 0; i < items.length; i++) {
            l3s.push(new L3(items[i]));
        }
        return l3s;
    }
}