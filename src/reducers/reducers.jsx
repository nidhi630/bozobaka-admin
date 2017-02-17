/*
 created by aditya on 17-02-2017
 */

"use strict";

import { combineReducers } from 'redux'

import UserReducer from './UserReducer';

const reducers = combineReducers({
    user: UserReducer
});

export default reducers;