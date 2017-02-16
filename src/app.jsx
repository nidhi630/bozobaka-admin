"use strict";

import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, browserHistory} from "react-router";
import injectTapEventPlugin from "react-tap-event-plugin";

import Main from './components/Main';
import LoginComponent from './components/LoginComponent';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <Route path="login" component={LoginComponent} />
        </Route>
    </Router>
    ,
    document.querySelector("#app")
);