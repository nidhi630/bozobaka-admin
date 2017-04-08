/*
 created by aditya on 17-02-2017
 */
"use strict";

import {TOGGLE_LOGIN_STATUS, TOGGLE_NAVIGATION_DRAWER, SET_LOGGED_IN_USER} from "./../actions/ActionConstants";
import LoginService from "./../services/LoginService";

let defaultState = {
    isLoggedIn: LoginService.checkIfLoggedIn(),
    openNavigationDrawer: false,
    loggedInUser: {}
};

const GlobalReducer = (state = defaultState, action) => {
    switch (action.type) {
        case TOGGLE_LOGIN_STATUS:
            return {
                ...state,
                isLoggedIn: action.status
            };
        case TOGGLE_NAVIGATION_DRAWER:
            return {
                ...state,
                openNavigationDrawer: action.status
            };
        case SET_LOGGED_IN_USER:
            return {
                ...state,
                loggedInUser: action.loggedInUser
            };
        default:
            return state;
    }
};

export default GlobalReducer;