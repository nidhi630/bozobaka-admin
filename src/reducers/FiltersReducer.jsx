"use strict";

import {
    FILTER_MAX_DIFFICULTY,
    FILTER_MIN_DIFFICULTY,
    FILTER_ID,
    FILTER_HEADING,
    FILTER_QUESTION,
    FILTER_STATUS,
    FILTER_L1,
    FILTER_L2,
    FILTER_SOURCE,
    FILTER_SECTION
} from "./../actions/ActionConstants";

let defaultState = {
    id: "",
    heading: "",
    status: "",
    sectionId: "",
    l1Id: "",
    l2Id: "",
    source: "",
    minDifficulty: 0,
    maxDifficulty: 100
};

export function FilterReducer(state = defaultState, action) {
    switch (action.type) {
        case FILTER_SECTION:
            return {
                ...state,
                sectionId: action.sectionId
            };
        case FILTER_HEADING:
            return {
                ...state,
                heading: action.heading
            };
        case FILTER_ID:
            return {
                ...state,
                id: action.id
            };
        case FILTER_L1:
            return {
                ...state,
                l1Id: action.l1Id
            };
        case FILTER_L2:
            return {
                ...state,
                l2Id: action.l2Id
            };
        case FILTER_QUESTION:
            return {
                ...state,
                question: action.question
            };
        case FILTER_MAX_DIFFICULTY:
            return {
                ...state,
                maxDifficulty: action.maxDifficulty
            };
        case FILTER_MIN_DIFFICULTY:
            return {
                ...state,
                minDifficulty: action.minDifficulty
            };
        case FILTER_STATUS:
            return {
                ...state,
                status: action.status
            };
        case FILTER_SOURCE:
            /* TODO: handle filter source case */
            return state;
        default:
            return state;
    }
}
