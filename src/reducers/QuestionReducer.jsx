"use strict";

import {
    QUESTION_IS_LOADING,
    QUESTION_HAS_ERRORED,
    QUESTION_REQUEST_SUCCESS,
    QUESTION_UPDATE_SECTION,
    QUESTION_UPDATE_L1,
    QUESTION_UPDATE_L2,
    QUESTION_UPDATE_L3,
    QUESTION_UPDATE_L4,
    QUESTION_UPDATE_SOURCE,
    QUESTION_UPDATE_QUESTION_TYPE,
    QUESTION_UPDATE_DIFFICULTY
} from "./../actions/ActionConstants";

let defaultState = {
    isLoading: false,
    hasErrored: false,
    errorMessage: "",
    requestSuccess: false,
    sectionId: "",
    l1Id: "",
    l2Id: "",
    l3Id: "",
    l4Id: "",
    sources: [],
    questionType: "Single Correct",
    difficulty: 50
};

export function questionReducer(state = defaultState, action) {
    switch (action.type) {
        case QUESTION_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case QUESTION_HAS_ERRORED:
            return {
                ...state,
                hasErrored: action.hasErrored
            };
        case QUESTION_REQUEST_SUCCESS:
            return {
                ...state,
                requestSuccess: action.requestSuccess
            };
        case QUESTION_UPDATE_SECTION:
            return {
                ...state,
                sectionId: action.sectionId
            };
        case QUESTION_UPDATE_L1:
            return {
                ...state,
                l1Id: action.l1Id
            };
        case QUESTION_UPDATE_L2:
            return {
                ...state,
                l2Id: action.l2Id
            };
        case QUESTION_UPDATE_L3:
            return {
                ...state,
                l3Id: action.l3Id
            };
        case QUESTION_UPDATE_L4:
            return {
                ...state,
                l4Id: action.l4Id
            };
        case QUESTION_UPDATE_SOURCE:
            return {
                ...state,
                sources: [action.sourceId]
            };
        case QUESTION_UPDATE_QUESTION_TYPE:
            return {
                ...state,
                questionType: action.questionType
            };
        case QUESTION_UPDATE_DIFFICULTY:
            return {
                ...state,
                difficulty: action.difficulty
            };
        default:
            return state;
    }
}

