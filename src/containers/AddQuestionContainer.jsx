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
    return {
        handleSectionChange: (event, index, value) => {
            /* TODO: handleSectionChange */
            console.log("handle section change");
        }
    }
};


const AddQuestionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddQuestionComponent);

export default AddQuestionContainer;