"use strict";

import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import {Row, Col} from "react-flexbox-grid";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import ContentService from "./../services/ContentService";
import CircularProgress from "material-ui/CircularProgress";
import Snackbar from "material-ui/Snackbar";
import TextField from "material-ui/TextField";

export default class EditAdminComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: true,
            dialogTitle: this.props.adminToOpen.id ? "Edit Admin" : "Add New Admin",
            openSnackbar: false,
            snackbarMessage: "",
            requestInProgress: false,
            assignedCourses: this.props.adminToOpen.courses ? this.props.adminToOpen.courses : []
        }
    }

    componentWillMount() {
        this.setState({
            openDialog: this.props.showDialog
        })
    }

    render() {
        const courseTitleStyle = {marginTop: 10};
        const removeButtonStyle = {marginTop: 30};

        const actions = (
            <Row>
                <Col xs={3}>
                    <FlatButton secondary={true} label="Delete"
                                onTouchTap={this.deleteAdmin.bind(this)}
                                disabled={!this.props.adminToOpen.id}/>
                </Col>
                <Col xs={6}>
                    <FlatButton label="Cancel" onTouchTap={this.cancelButton.bind(this)}/>
                </Col>
                <Col xs={3}>
                    <RaisedButton primary={true} label="Save" onTouchTap={this.saveAdmin.bind(this)}/>
                </Col>
            </Row>
        );

        return (
            <div>
                <Dialog title={this.state.dialogTitle} actions={actions} modal={false} open={this.state.openDialog}
                        autoScrollBodyContent={true}>
                    <Row>
                        <Col xs={12} sm={6}>
                            <TextField
                                ref="firstName"
                                type="text"
                                hintText="Enter first name"
                                floatingLabelText="First Name"
                                defaultValue={this.props.adminToOpen.firstName}
                                required/>
                        </Col>
                        <Col xs={12} sm={6}>
                            <TextField
                                ref="lastName"
                                type="text"
                                hintText="Enter last name"
                                floatingLabelText="Last Name"
                                defaultValue={this.props.adminToOpen.lastName}
                                required/>
                        </Col>
                    </Row>
                    <TextField
                        ref="email"
                        type="email"
                        hintText="Enter email"
                        floatingLabelText="Email"
                        defaultValue={this.props.adminToOpen.email ? this.props.adminToOpen.email : ""}
                        required/>
                    <br />
                    <TextField
                        ref="password"
                        title="Minimum 6 characters required"
                        pattern=".{6,}"
                        type="password"
                        hintText="Enter your password"
                        floatingLabelText="Password"
                        defaultValue={this.props.adminToOpen.password ? this.props.adminToOpen.password : ""}
                        required/>
                    <br />
                    <br />
                    <Row>
                        <Col xs={8} style={courseTitleStyle}>
                            <h3>Courses</h3>
                        </Col>
                        <Col xs={2}>
                            <RaisedButton label="Add" primary={true} onTouchTap={this.addCourse.bind(this)}
                                          disabled={!this.props.courses.length}/>
                        </Col>
                    </Row>
                    <br />
                    {this.props.courses.length > 0 ?
                        <div>
                            {this.state.assignedCourses.map((assignedCourse, index) => (
                                <Row key={index}>
                                    <Col xs={7}>
                                        <SelectField
                                            floatingLabelText="Course"
                                            value={assignedCourse.id}
                                            onChange={this.updateCourse.bind(this, index)}>
                                            {this.props.courses.map((course, courseIndex) => (
                                                <MenuItem key={courseIndex} value={course.id}
                                                          primaryText={course.displayName}/>
                                            ))}
                                        </SelectField>
                                    </Col>
                                    <Col xs={2}>
                                        <FlatButton secondary={true} label="remove"
                                                      onTouchTap={this.removeCourse.bind(this, index)}
                                                      style={removeButtonStyle}/>
                                    </Col>
                                </Row>
                            ))}
                        </div> : <h3>No Courses</h3>}
                    {this.state.requestInProgress ?
                        <Row center="xs">
                            <Col xs={12}><CircularProgress/></Col>
                        </Row> : <br/>}
                </Dialog>

                <Snackbar open={this.state.openSnackbar} message={this.state.snackbarMessage} autoHideDuration={4000}/>
            </div>
        )
    }

    addCourse() {
        this.setState({
            assignedCourses: [
                ...this.state.assignedCourses,
                this.props.courses.length ? this.props.courses[0] : {}
            ]
        });
    }

    updateCourse(index, event, key, payload) {
        this.setState({
            assignedCourses: [
                ...this.state.assignedCourses.splice(0, index),
                this.props.courses[key],
                ...this.state.assignedCourses.splice(index + 1)
            ]
        });
    }

    removeCourse(index, event, key, payload) {
        this.setState({
            assignedCourses: [
                ...this.state.assignedCourses.splice(0, index),
                ...this.state.assignedCourses.splice(index + 1)
            ]
        });
    }

    deleteAdmin() {
        if (!this.props.adminToOpen.id) return;
        this.setState({
            requestInProgress: true,
            openSnackbar: false
        });
        ContentService.updateAdmin(this.props.adminToOpen, {method: "delete"})
            .then((res) => {
                console.log(res);
                this.props.updateAdminData(res, false);
                this.setState({
                    requestInProgress: false
                });
                this.cancelButton();
            }).catch((err) => {
            console.log(err);
            this.setState({
                openSnackbar: true,
                snackbarMessage: err.message,
                requestInProgress: false
            });
        });
    }

    cancelButton() {
        this.setState({
            openDialog: false
        });
        this.props.onDialogClose();
    }

    saveAdmin() {
        let user = {
            firstName: this.refs.firstName.input.value,
            lastName: this.refs.lastName.input.value,
            email: this.refs.email.input.value,
            password: this.refs.password.input.value,
            role: "admin",
            courseId: this.state.assignedCourses.map((course) => (course.id))
        };

        let config = {method: "post"};

        if (this.props.adminToOpen.id) {
            config.method = "put";
            user.id = this.props.adminToOpen.id;
        }

        this.setState({
            requestInProgress: true,
            openSnackbar: false
        });

        ContentService.updateAdmin(user, config)
            .then((res) => {
                this.props.updateAdminData(res, false);
                this.setState({
                    requestInProgress: false
                });
                this.cancelButton();
            }).catch((err) => {
            console.log(err);
            this.setState({
                openSnackbar: true,
                snackbarMessage: err.message,
                requestInProgress: false
            });
        });
    }
}
