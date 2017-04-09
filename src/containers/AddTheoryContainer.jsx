"use strict";

import {connect} from "react-redux";
import AddTheoryComponent from "./../components/AddTheoryComponent";
import {initSources, deleteSources, fetchSources} from "./../actions/SourceActions";

import {updateSource} from "./../actions/TheoryActions";

function userHasAccess(role) {
    let rolesWithAccess = ["admin"];
    return (rolesWithAccess.indexOf(role) > -1);
}

const mapStateToProps = (state) => {
    const role = state.GlobalReducer.loggedInUser.role;
    const selectedSource = state.newTheory.sources.length ? state.newTheory.sources[0] : "";
    return {
        hasAccess: userHasAccess(role),
        sources: state.sources.sources,
        selectedSource,
        types: [{id: "random", name: "text"}]
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSources: () => {
            dispatch(fetchSources());
        },

        deleteSources: () => {
            dispatch(deleteSources());
        },

        updateSelectedSource: (event, index, value) => {
            dispatch(updateSource(value));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTheoryComponent);