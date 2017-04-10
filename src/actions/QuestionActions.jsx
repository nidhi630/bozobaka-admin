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
        sectionId
    }
}


