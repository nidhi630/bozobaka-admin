/*
 created by: Aditya Jha
 date: 13-02-2017
 */
import React from "react";
import {browserHistory} from "react-router";
import CircularProgress from "material-ui/CircularProgress";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Checkbox from "material-ui/Checkbox";
import Constants from "../models/Constants.jsx";
import SectionTitle from "./SectionTitle";
import LoginService from "./../services/LoginService";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkingLoginState: false
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillMount() {
        if (this.props.isLoggedIn) {
            browserHistory.push('/');
        }
    }

    _login() {
        LoginService.login({
            email: this.refs.email.input.value,
            password: this.refs.password.input.value,
            rememberMe: this.refs.rememberMe.state.switched
        }).then((res) => {
            this.props.toggleLoader(false);
            this.props.toggleLoginStatus(true);
            console.log("res");
        }).catch((err) => {
            this.props.toggleLoader(false);
            console.log(err);
        });
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.toggleLoader(true);

        setTimeout(() => {
            this._login();
        }, 2000);
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <h1>{Constants.title}</h1>
                    <SectionTitle title="Login"/>
                    <form onSubmit={this.onFormSubmit.bind(this)}>
                        <TextField
                            defaultValue="a@j.com"
                            ref="email"
                            type="email"
                            hintText="Enter your email"
                            floatingLabelText="Email"
                            required/>
                        <br />
                        <TextField
                            defaultValue="111111"
                            ref="password"
                            title="Minimum 6 characters required"
                            pattern=".{6,}"
                            type="password"
                            hintText="Enter your password"
                            floatingLabelText="Password"
                            required/>
                        <br />
                        <br />
                        <Checkbox
                            ref="rememberMe"
                            label="Remember Me"/>
                        <br />
                        {this.props.showLoader ? <CircularProgress /> :
                            <RaisedButton label="Log in" primary={true} type="submit"/>}
                    </form>
                </div>
            </MuiThemeProvider>
        );
    }
}

module.exports = LoginComponent;