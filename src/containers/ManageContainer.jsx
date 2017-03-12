"use strict";

import React from "react";
import ManageComponent from "./../components/ManageComponent";
import {connect} from "react-redux";
import ContentActions from "./../actions/ContentActions";

const mapStateToProps = (state) => {
    return {
        ...state.GlobalReducer,
        ...state.ContentReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateCourseData: (course, remove = false) => {
            remove ? dispatch(ContentActions.deleteCourseData(course.id)) :
                dispatch(ContentActions.updateCourseData(course));
        },

        updateContentWriterData: (contentWriter, remove = false) => {
            remove ? dispatch(ContentActions.deleteContentWriterData(contentWriter.id)) :
                dispatch(ContentActions.updateContentWriterData(contentWriter));
        },

        updateReviewerData: (reviewer, remove = false) => {
            remove ? dispatch(ContentActions.deleteReviewerData(reviewer.id)) :
                dispatch(ContentActions.updateReviewerData(reviewer));
        }
    }
};

const ManageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageComponent);

export default ManageContainer;
