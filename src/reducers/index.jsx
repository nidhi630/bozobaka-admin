/*
 created by aditya on 17-02-2017
 */

"use strict";

import {combineReducers} from "redux"

import GlobalReducer from  "./GlobalReducer";
import ContentReducer from "./ContentReducer";
import {newTheoryReducer} from "./TheoryReducer";
import {SectionsReducer, L1sReducer, L2sReducer, L3sReducer, L4sReducer} from "./SectionsReducer";
import {sourceReducer} from "./SourceReducer";

export default combineReducers({
    GlobalReducer,
    ContentReducer,
    sections: SectionsReducer,
    l1s: L1sReducer,
    l2s: L2sReducer,
    l3s: L3sReducer,
    l4s: L4sReducer,
    newTheory: newTheoryReducer,
    sources: sourceReducer,
    question: questionReducer
});