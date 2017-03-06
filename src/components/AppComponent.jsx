"use strict";

import React from "react";
import LoginContainer from "./../containers/LoginContainer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import DashboardContainer from "./../containers/DashboardContainer";
import SidebarContainer from "./../containers/SidebarContainer";
import HeaderContainer from "./../containers/HeaderContainer";
import CircularProgress from 'material-ui/CircularProgress';
import UserService from "./../services/UserService";

class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoader: this.props.isLoggedIn
        };

        if (this.props.isLoggedIn) {
            /* TODO: make api to fetch user details and courses */
            UserService.getUserProfile();
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                {this.state.showLoader ?
                    <div className="page-loader">
                        <CircularProgress size={80} thickness={5} />
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

