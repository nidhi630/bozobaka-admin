"use strict";

import React, {PropTypes} from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import {Row, Col} from "react-flexbox-grid";
import ContentService from "./../services/ContentService";
import CircularProgress from "material-ui/CircularProgress";
import Snackbar from "material-ui/Snackbar";
import TextField from "material-ui/TextField";
import Admin from "./../models/Admin";
import DropdownDisplay from "./DropdownDisplayComponent";

export default class EditAdminComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: true,
            dialogTitle: this.props.adminToOpen.id ? "Edit Admin" : "Add New Admin",
            openSnackbar: false,
            snackbarMessage: "",
            requestInProgress: false,
            admin: props.adminToOpen || new Admin()
        };
    }

    componentWillMount() {
        this.setState({openDialog: this.props.showDialog});
    }

    render() {
        const courseTitleStyle = {marginTop: 10};
        const removeButtonStyle = {marginTop: 30};

        const {courses} = this.props;
        const {dialogTitle, openDialog, admin} = this.state;

        const actions = (
            <Row>
                <Col xs={3}>
                    <FlatButton secondary={true} label="Delete" onTouchTap={this.deleteAdmin.bind(this)}
                                disabled={!admin.id}/>
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
                <Dialog title={dialogTitle} actions={actions} modal={false} open={openDialog}
                        autoScrollBodyContent={true}>
                    <Row>
                        <Col xs={12} sm={6}>
                            <TextField type="text" hintText="Enter first name" floatingLabelText="First Name"
                                       value={admin.firstName || ""}
                                       onChange={this.onTextChange.bind(this, "firstName")}
                                       required/>
                        </Col>
                        <Col xs={12} sm={6}>
                            <TextField type="text" hintText="Enter last name" floatingLabelText="Last Name"
                                       value={admin.lastName || ""} onChange={this.onTextChange.bind(this, "lastName")}
                                       required/>
                        </Col>
                    </Row>
                    <TextField type="email" hintText="Enter email" floatingLabelText="Email"
                               onChange={this.onTextChange.bind(this, "email")} value={admin.email || ""} required/>
                    <br />
                    <TextField pattern=".{6,}" type="password" hintText="Enter your password"
                               onChange={this.onTextChange.bind(this, "password")} floatingLabelText="Password"
                               value={admin.password || ""} required/>
                    <br />
                    <br />
                    <Row>
                        <Col xs={8} style={courseTitleStyle}>
                            <h3>Courses</h3>
                        </Col>
                        <Col xs={2}>
                            <RaisedButton label="Add" primary={true} onTouchTap={this.addCourse.bind(this)}
                                          disabled={!courses.length}/>
                        </Col>
                    </Row>
                    <br />
                    <div>
                        {admin.courseIds ? admin.courseIds.map((courseId, index) => (
                            <Row key={courseId}>
                                <Col xs={12} sm={8}>
                                    <DropdownDisplay onChange={this.updateCourse.bind(this, index)}
                                                     menuItems={courses} value={courseId}/>
                                </Col>
                                <Col xs={12} sm={4}>
                                    <FlatButton secondary={true} label="remove" style={removeButtonStyle}
                                                onTouchTap={this.removeCourse.bind(this, index)}/>
                                </Col>
                            </Row>
                        )) : null}
                    </div>
                    {this.state.requestInProgress ?
                        <Row center="xs">
                            <Col xs={12}><CircularProgress/></Col>
                        </Row> : <br/>}
                </Dialog>

                <Snackbar open={this.state.openSnackbar} message={this.state.snackbarMessage} autoHideDuration={4000}/>
            </div>
        );
    }

    onTextChange(type, event, newValue) {
        const admin = {
            ...this.state.admin
        };
        admin[type] = newValue;
        this.setState({
            admin: admin
        });
    }

    addCourse() {
        const {admin} = this.state;
        this.setState({
            admin: {
                ...admin,
                courseIds: !admin.courseIds ? [""] : [
                    ...admin.courseIds,
                    ""
                ]
            }
        });
    }

    updateCourse(index, event, key, payload) {
        const {admin} = this.state;
        this.setState({
            admin: {
                ...admin,
                courseIds: [
                    ...admin.courseIds.slice(0, index),
                    payload,
                    ...admin.courseIds.slice(index + 1)
                ]
            }
        });
    }

    removeCourse(index) {
        const {admin} = this.state;
        this.setState({
            admin: {
                ...admin,
                courseIds: [
                    ...admin.courseIds.slice(0, index),
                    ...admin.courseIds.slice(index + 1)
                ]
            }
        });
    }

    deleteAdmin() {
        const {admin} = this.state;
        if (!admin.id) {
            return;
        }
        this.setState({
            requestInProgress: true,
            openSnackbar: false
        });
        ContentService.updateAdmin(admin, {method: "delete"})
            .then((res) => {
                console.log(res);
                this.setState({
                    requestInProgress: false
                });
                this.cancelButton(null, true);
            }).catch((err) => {
            this.setState({
                openSnackbar: true,
                snackbarMessage: err.message,
                requestInProgress: false
            });
        });
    }

    cancelButton(event, update = false) {
        this.setState({openDialog: false});
        this.props.onDialogClose(update);
    }

    saveAdmin() {
        const {admin} = this.state;

        if (!admin.firstName || !admin.lastName || !admin.email || (!admin.id && !admin.password)) {
            return;
        }

        if (admin.courseIds && admin.courseIds.length) {
            admin.courseIds = admin.courseIds.filter(courseId => courseId !== "");
        } else {
            admin.courseIds = [];
        }
        delete admin.courses;
        admin.role = "admin";

        const config = {method: admin.id ? "put" : "post"};

        this.setState({
            requestInProgress: true,
            openSnackbar: false
        });

        ContentService.updateAdmin(admin, config)
            .then(() => {
                this.setState({requestInProgress: false});
                this.cancelButton(null, true);
            }).catch((err) => {
            this.setState({
                openSnackbar: true,
                snackbarMessage: err.message,
                requestInProgress: false
            });
        });
    }
}

EditAdminComponent.propTypes = {
    showDialog: PropTypes.bool.isRequired,
    adminToOpen: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    onDialogClose: PropTypes.func.isRequired,
};
