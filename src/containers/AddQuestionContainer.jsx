"use strict";

import {connect} from 'react-redux';
import React from 'react';
import AddQuestionComponent from './../components/AddQuestionComponent';
import {getAllQuestionTypes} from "./../models/allQuestionTypes";
import {questionUpdateDifficulty} from "./../actions/QuestionActions";

const mapStateToProps = (state) => {
    return {
        ...state.GlobalReducer,
        ...state.ContentReducer,
        questionTypes: getAllQuestionTypes(),
        sectionId: state.question.sectionId,
        l1Id: state.question.l1Id,
        l2Id: state.question.l2Id,
        l3Id: state.question.l3Id,
        l4Id: state.question.l4Id,
        difficulty: state.question.difficulty
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDifficultyChange: (event, value) => {
            dispatch(questionUpdateDifficulty(value));
        }
    }
};


const AddQuestionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddQuestionComponent);

export default AddQuestionContainer;