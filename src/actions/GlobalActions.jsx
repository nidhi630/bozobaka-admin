/*
 created by aditya on 17-02-2017
 */

"use strict";

import ActionConstants from './ActionConstants';

const GlobalActions = {
    toggleLoginStatus(newStatus) {
        return {
            type: ActionConstants.TOGGLE_LOGIN_STATUS,
            status: newStatus
        };
    },
    toggleLoader(newStatus) {
        return {
            type: ActionConstants.TOGGLE_LOADER,
            status: newStatus
        }
    },
    toggleNavigationDrawer(newStatus) {
        return {
            type: ActionConstants.TOGGLE_NAVIGATION_DRAWER,
            status: newStatus
        }
    }
};

export default GlobalActions;