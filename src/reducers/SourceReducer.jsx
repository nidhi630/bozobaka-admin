"use strict";

import {
    INIT_SOURCES,
    DELETE_SOURCES,
    SOURCE_REQUEST_SUCCESS,
    SOURCE_HAS_ERRORED,
    SOURCE_IS_LOADING,
    SOURCE_NAME
} from "./../actions/ActionConstants";

let defaultState = {
    isLoading: false,
    hasErrored: false,
    errorMessage: "",
    requestSuccess: false,
    sources: [],
    name: ""
};

export function sourceReducer(state = defaultState, action) {
    switch (action.type) {
        case INIT_SOURCES:
            return {
                ...state,
                sources: action.sources
            };
        case DELETE_SOURCES:
            return {
                ...state,
                sources: []
            };
        case SOURCE_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case SOURCE_REQUEST_SUCCESS:
            return {
                ...state,
                requestSuccess: action.requestSuccess
            };
        case SOURCE_HAS_ERRORED:
            return {
                ...state,
                hasErrored: action.hasErrored,
                errorMessage: action.errorMessage
            };
        case SOURCE_NAME:
            return {
                ...state,
                name: action.name
            };

        default:
            return state;
    }
}

