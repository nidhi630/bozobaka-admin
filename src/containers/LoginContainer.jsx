/*
 created by aditya on 17-02-2017
 set props for login component
 */

"use strict";

import {connect} from "react-redux";
import GlobalActions from "../actions/GlobalActions";
import LoginComponent from "./../components/LoginComponent";

const mapStateToProps = (state) => {
    return {
        ...state.GlobalReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleLoader: (status) => {
            dispatch(GlobalActions.toggleLoader(status));
        },
        toggleLoginStatus: (status) => {
            dispatch(GlobalActions.toggleLoginStatus(status));
        }
    };
};

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent);

export default LoginContainer;