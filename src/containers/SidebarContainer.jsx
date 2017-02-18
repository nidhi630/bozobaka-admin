"use strict";

import {connect} from 'react-redux';

import SidebarComponent from './../components/SidebarComponent';

const mapStateToProps = (state) => {
    return {
        ...state.GlobalReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const SidebarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarComponent);

export default SidebarContainer;