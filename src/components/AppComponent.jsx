"use strict";

import React from "react";
import LoginContainer from "./../containers/LoginContainer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import DashboardContainer from "./../containers/DashboardContainer";
import SidebarContainer from "./../containers/SidebarContainer";
import HeaderContainer from "./../containers/HeaderContainer";
import CircularProgress from 'material-ui/CircularProgress';
import UserService from "./../services/UserService";
import ContentService from "./../services/ContentService";
import axios from "axios";
import Snackbar from 'material-ui/Snackbar';
import {browserHistory} from "react-router";
import {Grid} from "react-flexbox-grid";

class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoader: this.props.isLoggedIn,
            error: false
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps, "next props");
        this.setSelectedCourse(ContentService.courses, nextProps);
    }

    componentDidMount() {
        if (this.props.isLoggedIn) {
            axios.all([UserService.getUserProfile(), ContentService.fetchCourses()])
                .then(axios.spread((user, courses) => {
                    this.props.setLoggedInUser(user);
                    this.setSelectedCourse(courses, this.props);
                    this.setState({
                        showLoader: false,
                        error: false
                    })
                }))
                .catch(() => {
                    this.setState({
                        error: true
                    });
                });
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                {this.state.showLoader ?
                    <div className="page-loader">
                        <CircularProgress size={100} thickness={4}/>
                        <Snackbar
                            open={this.state.error}
                            message="Something went wrong"
                            autoHideDuration={100000}
                            onRequestClose={this.handleRequestClose}
                        />
                    </div>
                    :
                    this.props.isLoggedIn ?
                        <div>
                            <HeaderContainer />
                            <div>
                                <SidebarContainer />
                                <Grid>
                                    {this.props.children ? this.props.children : <DashboardContainer/>}
                                </Grid>
                            </div>
                        </div>
                        :
                        <LoginContainer/>
                }
            </MuiThemeProvider>
        )
    }

    setSelectedCourse(courses, props) {
        let selectedCourseInUrl = props.location.query.selectedCourse;
        if (!selectedCourseInUrl) {
            props.setSelectedCourse(courses[0].id);
        } else if(!props.selectedCourse) {
            props.setSelectedCourse(selectedCourseInUrl);
        } else if (selectedCourseInUrl === this.props.selectedCourse.id) {
            return;
        } else {
            let found = false;
            for (let i = 0; i < courses.length; i++) {
                if (courses[i].id === selectedCourseInUrl) {
                    found = true;
                    props.setSelectedCourse(courses[i].id);
                    break;
                }
            }

            if (!found) {
                browserHistory.push(this.props.location.pathname + "?selectedCourse=" + courses[0].id);
                props.setSelectedCourse(courses[0].id);
            }
        }
    }
}

export default AppComponent;

