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
        case ActionConstants.UPDATE_COURSE_DATA: {
            for (let i=0; i<state.courses.length; i++) {
                if (state.courses[i].id === action.course.id) { // course was updated
                    return {
                        ...state,
                        courses: [
                            state.courses.splice(0, i),
                            action.course,
                            state.courses.splice(i+1)
                        ]
                    }
                }
            }
            // new course to add
            return {
                ...state,
                courses: [
                    ...state.courses,
                    action.course
                ]
            }
        }
        default:
            return state;
    }
};

export default ContentReducer;