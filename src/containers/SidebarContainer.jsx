"use strict";

import {connect} from 'react-redux';

import SidebarComponent from './../components/SidebarComponent';
import GlobalActions from './../actions/GlobalActions';

const mapStateToProps = (state) => {
    return {
        ...state.GlobalReducer,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleDrawer: (newStatus) => {
            dispatch(GlobalActions.toggleNavigationDrawer(newStatus));
        }
    };
};

const SidebarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarComponent);

export default SidebarContainer;