"use strict";

import {connect} from "react-redux";
import AddTheoryComponent from "./../components/AddTheoryComponent";
import {
    theoryUpdateSource,
    theoryUpdateHeading,
    theoryUpdateTheory,
    theoryUpdateParsedTheory
} from "./../actions/TheoryActions";
import {parseKatex} from "./../services/KatexParser";

function userHasAccess(role) {
    let rolesWithAccess = ["admin"];
    return (rolesWithAccess.indexOf(role) > -1);
}

const mapStateToProps = (state) => {
    const role = state.GlobalReducer.loggedInUser.role;
    const {l1Id, l2Id, l3Id, sectionId, theory, l4Id, status, parsedTheory} = state.newTheory;
    return {
        hasAccess: userHasAccess(role),
        sources: state.sources.sources,
        theory,
        sectionId,
        l1Id,
        l2Id,
        l3Id,
        l4Id,
        status,
        parsedTheory
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateHeading: (event, newValue) => {
            dispatch(theoryUpdateHeading(newValue))
        },

        updateTheory: (event, newValue) => {
            setTimeout(() => {
                let parsedHtml = parseKatex(newValue);
                dispatch(theoryUpdateParsedTheory(parsedHtml));
            }, 0);
            dispatch(theoryUpdateTheory(newValue));
        },

        updateSelectedSource: (value) => {
            dispatch(theoryUpdateSource(value));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTheoryComponent);