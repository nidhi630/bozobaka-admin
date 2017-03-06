"use strict";

import {connect} from 'react-redux';

import HeaderComponent from './../components/HeaderComponent';
import LoginService from './../services/LoginService';
import ContentActions from './../actions/ContentActions';
import GlobalActions from './../actions/GlobalActions';

const mapStateToProps = (state) => {
    return {
        ...state.GlobalReducer,
        ...state.UserReducer,
        ...state.ContentReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleCourseChange: (event, index, value) => {
            dispatch(ContentActions.updateSelectedCourse(value));
        },
        logout: () => {
            LoginService.logout();
            dispatch(GlobalActions.toggleLoginStatus(false));
        },
        toggleNavigationDrawer: () => {
            dispatch(GlobalActions.toggleNavigationDrawer(true));
        }
    }

};

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderComponent);

export default HeaderContainer;