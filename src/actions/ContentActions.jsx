"use strict";

import ActionConstants from './ActionConstants';


const ContentActions = {
    updateSelectedCourse(newCourse) {
        return {
            type: ActionConstants.UPDATE_SELECTED_COURSE,
            selectedCourse: newCourse
        }
    }
};

export  default ContentActions;