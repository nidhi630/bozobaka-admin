"use strict";

import {connect} from "react-redux";
import PublishComponent from "./../components/PublishComponent";
import {setStatus} from "./../actions/FilterActions";
import {
    fetchData,
    publishSortDialogStatus,
    updateRank,
    unpublish,
    resetState
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
        },

        sortDialogStatus: (status) => {
            dispatch(publishSortDialogStatus(status || false));
        },

        updateSort: (id, rank) => {
            dispatch(updateRank(id, rank));
        },

        unpublish: (id) => {
            dispatch(unpublish(id));
        },

        clearData: () => {
            dispatch(resetState());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublishComponent);
