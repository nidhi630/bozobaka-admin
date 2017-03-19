"use strict";

import React from "react";
import {connect} from "react-redux";
import ManageCourseComponent from "./../components/ManageCourseComponent";

const mapStateToProps = (state) => {
    return {
        ...state.GlobalReducer,
        ...state.ContentReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

const ManageCourseContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageCourseComponent);

export default ManageCourseContainer;