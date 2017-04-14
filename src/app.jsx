"use strict";

import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import injectTapEventPlugin from "react-tap-event-plugin";
import {Provider} from "react-redux";
import App from "./containers/AppContainer";
import AddQuestion from "./containers/AddQuestionContainer";
import Dashboard from "./containers/DashboardContainer";
import Urls from "./models/Urls";
import Manage from "./containers/ManageContainer";
import ManageCourse from "./containers/ManageCourseContainer";
import configureStore from "./store";
import AddTheory from "./containers/AddTheoryContainer";
import ListTheories from "./containers/ListTheoriesContainer";
import ListQuestions from "./containers/ListQuestionsContainer";

require("style-loader!css-loader!./styles/styles.css");
require("style-loader!css-loader!./../node_modules/react-quill/dist/quill.snow.css");

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

let store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path={Urls.DASHBOARD} component={App}>
                <IndexRoute component={Dashboard}/>
                <Route path={Urls.ADD_QUESTION} component={AddQuestion}/>
                <Route path={Urls.LIST_QUESTIONS} component={ListQuestions}/>
                <Route path={Urls.MANAGE} component={Manage}/>
                <Route path={Urls.MANAGE_COURSE} component={ManageCourse}/>
                <Route path={Urls.ADD_THEORY} component={AddTheory}/>
                <Route path={Urls.LIST_THEORY} component={ListTheories}/>
            </Route>
        </Router>
    </Provider>
    ,
    document.querySelector("#app")
);
