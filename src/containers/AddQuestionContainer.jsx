"use strict";

import {connect} from 'react-redux';
import React from 'react';
import AddQuestionComponent from './../components/AddQuestionComponent';

const mapStateToProps = (state) => {
    return {
        ...state.GlobalReducer,
        ...state.UserReducer,
        ...state.ContentReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};


const AddQuestionContainer = connect()(AddQuestionComponent);

export default AddQuestionContainer;