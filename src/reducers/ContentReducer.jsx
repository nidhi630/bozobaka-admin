"use strict";

import {
    UPDATE_COURSES,
    UPDATE_SELECTED_COURSE,
    UPDATE_COURSE_DATA,
    DELETE_COURSE_DATA
} from "./../actions/ActionConstants";

const defaultState = {
    selectedCourse: {},
    courses: []
};

const ContentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_COURSES:
            return {
                ...state,
                courses: action.courses
            };
        case UPDATE_SELECTED_COURSE:
            return {
                ...state,
                selectedCourse: action.selectedCourse
            };
        case UPDATE_COURSE_DATA:
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
        case DELETE_COURSE_DATA:
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