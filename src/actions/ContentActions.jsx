"use strict";

import ActionConstants from './ActionConstants';


const ContentActions = {
    getSelectedCourse() {
        return {
            type: ActionConstants.GET_SELECTED_COURSE
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