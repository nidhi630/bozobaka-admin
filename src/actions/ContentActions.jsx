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
    },

    updateCourseData(newCourse) {
        return {
            type: ActionConstants.UPDATE_COURSE_DATA,
            course: newCourse
        }
    },

    updateContentWriterData(contentWriter) {
        return {
            type: ActionConstants.UPDATE_CONTENT_WRITER_DATA,
            contentWriter: contentWriter
        }
    },

    updateReviewerData(reviewer) {
        return {
            type: ActionConstants.UPDATE_REVIEWER_DATA,
            reviewer: reviewer
        }
    },

    deleteCourseData(courseId) {
        return {
            type: ActionConstants.DELETE_COURSE_DATA,
            courseId: courseId
        }
    },

    deleteContentWriterData(contentWriterId) {
        return {
            type: ActionConstants.DELETE_CONTENT_WRITER_DATA,
            contentWriterId: contentWriterId,
        }
    },

    deleteReviewerData(reviewerId) {
        return {
            type: ActionConstants.DELETE_REVIEWER_DATA,
            reviewerId: reviewerId
        }
    }
};

export  default ContentActions;