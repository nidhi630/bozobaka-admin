"use strict";

import {INIT_SOURCES} from "./../actions/ActionConstants";

let defaultState = [];

const SourceReducer = (state = defaultState, action) => {
    switch (action.type) {
        case INIT_SOURCES:
            return action.sources;
        default:
            return state;
    }
};

export default SourceReducer;