/*
 created by aditya on 17-02-2017
 */

"use strict";

import {combineReducers} from "redux"

import GlobalReducer from  "./GlobalReducer";
import ContentReducer from "./ContentReducer";
import theory from "./TheoryReducer";

export default combineReducers({
    GlobalReducer,
    ContentReducer,
    theory
});