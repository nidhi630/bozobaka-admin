"use strict";

import {connect} from 'react-redux';
import React from 'react';
import AddQuestionComponent from './../components/AddQuestionComponent';
import {getAllQuestionTypes} from "./../models/allQuestionTypes";
import {updateSource} from "./../actions/QuestionActions";

const mapStateToProps = (state) => {
    return {
        ...state.GlobalReducer,
        ...state.ContentReducer,
        questionTypes: getAllQuestionTypes(),
        sectionId: state.question.sectionId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateSelectedSource: (value) => {
            dispatch(updateSource(value));
        }
    }
};


const AddQuestionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddQuestionComponent);

export default AddQuestionContainer;