"use strict";

import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory} from "react-router";
import injectTapEventPlugin from "react-tap-event-plugin";
import {createStore} from "redux";
import {Provider} from 'react-redux'
import reducers from "./reducers/reducers";
import AppContainer from './containers/AppContainer';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

let store = createStore(reducers);

const App = () => (
    <Provider store={store}>
        <AppContainer />
    </Provider>
);

render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
        </Route>
    </Router>,
    document.querySelector("#app")
);