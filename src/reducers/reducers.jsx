/*
 created by aditya on 17-02-2017
 */

"use strict";

import { combineReducers } from 'redux'

import UserReducer from './UserReducer';
import GlobalReducer from  './GlobalReducer';

const reducers = combineReducers({
    UserReducer,
    GlobalReducer
});

export default reducers;