"use strict";

import {
    THEORY_UPDATE_SECTION,
    THEORY_IS_LOADING,
    THEORY_HAS_ERRORED,
    THEORY_REQUEST_SUCCESS,
    THEORY_UPDATE_SOURCE,
    THEORY_UPDATE_HEADING,
    THEORY_UPDATE_THEORY
} from "./ActionConstants";
import {updateTheory as updateTheoryRequest} from "./../services/TheoryService";

export function fetchTheory() {

}

export function postTheory() {
    return (dispatch, getState) => {
        dispatch(theoryIsLoading(true));

        /* TODO: validate data before post */
        const data = getState.theory.newTheory;
        console.log(data);
        updateTheoryRequest({
            method: "post",
            data
        }).then((res) => {
            dispatch(theoryIsLoading(false));
            dispatch(theoryRequestSuccess(true));
        }).catch((err) => {
            dispatch(theoryIsLoading(false));
            dispatch(theoryRequestSuccess(false));
            dispatch(theoryHasErrored(true, err.message));
        })
    }

}

export function theoryHasErrored(hasErrored, errorMessage) {
    return {
        type: THEORY_HAS_ERRORED,
        hasErrored,
        errorMessage
    }
}
export function theoryIsLoading(isLoading) {
    return {
        isLoading,
        type: THEORY_IS_LOADING
    }
}

export function theoryRequestSuccess(requestSuccess) {
    return {
        type: THEORY_REQUEST_SUCCESS,
        requestSuccess
    }
}

export function updateSection(sectionId) {
    return {
        type: THEORY_UPDATE_SECTION,
        sectionId
    }
}

export function updateSource(sourceId) {
    return {
        type: THEORY_UPDATE_SOURCE,
        sourceId
    }
}

export function updateHeading(heading) {
    return {
        type: THEORY_UPDATE_HEADING,
        heading
    }
}

export function updateTheory(theory) {
    return {
        type: THEORY_UPDATE_THEORY,
        theory
    }
}