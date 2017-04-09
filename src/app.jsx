"use strict";

import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import injectTapEventPlugin from "react-tap-event-plugin";
import {Provider} from "react-redux";
import AppContainer from './containers/AppContainer';
import AddQuestionContainer from './containers/AddQuestionContainer';
import AllQuestionsContainer from './containers/AllQuestionsContainer';
import DashboardContainer from './containers/DashboardContainer';
import Urls from "./models/Urls";
import ManageContainer from "./containers/ManageContainer";
import ManageCourseContainer from "./containers/ManageCourseContainer";
import configureStore from "./store";
import AddTheoryContainer from "./containers/AddTheoryContainer";

require("style-loader!css-loader!./styles/styles.css");

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

let store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path={Urls.DASHBOARD} component={AppContainer}>
                <IndexRoute component={DashboardContainer}/>
                <Route path={Urls.ADD_QUESTION} component={AddQuestionContainer}/>
                <Route path={Urls.LIST_QUESTIONS} component={AllQuestionsContainer}/>
                <Route path={Urls.MANAGE} component={ManageContainer}/>
                <Route path={Urls.MANAGE_COURSE} component={ManageCourseContainer}/>
                <Route path={Urls.ADD_THEORY} component={AddTheoryContainer}/>
            </Route>
        </Router>
    </Provider>
    ,
    document.querySelector("#app")
);