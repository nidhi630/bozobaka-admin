/*
    created by: Adity Jha
    date: 13-02-2017
 */

"use strict";

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Link} from 'react-router';

const Main = (props) => {
    return (
        <MuiThemeProvider>
            <div>
                <h1>Main Component</h1>
                <Link to="/login">Login</Link>
                {props.children}
            </div>
        </MuiThemeProvider>
    );
};

module.exports = Main;