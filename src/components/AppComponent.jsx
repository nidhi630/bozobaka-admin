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

class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoader: this.props.isLoggedIn,
            error: false
        };
    }

    componentDidMount() {
        if (this.props.isLoggedIn) {
            axios.all([UserService.getUserProfile(), ContentService.fetchCourses()])
                .then(axios.spread((user, courses) => {
                    /* TODO: set courses in state */
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
                                {this.props.children ? this.props.children : <DashboardContainer/>}
                            </div>
                        </div>
                        :
                        <LoginContainer/>
                }
            </MuiThemeProvider>
        )
    }
}

export default AppComponent;

