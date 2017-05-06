"use strict";

import {
    PUBLISH_HAS_ERRORED,
    PUBLISH_INIT_QUESTIONS,
    PUBLISH_INIT_THEORIES,
    PUBLISH_IS_LOADING,
    PUBLISH_TYPE,
    PUBLISH_SORT_DIALOG,
    PUBLISH_RESET_STATE
} from "./ActionConstants";

import ContentService from "./../services/ContentService";
import {fetchQuestion, updateQuestion} from "./../services/QuestionService";
import {getQuestionFilter, getTheoryFilter} from "./FilterActions";
import {fetchTheory, updateTheory} from "./../services/TheoryService";

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

export function publishSortDialogStatus(sortDialog) {
    return {
        type: PUBLISH_SORT_DIALOG,
        sortDialog
    };
}

export function resetState() {
    return {
        type: PUBLISH_RESET_STATE
    };
}

export function fetchData() {
    return (dispatch, getState) => {
        dispatch(publishIsLoading(true));

        const state = getState();

        if (state.publish.contentType === "question") {
            const filter = getQuestionFilter(state);
            filter.status = "publish";

            fetchQuestion({
                filter,
                order: "rank ASC"
            }).then(questions => {
                console.log(questions);
                dispatch(publishInitQuestions(questions));
                dispatch(publishIsLoading(false));
            }).catch(err => {
                dispatch(publishIsLoading(false));
                dispatch(publishHasErrored(true, err.message));
            });
        } else {
            const filter = getTheoryFilter(state);
            filter.status = "publish";

            fetchTheory({
                filter: filter,
                order: "rank ASC"
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
        }).then((res) => {
            dispatch(fetchData());
        }).catch((err) => {
            dispatch(publishIsLoading(false));
            dispatch(publishHasErrored(true, err.message));
        });
    };
}

export function unpublish(id) {
    return (dispatch, getState) => {
        dispatch(publishIsLoading(true));

        const state = getState();
        const params = {
            method: "patch",
            data: {
                status: "added",
                id: id
            }
        };
        let request;
        if (state.publish.contentType === "question") {
            request = updateQuestion(params);
        } else {
            request = updateTheory(params);
        }
        request.then(res => {
            dispatch(fetchData());
        }).catch(err => {
            dispatch(publishIsLoading(false));
            dispatch(publishHasErrored(true, err.message));
        });
    };
}
