"use strict";

import {connect} from "react-redux";
import ListQuestionComponent from "./../components/ListQuestionComponent";
import {questionFetchQuestions} from "./../actions/QuestionActions";

const mapStateToProps = (state, ownProps) => {
    return {
        questions: state.theory.theories,
        isLoading: state.theory.isLoading,
        courseId: state.ContentReducer.selectedCourse.id
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuestions: () => {
            dispatch(questionFetchQuestions());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListQuestionComponent);
