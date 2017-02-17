/*
 created by aditya on 17-02-2017
 set props for main component
 */

"use strict";

import {connect} from 'react-redux';

import MainComponent from '../components/MainComponent';

const mapStateToProps = (state) => {
    return {
        ...state.GlobalReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainComponent);

export default MainContainer