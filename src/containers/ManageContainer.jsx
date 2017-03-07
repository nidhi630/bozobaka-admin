"use strict";

import React from "react";
import ManageComponent from "./../components/ManageComponent";
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        ...state.GlobalReducer,
        ...state.ContentReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};


const ManageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageComponent);

export default ManageContainer;
