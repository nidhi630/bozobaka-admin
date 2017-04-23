"use strict";

import {connect} from "react-redux";
import AddQuestionComponent from "./../components/AddQuestionComponent";
import {getAllQuestionTypes} from "./../models/allQuestionTypes";
import {
    questionUpdateDifficulty,
    questionResetState,
    questionPostQuestion,
    questionFetchQuestions,
    questionUpdateParsedQuestion,
    questionUpdateQuestion
} from "./../actions/QuestionActions";
import {parseKatex} from "./../services/KatexParser";

const mapStateToProps = (state) => {
    return {
        ...state.GlobalReducer,
        ...state.ContentReducer,
        questionTypes: getAllQuestionTypes(),
        ...state.question
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDifficultyChange: (event, value) => {
            dispatch(questionUpdateDifficulty(value));
        },

        updateQuestion: (newValue) => {
            setTimeout(() => {
                let parsedHtml = parseKatex(newValue);
                dispatch(questionUpdateParsedQuestion(parsedHtml));
            }, 0);
            dispatch(questionUpdateQuestion(newValue));
        },

        resetState: () => {
            dispatch(questionResetState());
        },

        postQuestion: (status) => {
            dispatch(questionPostQuestion(status));
        },

        fetchQuestion: (id) => {
            dispatch(questionFetchQuestions(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestionComponent);
