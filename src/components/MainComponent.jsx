/*
 created by aditya on 17-02-2017
 */

"use strict";

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LoginContainer from './../containers/LoginContainer';
import DashboardContainer from './../containers/DashboardContainer';

const MainComponent = (props) => {
    return (
        <MuiThemeProvider>
            <h1>Main Component</h1>
        </MuiThemeProvider>
    )
};

export default MainComponent;