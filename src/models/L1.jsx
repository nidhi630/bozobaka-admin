"use strict";

import L2 from "./L2";

export default class L1 {
    constructor(l1) {
        this.name = l1.name;
        this.displayName = l1.displayName;
        this.id = l1.id;
        this.sectionId = l1.sectionId;
        this.created = l1.created;
        this.updated = l1.updated;
        this.l2s = (l1.l2s && l1.l2s.length) ? L2.parseL2s(l1.l2s) : [];
    }

    static parseL1s(items = []) {
        let l1s = [];
        for(let i=0; i<items.length; i++) {
            l1s.push(new L1(items[i]));
        }
        return l1s;
    }
}