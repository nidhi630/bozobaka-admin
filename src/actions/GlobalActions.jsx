/*
 created by aditya on 17-02-2017
 */

"use strict";

import {TOGGLE_LOGIN_STATUS, TOGGLE_NAVIGATION_DRAWER, SET_LOGGED_IN_USER} from "./ActionConstants";

const GlobalActions = {
    toggleLoginStatus(newStatus) {
        return {
            type: TOGGLE_LOGIN_STATUS,
            status: newStatus
        };
    },

    toggleNavigationDrawer(newStatus) {
        return {
            type: TOGGLE_NAVIGATION_DRAWER,
            status: newStatus
        };
    },
    setLoggedInUser(user) {
        return {
            type: SET_LOGGED_IN_USER,
            loggedInUser: user
        };
    }
};

export default GlobalActions;
