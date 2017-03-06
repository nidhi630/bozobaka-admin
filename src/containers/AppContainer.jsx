"use strict";

import {connect} from 'react-redux';
import AppComponent from './../components/AppComponent';
import ContentService from "./../services/ContentService";
import ContentActions from "./../actions/ContentActions";

const mapStateToProps = (state) => {
    return {
        ...state.GlobalReducer,
        ...state.ContentReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedCourse: (newCourseID) => {
            let courses = ContentService.courses;
            for (let i=0; i<courses.length; i++) {
                if (courses[i].id === newCourseID) {
                    dispatch(ContentActions.updateSelectedCourse(courses[i]));
                    break;
                }
            }
        }
    }
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppComponent);

export default AppContainer;