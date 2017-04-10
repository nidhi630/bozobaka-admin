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
    QUESTION_UPDATE_QUESTION_TYPE
} from "./../actions/ActionConstants";

export function updateSource(sourceId) {
    return {
        type: QUESTION_UPDATE_SOURCE,
        sourceId
    }
}

export function questionHasErrored(hasErrored, errorMessage) {
    return {
        type: QUESTION_HAS_ERRORED,
        hasErrored,
        errorMessage
    }
}
export function questionIsLoading(isLoading) {
    return {
        isLoading,
        type: QUESTION_IS_LOADING
    }
}

export function questionRequestSuccess(requestSuccess) {
    return {
        type: QUESTION_REQUEST_SUCCESS,
        requestSuccess
    }
}

export function questionUpdateSection(sectionId) {
    return {
        type: QUESTION_UPDATE_SECTION,
        sectionId
    }
}

export function questionUpdateL1(l1) {
    return {
        type: QUESTION_UPDATE_L1,
        l1
    }
}

export function questionUpdateL2(l2) {
    return {
        type: QUESTION_UPDATE_L2,
        l2
    }
}

export function questionUpdateL3(l3) {
    return {
        type: QUESTION_UPDATE_L3,
        l3
    }
}

export function questionUpdateL4(l4) {
    return {
        type: QUESTION_UPDATE_L4,
        l4
    }
}

export function questionUpdateQuestionType(questionType) {
    return {
        type: QUESTION_UPDATE_QUESTION_TYPE,
        questionType
    }
}