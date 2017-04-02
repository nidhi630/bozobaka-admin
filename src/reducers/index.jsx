/*
 created by aditya on 17-02-2017
 */

"use strict";

import {combineReducers} from "redux"

import GlobalReducer from  "./GlobalReducer";
import ContentReducer from "./ContentReducer";

export default combineReducers({
    GlobalReducer,
    ContentReducer
});