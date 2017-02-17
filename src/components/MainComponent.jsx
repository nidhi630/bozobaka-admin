/*
 created by aditya on 17-02-2017
 */

"use strict";

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LoginComponent from './LoginComponent';

const MainComponent = (props) => {
    let children;

    if (!props.isLoggedIn) {
        children = (
            <LoginComponent />
        )
    } else {
        children = (
            <div>To be done</div>
        )
    }

    return (
        <MuiThemeProvider>
            {children}
        </MuiThemeProvider>
    )
};

export default MainComponent;