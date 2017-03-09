"use strict";

import ActionConstants from './ActionConstants';


const ContentActions = {
    updateCourses(courses) {
        return {
            type: ActionConstants.UPDATE_COURSES,
            courses: courses
        }
    },

    updateSelectedCourse(newCourse) {
        return {
            type: ActionConstants.UPDATE_SELECTED_COURSE,
            selectedCourse: newCourse
        }
    }
};

export  default ContentActions;