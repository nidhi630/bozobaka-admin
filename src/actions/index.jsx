/*
 created by aditya on 17-02-2017
 */

"use strict";

let Actions = {
    toggleLoginStatus(newStatus) {
        return {
            type: 'TOGGLE_LOGIN_STATUS',
            status: newStatus
        };
    }
};

export default Actions;