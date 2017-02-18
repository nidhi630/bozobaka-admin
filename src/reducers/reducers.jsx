/*
 created by aditya on 17-02-2017
 */

"use strict";

import {combineReducers} from 'redux'

import UserReducer from './UserReducer';
import GlobalReducer from  './GlobalReducer';
import ContentReducer from './ContentReducer';

const reducers = combineReducers({
    UserReducer,
    GlobalReducer,
    ContentReducer
});

export default reducers;