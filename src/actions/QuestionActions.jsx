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
    QUESTION_UPDATE_DIFFICULTY,
    QUESTION_UPDATE_STATUS,
    QUESTION_UPDATE_PARSED_QUESTION
} from "./../actions/ActionConstants";

export function questionUpdateSource(sourceId) {
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

export function questionUpdateL1(l1Id) {
    return {
        type: QUESTION_UPDATE_L1,
        l1Id
    }
}

export function questionUpdateL2(l2Id) {
    return {
        type: QUESTION_UPDATE_L2,
        l2Id
    }
}

export function questionUpdateL3(l3Id) {
    return {
        type: QUESTION_UPDATE_L3,
        l3Id
    }
}

export function questionUpdateL4(l4Id) {
    return {
        type: QUESTION_UPDATE_L4,
        l4Id
    }
}

export function questionUpdateQuestionType(questionType) {
    return {
        type: QUESTION_UPDATE_QUESTION_TYPE,
        questionType
    }
}

export function questionUpdateDifficulty(difficulty) {
    return {
        type: QUESTION_UPDATE_DIFFICULTY,
        difficulty
    }
}

export function questionUpdateStatus(status) {
    return {
        type: QUESTION_UPDATE_STATUS,
        status
    }
}

export function questionUpdateParsedQuestion(parsedQuestion) {
    return {
        type: QUESTION_UPDATE_PARSED_QUESTION,
        parsedQuestion
    }
}