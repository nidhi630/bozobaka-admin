"use strict";

import {connect} from 'react-redux';
import React from 'react';
import AddQuestionComponent from './../components/AddQuestionComponent';
import {getAllQuestionTypes} from "./../models/allQuestionTypes";
import {
    questionUpdateDifficulty,
    questionUpdateSource
} from "./../actions/QuestionActions";

const mapStateToProps = (state) => {
    const {l1Id, l2Id, l3Id, sectionId, difficulty, l4Id, status} = state.question;
    return {
        ...state.GlobalReducer,
        ...state.ContentReducer,
        questionTypes: getAllQuestionTypes(),
        sectionId,
        l1Id,
        l2Id,
        l3Id,
        l4Id,
        difficulty,
        status
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDifficultyChange: (event, value) => {
            dispatch(questionUpdateDifficulty(value));
        },

        updateSelectedSource: (value) => {
            dispatch(questionUpdateSource(value));
        }
    }
};


const AddQuestionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddQuestionComponent);

export default AddQuestionContainer;