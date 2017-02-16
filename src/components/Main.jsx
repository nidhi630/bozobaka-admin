/*
 created by aditya on 17-02-2017
 */

"use strict";

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <h1>Main Component</h1>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}

module.exports = Main;