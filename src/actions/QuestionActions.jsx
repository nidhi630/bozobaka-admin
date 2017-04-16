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
    QUESTION_UPDATE_PARSED_QUESTION,
    INIT_QUESTIONS
} from "./../actions/ActionConstants";
import {
    fetchQuestion as fetchQuestionRequest,
    updateQuestion as updateQuestionRequest
} from "./../services/QuestionService";
import {getQuestionFilter} from "./../actions/FilterActions";

export function questionUpdateSource(sourceId) {
    return {
        type: QUESTION_UPDATE_SOURCE,
        sourceId
    };
}

export function questionHasErrored(hasErrored, errorMessage) {
    return {
        type: QUESTION_HAS_ERRORED,
        hasErrored,
        errorMessage
    };
}
export function questionIsLoading(isLoading) {
    return {
        isLoading,
        type: QUESTION_IS_LOADING
    };
}

export function questionRequestSuccess(requestSuccess) {
    return {
        type: QUESTION_REQUEST_SUCCESS,
        requestSuccess
    };
}

export function questionUpdateSection(sectionId) {
    return {
        type: QUESTION_UPDATE_SECTION,
        sectionId
    };
}

export function questionUpdateL1(l1Id) {
    return {
        type: QUESTION_UPDATE_L1,
        l1Id
    };
}

export function questionUpdateL2(l2Id) {
    return {
        type: QUESTION_UPDATE_L2,
        l2Id
    };
}

export function questionUpdateL3(l3Id) {
    return {
        type: QUESTION_UPDATE_L3,
        l3Id
    };
}

export function questionUpdateL4(l4Id) {
    return {
        type: QUESTION_UPDATE_L4,
        l4Id
    };
}

export function questionUpdateQuestionType(questionType) {
    return {
        type: QUESTION_UPDATE_QUESTION_TYPE,
        questionType
    };
}

export function questionUpdateDifficulty(difficulty) {
    return {
        type: QUESTION_UPDATE_DIFFICULTY,
        difficulty
    };
}

export function questionUpdateStatus(status) {
    return {
        type: QUESTION_UPDATE_STATUS,
        status
    };
}

export function questionUpdateParsedQuestion(parsedQuestion) {
    return {
        type: QUESTION_UPDATE_PARSED_QUESTION,
        parsedQuestion
    };
}

export function initQuestions(questions) {
    return {
        type: INIT_QUESTIONS,
        questions
    };
}

export function fetchQuestions(questionId) {
    return (dispatch, getState) => {
        dispatch(questionIsLoading(true));

        const filters = getQuestionFilter(getState());
        fetchQuestionRequest({
            id: questionId,
            filter: filters
        }).then((res) => {
            dispatch(initQuestions(res));
            dispatch(questionIsLoading(false));
            dispatch(questionRequestSuccess(true));
        }).catch((err) => {
            dispatch(questionIsLoading(false));
            dispatch(questionRequestSuccess(false));
            dispatch(questionHasErrored(true, err.message));
        });
    };
}

export function postQuestion() {
    return (dispatch, getState) => {
        dispatch(questionIsLoading(true));

        /* TODO: validate data before post */
        const state = getState();
        const data = Question.validateQuestion({
            ...state.question,
            courseId: state.ContentReducer.selectedCourse.id
        });
        updateQuestionRequest({
            method: data.id ? "put" : "post",
            data
        }).then(() => {
            dispatch(questionIsLoading(false));
            dispatch(questionRequestSuccess(true));
        }).catch((err) => {
            dispatch(questionIsLoading(false));
            dispatch(questionRequestSuccess(false));
            dispatch(questionHasErrored(true, err.message));
        });
    };
}
