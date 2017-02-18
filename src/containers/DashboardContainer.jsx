"use strict";

import {connect} from 'react-redux';

import DashboardComponent from './../components/DashboardComponent';

const mapStateToProps = (state) => {
    return {
        ...state.GlobalReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardComponent);

export default DashboardContainer;