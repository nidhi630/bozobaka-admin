/*
 created by aditya on 17-02-2017
 */
"use strict";

import ActionConstants from './../actions/ActionConstants';

const UserReducer = (state = {}, action) => {
    switch(action.type) {
        case ActionConstants.GET_USER_ROLE:
            return state.userRole;
        default:
            return state;
    }
};

export default UserReducer;