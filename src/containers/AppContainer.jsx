"use strict";

import {connect} from 'react-redux';
import AppComponent from './../components/AppComponent';
import ContentService from "./../services/ContentService";
import ContentActions from "./../actions/ContentActions";
import GlobalActions from "./../actions/GlobalActions";

const mapStateToProps = (state) => {
    return {
        ...state.GlobalReducer,
        ...state.ContentReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateCourses: (courses) => {
            dispatch(ContentActions.updateCourses(courses));
        },

        setSelectedCourse: (courses, newCourseID) => {
            for (let i = 0; i < courses.length; i++) {
                if (courses[i].id === newCourseID) {
                    dispatch(ContentActions.updateSelectedCourse(courses[i]));
                    break;
                }
            }
        },

        setLoggedInUser: (user) => {
            dispatch(GlobalActions.setLoggedInUser(user));
        }
    };
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppComponent);

export default AppContainer;
