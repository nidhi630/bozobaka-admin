"use strict";

import {connect} from "react-redux";
import ListQuestionComponent from "./../components/ListQuestionComponent";
import {fetchQuestions} from "./../actions/QuestionActions";

const mapStateToProps = (state) => {
    return {
        questions: state.theory.theories,
        isLoading: state.theory.isLoading,
        courseId: state.ContentReducer.selectedCourse.id
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuestions: () => {
            dispatch(fetchQuestions());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListQuestionComponent);
