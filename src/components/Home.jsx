/*
    created by: Adity Jha
    date: 13-02-2017
 */

"use strict";

import React from 'react';
import {Link} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Main = (props) => {
    return (
        <MuiThemeProvider>
            <div>
                <h1>Home Component</h1>
                <Link to="/login">Login</Link>
            </div>
        </MuiThemeProvider>
    );
};

module.exports = Main;