"use strict";

import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory} from "react-router";
import injectTapEventPlugin from "react-tap-event-plugin";
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import reducers from './reducers/reducers';
import MainContainer from './containers/MainContainer';
import LoginService from './services/LoginService';
import GlobalActions from './actions/GlobalActions';
import LoginContainer from './containers/LoginContainer';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

let store = createStore(reducers);

const App = () => {
    store.dispatch(
        GlobalActions.toggleLoginStatus(LoginService.checkIfLoggedIn())
    );

    let isLoggedIn = LoginService.checkIfLoggedIn();
    return (
        <Provider store={store}>
            {!isLoggedIn ? <MainContainer/> : <LoginContainer/>}
        </Provider>
    );
};

render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
        </Route>
    </Router>
    ,
    document.querySelector("#app")
);