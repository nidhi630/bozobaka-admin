"use strict";

import {connect} from "react-redux";
import AddTheoryComponent from "./../components/AddTheoryComponent";
import {initSources, deleteSources, fetchSources} from "./../actions/SourceActions";

import {updateSource, updateHeading, updateTheory} from "./../actions/TheoryActions";

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
        theoryContent: state.newTheory.theory
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
        },

        updateHeading: (event, newValue) => {
            dispatch(updateHeading(newValue))
        },

        updateTheory: (event, newValue) => {
            /* TODO: parse katex */
            dispatch(updateTheory(newValue));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTheoryComponent);