"use strict";

import {
    THEORY_IS_LOADING,
    THEORY_UPDATE_SOURCE,
    THEORY_UPDATE_SECTION,
    THEORY_UPDATE_L1,
    THEORY_UPDATE_L2,
    THEORY_UPDATE_L3,
    THEORY_UPDATE_L4,
    THEORY_REQUEST_SUCCESS,
    THEORY_HAS_ERRORED,
    THEORY_UPDATE_HEADING,
    THEORY_UPDATE_THEORY,
    THEORY_UPDATE_STATUS
} from "./../actions/ActionConstants";

let defaultNewTheory = {
    isLoading: false,
    hasErrored: false,
    errorMessage: "",
    requestSuccess: false,
    sectionId: "",
    sources: [],
    type: "text",
    heading: "",
    theory: "",
    status: "Draft"
};

export function newTheoryReducer(state = defaultNewTheory, action) {
    switch (action.type) {
        case THEORY_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case THEORY_HAS_ERRORED:
            return {
                ...state,
                hasErrored: action.hasErrored
            };
        case THEORY_REQUEST_SUCCESS:
            return {
                ...state,
                requestSuccess: action.requestSuccess
            };
        case THEORY_UPDATE_SECTION:
            return {
                ...state,
                sectionId: action.sectionId
            };
        case THEORY_UPDATE_L1:
            return {
                ...state,
                l1Id: action.l1Id
            };
        case THEORY_UPDATE_L2:
            return {
                ...state,
                l2Id: action.l2Id
            };
        case THEORY_UPDATE_L3:
            return {
                ...state,
                l3Id: action.l3Id
            };
        case THEORY_UPDATE_L4:
            return {
                ...state,
                l4Id: action.l4Id
            };
        case THEORY_UPDATE_SOURCE:
            return {
                ...state,
                sources: [action.sourceId]
            };
        case THEORY_UPDATE_HEADING:
            return {
                ...state,
                heading: action.heading
            };
        case THEORY_UPDATE_THEORY:
            return {
                ...state,
                theory: action.theory
            };
        case THEORY_UPDATE_STATUS:
            return {
                ...state,
                status: action.status
            };
        default:
            return state;
    }
}
