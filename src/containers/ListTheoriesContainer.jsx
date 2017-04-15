"use strict";

import {connect} from "react-redux";
import ListTheoryComponent from "./../components/ListTheoryComponent";
import {fetchTheory} from "./../actions/TheoryActions";

const mapStateToProps = (state) => {
    return {
        theories: state.theory.theories,
        isLoading: state.theory.isLoading,
        courseId: state.ContentReducer.selectedCourse.id
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTheories: () => {
            dispatch(fetchTheory());
        },

        onFilterChange: () => {
            dispatch(fetchTheory());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTheoryComponent);
