"use strict";

import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import injectTapEventPlugin from "react-tap-event-plugin";
import {createStore} from "redux";
import {Provider} from 'react-redux'
import reducers from "./reducers/reducers";
import AppContainer from './containers/AppContainer';
import AddQuestionContainer from './containers/AddQuestionContainer';
import AllQuestionsContainer from './containers/AllQuestionsContainer';
import DashboardContainer from './containers/DashboardContainer';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

let store = createStore(reducers);

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={AppContainer}>
                <IndexRoute component={DashboardContainer}/>
                <Route path="add-question" component={AddQuestionContainer}/>
                <Route path="all-questions" component={AllQuestionsContainer}/>
            </Route>
        </Router>
    </Provider>
    ,
    document.querySelector("#app")
);