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
    THEORY_UPDATE_L4
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

export function theoryUpdateSection(sectionId) {
    return {
        type: THEORY_UPDATE_SECTION,
        sectionId
    }
}

export function theoryUpdateSource(sourceId) {
    return {
        type: THEORY_UPDATE_SOURCE,
        sourceId
    }
}

export function theoryUpdateHeading(heading) {
    return {
        type: THEORY_UPDATE_HEADING,
        heading
    }
}

export function theoryUpdateTheory(theory) {
    return {
        type: THEORY_UPDATE_THEORY,
        theory
    }
}

export function theoryUpdateL1(l1) {
    return {
        type: THEORY_UPDATE_L1,
        l1
    }
}

export function theoryUpdateL2(l2) {
    return {
        type: THEORY_UPDATE_L2,
        l2
    }
}

export function theoryUpdateL3(l3) {
    return {
        type: THEORY_UPDATE_L3,
        l3
    }
}

export function theoryUpdateL4(l4) {
    return {
        type: THEORY_UPDATE_L4,
        l4
    }
}