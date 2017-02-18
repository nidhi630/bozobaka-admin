"use strict";

import {connect} from 'react-redux';
import AppComponent from './../components/AppComponent';

const mapStateToProps = (state) => {
    return {
        ...state.GlobalReducer,
        ...state.UserReducer,
        ...state.ContentReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppComponent);

export default AppContainer;