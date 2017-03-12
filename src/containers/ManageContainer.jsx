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
            remove ? dispatch(ContentActions.deleteCourseData(course.id)) : dispatch(ContentActions.updateCourseData(course));
        }
    }
};

const ManageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageComponent);

export default ManageContainer;
