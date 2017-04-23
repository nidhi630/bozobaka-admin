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
    questionUpdateQuestion,
    questionUpdateQuestionType,
    questionUpdateSolution,
    questionUpdateHint
} from "./../actions/QuestionActions";
import {parseKatex} from "./../services/KatexParser";

function userHasAccess(role) {
    let rolesWithAccess = ["contentWriter", "superAdmin"];
    return (rolesWithAccess.indexOf(role) > -1);
}

const mapStateToProps = (state) => {
    const role = state.GlobalReducer.loggedInUser.role;
    return {
        hasAccess: userHasAccess(role),
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
        },

        onQuestionTypeChange: (event, index, value) => {
            dispatch(questionUpdateQuestionType(value));
        },

        updateSolution: (newValue) => {
            dispatch(questionUpdateSolution(newValue, parseKatex(newValue)));
        },

        updateHint: (newValue) => {
            dispatch(questionUpdateHint(newValue, parseKatex(newValue)));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestionComponent);
