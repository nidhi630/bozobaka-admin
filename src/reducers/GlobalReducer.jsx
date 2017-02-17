/*
 created by aditya on 17-02-2017
 */
"use strict";

import ActionConstants from './../actions/ActionConstants';

const GlobalReducer = (state = {}, action) => {
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
        default:
            return state;
    }
};

export default GlobalReducer;