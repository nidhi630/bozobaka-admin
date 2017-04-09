"use strict";

import {
    INIT_SOURCES,
    DELETE_SOURCES,
    SOURCE_HAS_ERRORED,
    SOURCE_IS_LOADING,
    SOURCE_REQUEST_SUCCESS,
    SOURCE_NAME
} from "./ActionConstants";
import {getSources} from "./../services/SourceService";

export function initSources(sources) {
    return {
        type: INIT_SOURCES,
        sources
    }
}

export function setName(name) {
    return {
        type: SOURCE_NAME,
        name
    }
}

export function deleteSources() {
    return {
        type: DELETE_SOURCES
    }
}

export function sourceIsLoading(isLoading) {
    return {
        type: SOURCE_IS_LOADING,
        isLoading
    }
}

export function sourceHasErrored(hasErrored, errorMessage) {
    return {
        type: SOURCE_HAS_ERRORED,
        hasErrored,
        errorMessage
    }
}

export function sourceRequestSuccess(requestSuccess) {
    return {
        type: SOURCE_REQUEST_SUCCESS,
        requestSuccess
    }
}

export function fetchSources() {
    return (dispatch) => {
        dispatch(sourceIsLoading(true));

        getSources().then((sources) => {
            dispatch(initSources(sources));
            dispatch(sourceHasErrored(false, ""));
            dispatch(sourceIsLoading(false));
            dispatch(sourceRequestSuccess(true));
        }).catch((err) => {
            dispatch(sourceHasErrored(true, err.message));
            dispatch(sourceIsLoading(false));
            dispatch(sourceRequestSuccess(false));
        })
    }
}