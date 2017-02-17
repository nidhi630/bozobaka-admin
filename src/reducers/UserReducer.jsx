/*
 created by aditya on 17-02-2017
 */
"use strict";

import ActionConstants from './../actions/ActionConstants';

const UserReducer = (state = {}, action) => {
    switch(action.type) {
        case ActionConstants.TOGGLE_LOGIN_STATUS:
            return {
                ...state,
                isLoggedIn: action.status
            };
        default:
            return state;
    }
};

export default UserReducer;