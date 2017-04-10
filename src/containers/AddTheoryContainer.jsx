"use strict";

import {connect} from "react-redux";
import AddTheoryComponent from "./../components/AddTheoryComponent";
import {theoryUpdateSource, theoryUpdateHeading, theoryUpdateTheory} from "./../actions/TheoryActions";

function userHasAccess(role) {
    let rolesWithAccess = ["admin"];
    return (rolesWithAccess.indexOf(role) > -1);
}

const mapStateToProps = (state) => {
    const role = state.GlobalReducer.loggedInUser.role;
    return {
        hasAccess: userHasAccess(role),
        sources: state.sources.sources,
        selectedSource,
        theoryContent: state.newTheory.theory
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateHeading: (event, newValue) => {
            dispatch(theoryUpdateHeading(newValue))
        },

        updateTheory: (event, newValue) => {
            /* TODO: parse katex */
            dispatch(theoryUpdateTheory(newValue));
        },

        updateSelectedSource: (value) => {
            dispatch(theoryUpdateSource(value));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTheoryComponent);