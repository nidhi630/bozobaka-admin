"use strict";

import {
    PUBLISH_HAS_ERRORED,
    PUBLISH_INIT_QUESTIONS,
    PUBLISH_INIT_THEORIES,
    PUBLISH_IS_LOADING,
    PUBLISH_TYPE
} from "./ActionConstants";

import ContentService from "./../services/ContentService";
import {fetchQuestion} from "./../services/QuestionService";
import {getQuestionFilter, getTheoryFilter} from "./FilterActions";
import {fetchTheory} from "./../services/TheoryService";

export function publishHasErrored(hasErrored, errorMessage) {
    return {
        type: PUBLISH_HAS_ERRORED,
        hasErrored,
        errorMessage
    };
}

export function publishInitQuestions(questions) {
    return {
        type: PUBLISH_INIT_QUESTIONS,
        questions
    };
}

export function publishInitTheories(theories) {
    return {
        type: PUBLISH_INIT_THEORIES,
        theories
    };
}

export function publishContentType(contentType) {
    return {
        type: PUBLISH_TYPE,
        contentType
    };
}

export function publishIsLoading(isLoading) {
    return {
        type: PUBLISH_IS_LOADING,
        isLoading
    };
}

export function fetchData() {
    return (dispatch, getState) => {
        dispatch(publishIsLoading(true));

        const state = getState();
        if (state.publish.contentType === "question") {
            fetchQuestion({
                filter: getQuestionFilter(state)
            }).then(questions => {
                console.log(questions);
                dispatch(publishInitQuestions(questions));
                dispatch(publishIsLoading(false));
            }).catch(err => {
                dispatch(publishIsLoading(false));
                dispatch(publishHasErrored(true, err.message));
            });
        } else {
            fetchTheory({
                filter: getTheoryFilter(state)
            }).then(theories => {
                console.log(theories);
                dispatch(publishInitTheories(theories));
                dispatch(publishIsLoading(false));
            }).catch(err => {
                dispatch(publishIsLoading(false));
                dispatch(publishHasErrored(true, err.message));
            });
        }
    };
}

export function updateRank(id, rank) {
    return (dispatch, getState) => {
        dispatch(publishIsLoading(true));

        const state = getState();

        ContentService.updateRank({
            courseId: state.ContentReducer.selectedCourse.id,
            id: id,
            currentRank: rank,
            type: state.publish.contentType
        }).then(() => {
            fetchData();
        }).catch((err) => {
            dispatch(publishIsLoading(false));
            dispatch(publishHasErrored(true, err.message));
        });
    };
}
