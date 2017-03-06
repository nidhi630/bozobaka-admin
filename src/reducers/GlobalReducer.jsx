/*
 created by aditya on 17-02-2017
 */
"use strict";

import ActionConstants from "./../actions/ActionConstants";
import LoginService from "./../services/LoginService";

let defaultState = {
    isLoggedIn: LoginService.checkIfLoggedIn(),
    showLoader: false,
    openNavigationDrawer: false
};

const GlobalReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionConstants.TOGGLE_LOGIN_STATUS:
            return {
                ...state,
                isLoggedIn: action.status
            };
        case ActionConstants.TOGGLE_LOADER:
            return {
                ...state,
                showLoader: action.status
            };
        case ActionConstants.TOGGLE_NAVIGATION_DRAWER:
            return {
                ...state,
                openNavigationDrawer: action.status
            };
        default:
            return state;
    }
};

export default GlobalReducer;