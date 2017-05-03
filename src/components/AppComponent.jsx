"use strict";

import React, {PropTypes} from "react";
import LoginComponent from "./../components/LoginComponent";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SidebarContainer from "./../containers/SidebarContainer";
import HeaderContainer from "./../containers/HeaderContainer";
import CircularProgress from "material-ui/CircularProgress";
import {getUserProfile} from "./../services/UserService";
import ContentService from "./../services/ContentService";
import axios from "axios";
import Snackbar from "material-ui/Snackbar";
import {browserHistory} from "react-router";
import {Grid} from "react-flexbox-grid";
import DashboardComponent from "./DashboardComponent";

export default class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoader: false,
            error: false,
            message: "",
            coursesLoaded: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn && !this.state.coursesLoaded) {
            this.fetchDataFromServer();
        }
        if (nextProps.courses.length) {
            this.setSelectedCourse(nextProps.courses, nextProps);
        }
        if (!this.props.isLoggedIn && nextProps.isLoggedIn) {
            this.fetchDataFromServer(true);
        }
    }

    componentWillMount() {
        if (this.props.isLoggedIn) {
            this.fetchDataFromServer();
        }
    }

    render() {
        const {isLoggedIn, children} = this.props;
        const {showLoader, error, message} = this.state;

        return (
            <MuiThemeProvider>
                {showLoader ?
                    <div className="page-loader">
                        <CircularProgress/>
                        <Snackbar open={error} message={message} autoHideDuration={100000} action="ok"
                                  onActionTouchTap={this.snackbarAction.bind(this)} />
                    </div>
                    :
                    isLoggedIn ?
                        <div>
                            <HeaderContainer />
                            <div>
                                <SidebarContainer />
                                <Grid>
                                    {children ? children : <DashboardComponent/>}
                                </Grid>
                            </div>
                        </div>
                        :
                        <LoginComponent/>
                }
            </MuiThemeProvider>
        );
    }

    fetchDataFromServer(force = false) {
        if ((this.state.coursesLoaded || this.state.showLoader) && !force) {
            return;
        }
        this.setState({showLoader: true});
        axios.all([getUserProfile(), ContentService.fetchCourses()])
            .then(axios.spread((user, courses) => {
                this.props.updateCourses(courses);
                this.props.setLoggedInUser(user);
                this.setSelectedCourse(courses, this.props);
                this.setState({
                    showLoader: false,
                    error: false,
                    coursesLoaded: true
                });
            }))
            .catch((err) => {
                console.log(err);
                this.setState({
                    error: true,
                    message: err.statusCode + " - " + err.message
                });
            });
    }

    setSelectedCourse(courses, props) {
        if (courses.length === 0) {
            return;
        }
        const selectedCourseInUrl = props.location.query.selectedCourse;
        if (!selectedCourseInUrl) {
            props.setSelectedCourse(props.courses, courses[0].id);
        } else if (!props.selectedCourse) {
            props.setSelectedCourse(props.courses, selectedCourseInUrl);
        } else if (selectedCourseInUrl !== this.props.selectedCourse.id) {
            let found = false;
            for (let i = 0; i < courses.length; i++) {
                if (courses[i].id === selectedCourseInUrl) {
                    found = true;
                    props.setSelectedCourse(props.courses, courses[i].id);
                    break;
                }
            }

            if (!found) {
                browserHistory.push(this.props.location.pathname + "?selectedCourse=" + courses[0].id);
                props.setSelectedCourse(props.courses, courses[0].id);
            }
        }
    }

    snackbarAction() {
        this.setState({error: false});
    }
}


AppComponent.propTypes = {
    courses: PropTypes.array,
    selectedCourse: PropTypes.object,
    updateCourses: PropTypes.func,
    setLoggedInUser: PropTypes.func,
    children: PropTypes.node,
    isLoggedIn: PropTypes.bool,
    loggedInUser: PropTypes.object
};


