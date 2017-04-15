"use strict";

import {INIT_SECTIONS} from "./../actions/ActionConstants";

let defaultState = {
    sections: [],
    l1s: [],
    l2s: [],
    l3s: [],
    l4s: []
};

export function SectionsReducer(state = defaultState, action) {
    switch (action.type) {
        case INIT_SECTIONS:
            return {
                ...state,
                sections: action.sections,
                l1s: action.l1s,
                l2s: action.l2s,
                l3s: action.l3s,
                l4s: action.l4s
            };
        default:
            return state;
    }
}
