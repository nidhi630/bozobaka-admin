/*
    created by: Aditya Jha
    date: 13-02-2017
 */

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <MuiThemeProvider>
                <h2>Login Component</h2>
            </MuiThemeProvider>
        )
    }
}

module.exports = LoginComponent;