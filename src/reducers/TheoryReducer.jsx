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
    THEORY_UPDATE_STATUS,
    THEORY_UPDATE_PARSED_THEORY,
    INIT_THEORIES,
    THEORY_RESET_STATE,
    THEORY_UPDATE_ID
} from "./../actions/ActionConstants";

let defaultTheory = {
    isLoading: false,
    hasErrored: false,
    errorMessage: "",
    requestSuccess: false,
    sectionId: "",
    sources: [],
    type: "text",
    heading: "",
    theory: "",
    parsedTheory: "",
    status: "draft",
    theories: [],
    l1Id: "",
    l2Id: "",
    l3Id: "",
    l4Id: ""
};

export function TheoryReducer(state = defaultTheory, action) {
    switch (action.type) {
        case THEORY_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case THEORY_HAS_ERRORED:
            return {
                ...state,
                hasErrored: action.hasErrored,
                errorMessage: action.errorMessage
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
        case THEORY_UPDATE_PARSED_THEORY:
            return {
                ...state,
                parsedTheory: action.parsedTheory
            };
        case INIT_THEORIES:
            return {
                ...state,
                theories: action.theories
            };
        case THEORY_RESET_STATE:
            return defaultTheory;
        case THEORY_UPDATE_ID:
            return {
                ...state,
                id: action.id
            };
        default:
            return state;
    }
}
