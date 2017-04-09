"use strict";

import {INIT_SECTIONS, DELETE_SECTIONS, INIT_L2S, INIT_L3S, INIT_L1S, INIT_L4S} from "./../actions/ActionConstants";

export function SectionsReducer(state = [], action) {
    switch (action.type) {
        case INIT_SECTIONS:
            return action.sections;
        case DELETE_SECTIONS:
            return [];
        default:
            return state;
    }
}

export function L1sReducer(state = [], action) {
    switch (action.type) {
        case INIT_L1S:
            return action.l1s;
        default:
            return state;
    }
}

export function L2sReducer(state = [], action) {
    switch (action.type) {
        case INIT_L2S:
            return action.l2s;
        default:
            return state;
    }
}


export function L3sReducer(state = [], action) {
    switch (action.type) {
        case INIT_L3S:
            return action.l3s;
        default:
            return state;
    }
}


export function L4sReducer(state = [], action) {
    switch (action.type) {
        case INIT_L4S:
            return action.l4s;
        default:
            return state;
    }
}