"use strict";

import {connect} from "react-redux";
import TestDetailComponent from "./../components/TestDetailComponent";
import {questionFetchQuestions} from "./../actions/QuestionActions";
import {setStatus} from "./../actions/FilterActions";

const mapStateToProps = (state) => {
    return {
        questions: state.question.questions,
        isLoading: state.question.isLoading,
        courseId: state.ContentReducer.selectedCourse.id
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuestions: () => {
            dispatch(questionFetchQuestions());
        },

        updateStatusFilter: (status) => {
            dispatch(setStatus(status));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestDetailComponent);
