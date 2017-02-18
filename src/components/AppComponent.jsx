"use strict";

import React from 'react';

import MainContainer from './../containers/MainContainer';
import LoginContainer from './../containers/LoginContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class AppComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <MuiThemeProvider>
                {!this.props.isLoggedIn ? <MainContainer /> : <LoginContainer/>}
            </MuiThemeProvider>
        )
    }
}

export default AppComponent;

