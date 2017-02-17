/*
 created by aditya on 17-02-2017
 */

"use strict";

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LoginContainer from './../containers/LoginContainer';

const MainComponent = (props) => {
    return (
        <MuiThemeProvider>
            {props.isLoggedIn ? <div>To be done</div> : <LoginContainer/> }
        </MuiThemeProvider>
    )
};

export default MainComponent;