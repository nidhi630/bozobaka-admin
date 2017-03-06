"use strict";

import {connect} from 'react-redux';

import HeaderComponent from './../components/HeaderComponent';
import LoginService from './../services/LoginService';
import ContentActions from './../actions/ContentActions';
import GlobalActions from './../actions/GlobalActions';
import ContentService from "./../services/ContentService";

const mapStateToProps = (state) => {
    return {
        ...state.GlobalReducer,
        ...state.ContentReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleCourseChange: (event, index, value) => {
            let courses = ContentService.courses;
            for (let i=0; i<courses.length; i++) {
                if (courses[i].id === value) {
                    dispatch(ContentActions.updateSelectedCourse(courses[i]));
                    break;
                }
            }
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