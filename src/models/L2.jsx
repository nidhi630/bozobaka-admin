"use strict";

import L3 from "./L3";

export default class L2 {
    constructor(l2) {
        this.id = l2.id;
        this.l2Id = l2.l2Id;
        this.name = l2.name;
        this.displayName = l2.displayName;
        this.created = l2.created;
        this.updated = l2.updated;
        this.l3s = (l2.l3s && l2.l3s.length) ? L3.parseL3s(l2.l3s) : [];
    }

    static parseL2s(items = []) {
        let l2s = [];
        for (let i = 0; i < items.length; i++) {
            l2s.push(new L2(items[i]));
        }
        return l2s;
    }
}