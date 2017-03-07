"use strict";


import ActionConstants from './../actions/ActionConstants';

const defaultState = {
    selectedCourse: {}
};

const ContentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionConstants.GET_SELECTED_COURSE:
            return state.selectedCourse;
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