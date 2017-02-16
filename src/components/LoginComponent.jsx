/*
 created by: Aditya Jha
 date: 13-02-2017
 */

import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Constants from '../models/Constants.jsx';
import SectionTitle from './SectionTitle';
import LoginService from './../services/LoginService';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkingLoginState: false,
            isLoggedIn: false
        };
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.setState({
            checkingLoginState: true
        });
        LoginService.login({
            email: this.refs.email.input.value,
            password: this.refs.password.input.value
        }).then((res) => {
            this.setState({
                checkingLoginState: false
            });
            console.log("res");
        }).catch((err) => {
            this.setState({
                checkingLoginState: false
            });
            console.log(err);
        });
    }

    render() {
        let buttonSection = this.state.checkingLoginState ?
            <CircularProgress /> : <RaisedButton label="Log in" primary={true} type="submit"/>;

        return (
            <div>
                <h1>{Constants.title}</h1>
                <SectionTitle title="Login"/>
                <form onSubmit={this.onFormSubmit.bind(this)}>
                    <TextField ref="email" type="email" hintText="Enter your email" floatingLabelText="Email" required/>
                    <br />
                    <TextField ref="password" title="Minimum 6 characters required" pattern=".{6,}" type="password" hintText="Enter your password" floatingLabelText="Password" required/>
                    <br />
                    <br />
                    {buttonSection}
                </form>
            </div>
        );
    }
}

module.exports = LoginComponent;