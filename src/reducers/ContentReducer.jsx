"use strict";

import ActionConstants from "./../actions/ActionConstants";

const defaultState = {
    selectedCourse: {},
    courses: []
};

const ContentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionConstants.UPDATE_COURSES:
            return {
                ...state,
                courses: [
                    ...action.courses
                ]
            };
        case ActionConstants.UPDATE_SELECTED_COURSE:
            return {
                ...state,
                selectedCourse: action.selectedCourse
            };
        default:
            return state;
    }
};

export default ContentReducer;