"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Home from './components/Home.jsx';
import LoginComponent from './components/LoginComponent.jsx';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/login" component={LoginComponent} />
    </Router>
    ,
    document.querySelector("#app")
);