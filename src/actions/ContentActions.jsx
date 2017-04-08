"use strict";

import {
    UPDATE_COURSES,
    UPDATE_SELECTED_COURSE,
    UPDATE_COURSE_DATA,
    UPDATE_CONTENT_WRITER_DATA,
    UPDATE_REVIEWER_DATA,
    DELETE_COURSE_DATA,
    DELETE_CONTENT_WRITER_DATA,
    DELETE_REVIEWER_DATA
} from './ActionConstants';


const ContentActions = {
    updateCourses(courses) {
        return {
            type: UPDATE_COURSES,
            courses: courses
        }
    },

    updateSelectedCourse(newCourse) {
        return {
            type: UPDATE_SELECTED_COURSE,
            selectedCourse: newCourse
        }
    },

    updateCourseData(newCourse) {
        return {
            type: UPDATE_COURSE_DATA,
            course: newCourse
        }
    },

    updateContentWriterData(contentWriter) {
        return {
            type: UPDATE_CONTENT_WRITER_DATA,
            contentWriter: contentWriter
        }
    },

    updateReviewerData(reviewer) {
        return {
            type: UPDATE_REVIEWER_DATA,
            reviewer: reviewer
        }
    },

    deleteCourseData(courseId) {
        return {
            type: DELETE_COURSE_DATA,
            courseId: courseId
        }
    },

    deleteContentWriterData(contentWriterId) {
        return {
            type: DELETE_CONTENT_WRITER_DATA,
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