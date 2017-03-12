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
        case ActionConstants.UPDATE_COURSE_DATA:
            let found = false;
            let updatedCourses = state.courses.map(item => {
                if (item.id === action.course.id) {
                    found = true;
                    return {
                        ...item,
                        ...action.course
                    }
                }
                return item;
            });

            return {
                ...state,
                courses: found ? updatedCourses : [...updatedCourses, action.course]
            };
        case ActionConstants.DELETE_COURSE_DATA:
            updatedCourses = [];
            for (let i = 0; i < state.courses.length; i++) {
                if (state.courses[i].id !== action.courseId) {
                    updatedCourses.push(state.courses[i]);
                }
            }
            return {
                ...state,
                courses: updatedCourses
            };
        default:
            return state;
    }
};

export default ContentReducer;