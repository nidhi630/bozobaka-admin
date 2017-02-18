/*
 created by aditya on 17-02-2017
 */

"use strict";

import React from 'react';

import DashboardContainer from './../containers/DashboardContainer';
import SidebarContainer from './../containers/SidebarContainer';
import HeaderContainer from './../containers/HeaderContainer';

const MainComponent = (props) => {
    return (
        <div>
            <HeaderContainer />
            <div>
                <SidebarContainer />
                {props.children ? props.children : <DashboardContainer/>}
            </div>
        </div>
    )
};

export default MainComponent;