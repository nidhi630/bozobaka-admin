/*
 created by aditya on 17-02-2017
 */

"use strict";

import ActionConstants from './ActionConstants';

const Actions = {
    toggleLoginStatus(newStatus) {
        return {
            type: ActionConstants.TOGGLE_LOGIN_STATUS,
            status: newStatus
        };
    }
};

export default Actions;