"use strict";

import {
    INIT_EXAMS,
    EXAM_HAS_ERRORED,
    EXAM_IS_LOADING,
    EXAM_UPDATE_YEAR,
    EXAM_UPDATE_NAME
} from "./../actions/ActionConstants";

let defaultState = {
    isLoading: false,
    hasErrored: false,
    errorMessage: "",
    exams: [],
    name: "",
    year: ""
};

export function ExamReducer(state = defaultState, action) {
    switch (action.type) {
        case INIT_EXAMS:
            return {
                ...state,
                exams: action.exams
            };
        case EXAM_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case EXAM_HAS_ERRORED:
            return {
                ...state,
                hasErrored: action.hasErrored,
                errorMessage: action.errorMessage
            };
        case EXAM_UPDATE_NAME:
            return {
                ...state,
                name: action.name
            };
        case EXAM_UPDATE_YEAR:
            return {
                ...state,
                year: action.year
            };
        default:
            return state;
    }
}

