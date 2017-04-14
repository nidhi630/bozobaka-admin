"use strict";

import {connect} from "react-redux";
import ListTheoryComponent from "./../components/ListTheoryComponent";
import {fetchTheory} from "./../actions/TheoryActions";

const mapStateToProps = (state) => {
    return {
        theories: state.theory
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTheory: () => {
            dispatch(fetchTheory());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTheoryComponent);
