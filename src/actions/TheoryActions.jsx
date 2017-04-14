"use strict";

import {
    THEORY_UPDATE_SECTION,
    THEORY_IS_LOADING,
    THEORY_HAS_ERRORED,
    THEORY_REQUEST_SUCCESS,
    THEORY_UPDATE_SOURCE,
    THEORY_UPDATE_HEADING,
    THEORY_UPDATE_THEORY,
    THEORY_UPDATE_L1,
    THEORY_UPDATE_L2,
    THEORY_UPDATE_L3,
    THEORY_UPDATE_L4,
    THEORY_UPDATE_STATUS,
    THEORY_UPDATE_PARSED_THEORY
} from "./ActionConstants";
import {
    updateTheory as updateTheoryRequest,
    fetchTheory as fetchTheoryRequest
} from "./../services/TheoryService";

export function theoryHasErrored(hasErrored, errorMessage) {
    return {
        type: THEORY_HAS_ERRORED,
        hasErrored,
        errorMessage
    };
}

export function theoryIsLoading(isLoading) {
    return {
        isLoading,
        type: THEORY_IS_LOADING
    };
}

export function theoryRequestSuccess(requestSuccess) {
    return {
        type: THEORY_REQUEST_SUCCESS,
        requestSuccess
    };
}

export function theoryUpdateSection(sectionId) {
    return {
        type: THEORY_UPDATE_SECTION,
        sectionId
    };
}

export function theoryUpdateSource(sourceId) {
    return {
        type: THEORY_UPDATE_SOURCE,
        sourceId
    };
}

export function theoryUpdateHeading(heading) {
    return {
        type: THEORY_UPDATE_HEADING,
        heading
    };
}

export function theoryUpdateTheory(theory) {
    return {
        type: THEORY_UPDATE_THEORY,
        theory
    };
}

export function theoryUpdateL1(l1Id) {
    return {
        type: THEORY_UPDATE_L1,
        l1Id
    };
}

export function theoryUpdateL2(l2Id) {
    return {
        type: THEORY_UPDATE_L2,
        l2Id
    };
}

export function theoryUpdateL3(l3Id) {
    return {
        type: THEORY_UPDATE_L3,
        l3Id
    };
}

export function theoryUpdateL4(l4Id) {
    return {
        type: THEORY_UPDATE_L4,
        l4Id
    };
}

export function theoryUpdateStatus(status) {
    return {
        type: THEORY_UPDATE_STATUS,
        status
    };
}

export function theoryUpdateParsedTheory(parsedTheory) {
    return {
        type: THEORY_UPDATE_PARSED_THEORY,
        parsedTheory
    };
}

export function fetchTheory(theoryId) {
    return (dispatch) => {
        dispatch(theoryIsLoading(true));

        fetchTheoryRequest({
            id: theoryId
        }).then(() => {
            dispatch(theoryIsLoading(false));
            dispatch(theoryRequestSuccess(true));
        }).catch((err) => {
            dispatch(theoryIsLoading(false));
            dispatch(theoryRequestSuccess(false));
            dispatch(theoryHasErrored(true, err.message));
        });
    };
}

export function postTheory() {
    return (dispatch, getState) => {
        dispatch(theoryIsLoading(true));

        /* TODO: validate data before post */
        const data = getState.newTheory;
        console.log(data);
        updateTheoryRequest({
            method: data.id ? "put" : "post",
            data
        }).then(() => {
            dispatch(theoryIsLoading(false));
            dispatch(theoryRequestSuccess(true));
        }).catch((err) => {
            dispatch(theoryIsLoading(false));
            dispatch(theoryRequestSuccess(false));
            dispatch(theoryHasErrored(true, err.message));
        });
    };
}
