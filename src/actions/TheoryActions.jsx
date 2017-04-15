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
    THEORY_UPDATE_PARSED_THEORY,
    INIT_THEORIES,
    THEORY_RESET_STATE
} from "./ActionConstants";
import {
    updateTheory as updateTheoryRequest,
    fetchTheory as fetchTheoryRequest
} from "./../services/TheoryService";
import {getTheoryFilter} from "./../actions/FilterActions";
import Theory from "./../models/Theory";

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

export function initTheories(theories) {
    return {
        type: INIT_THEORIES,
        theories
    };
}

export function theoryResetState() {
    return {
        type: THEORY_RESET_STATE
    };
}

export function fetchTheory(theoryId) {
    return (dispatch, getState) => {
        dispatch(theoryIsLoading(true));

        const filter = getTheoryFilter(getState());
        fetchTheoryRequest({
            id: theoryId,
            filter: filter
        }).then((res) => {
            dispatch(initTheories(res));
            dispatch(theoryIsLoading(false));
            dispatch(theoryRequestSuccess(true));
        }).catch((err) => {
            dispatch(theoryIsLoading(false));
            dispatch(theoryRequestSuccess(false));
            dispatch(theoryHasErrored(true, err.message));
        });
    };
}

export function theoryPostTheory(status) {
    return (dispatch, getState) => {
        dispatch(theoryIsLoading(true));

        /* TODO: validate data before post */
        try {
            const state = getState();
            const data = {
                ...state.theory
            };

            if (status) {
                data.status = status;
            }
            data.courseId = state.ContentReducer.selectedCourse.id;

            Theory.validateTheory(data);

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
        } catch (err) {
            dispatch(theoryHasErrored(true, err.message));
        }
    };
}
