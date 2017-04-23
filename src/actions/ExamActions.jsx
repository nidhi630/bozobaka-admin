"use strict";

import {
    INIT_EXAMS,
    EXAM_IS_LOADING,
    EXAM_HAS_ERRORED,
    EXAM_UPDATE_NAME,
    EXAM_UPDATE_YEAR
} from "./ActionConstants";
import ContentService from "./../services/ContentService";

export function initExams(exams) {
    return {
        type: INIT_EXAMS,
        exams
    };
}

export function examUpdateName(name) {
    return {
        type: EXAM_UPDATE_NAME,
        name
    };
}

export function examUpdateYear(year) {
    return {
        type: EXAM_UPDATE_YEAR,
        year
    };
}

export function examIsLoading(isLoading) {
    return {
        type: EXAM_IS_LOADING,
        isLoading
    };
}

export function examHasErrored(hasErrored, errorMessage) {
    return {
        type: EXAM_HAS_ERRORED,
        hasErrored,
        errorMessage
    };
}

export function fetchExams() {
    return (dispatch) => {
        dispatch(examIsLoading(true));
        ContentService.fetchExams()
            .then((exams) => {
                dispatch(examIsLoading(false));
                dispatch(initExams(exams));
            })
            .catch((err) => {
                dispatch(examIsLoading(false));
                dispatch(examHasErrored(true, err.message));
            });
    };
}
