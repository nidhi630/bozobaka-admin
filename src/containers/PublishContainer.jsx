"use strict";

import {connect} from "react-redux";
import PublishComponent from "./../components/PublishComponent";
import {setStatus} from "./../actions/FilterActions";
import {
    fetchData
} from "./../actions/PublishActions";

const mapStateToProps = (state) => {
    return {
        ...state.publish,
        courseId: state.ContentReducer.selectedCourse.id
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => {
            dispatch(fetchData());
        },

        updateStatusFilter: (status) => {
            dispatch(setStatus(status));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublishComponent);
