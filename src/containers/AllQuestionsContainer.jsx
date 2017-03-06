"use strict";

import {connect} from 'react-redux';
import AllQuestionsComponent from './../components/AllQuestionsComponent';


const mapStateToProps = (state) => {
    return {
        ...state.GlobalReducer,
        ...state.ContentReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

const AllQuestionsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AllQuestionsComponent);

export default AllQuestionsContainer;