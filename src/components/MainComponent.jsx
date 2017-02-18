/*
 created by aditya on 17-02-2017
 */

"use strict";

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import DashboardContainer from './../containers/DashboardContainer';
import SidebarContainer from './../containers/SidebarContainer';
import HeaderContainer from './../containers/HeaderContainer';

const MainComponent = (props) => {
    return (
        <MuiThemeProvider>
            <div>
                <HeaderContainer />
                <div>
                    <SidebarContainer />
                    {props.children ? props.children : <DashboardContainer/>}
                </div>
            </div>
        </MuiThemeProvider>
    )
};

export default MainComponent;