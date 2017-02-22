"use strict";

import React from 'react';

import MainContainer from './../containers/MainContainer';
import LoginContainer from './../containers/LoginContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DashboardContainer from './../containers/DashboardContainer';
import SidebarContainer from './../containers/SidebarContainer';
import HeaderContainer from './../containers/HeaderContainer';

class AppComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <MuiThemeProvider>
                {this.props.isLoggedIn ?
                    <div>
                        <HeaderContainer />
                        <div>
                            <SidebarContainer />
                            {this.props.children ? this.props.children : <DashboardContainer/>}
                        </div>
                    </div>
                    :
                    <LoginContainer/>}
            </MuiThemeProvider>
        )
    }
}

export default AppComponent;

