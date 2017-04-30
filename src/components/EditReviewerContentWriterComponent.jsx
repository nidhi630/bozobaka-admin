"use strict";

import React from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import {Row, Col} from "react-flexbox-grid";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import ContentService from "./../services/ContentService";
import CircularProgress from "material-ui/CircularProgress";
import Snackbar from "material-ui/Snackbar";
import {makeRequest} from "./../services/APIService";
import Course from "./../models/Course";
import DropdownDisplay from "./DropdownDisplayComponent";

export default class EditReviewerContentWriterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            dialogTitle: props.userToOpen.id ? "Edit " + props.userRole : "Add New " + props.userRole,
            requestInProgress: false,
            openSnackbar: false,
            snackbarMessage: "",
            sections: props.userToOpen.sections ? props.userToOpen.sections : [],
            allCourses: []
        };
    }

    componentWillMount() {
        this.setState({openDialog: this.props.showDialog});
    }

    componentDidMount() {
        makeRequest({
            url: "courses?filter={\"include\":[\"sections\",\"admins\"]}"
        }).then((res) => {
            console.log(res);
            this.setState({
                allCourses: Course.parseCourses(res.data)
            });
        }).catch((error) => {
            console.log(error);
            this.setState({
                openSnackbar: true,
                snackbarMessage: error.message
            });
        });
    }

    render() {
        const courseSectionTitleStyle = {marginTop: 10};
        const removeButtonStyle = {marginTop: 30};

        const {userToOpen} = this.props;
        const {dialogTitle, openDialog, openSnackbar, snackbarMessage, requestInProgress, allCourses, sections} = this.state;

        const actions = (
            <Row>
                <Col xs={3}>
                    <FlatButton secondary={true} label="Delete" onTouchTap={this.deleteUser.bind(this)}
                                disabled={!userToOpen.id}/>
                </Col>
                <Col xs={6}>
                    <FlatButton label="Cancel" onTouchTap={this.cancelButton.bind(this)}/>
                </Col>
                <Col xs={3}>
                    <RaisedButton primary={true} label="Save" onTouchTap={this.saveUser.bind(this)}/>
                </Col>
            </Row>
        );

        return (
            <div>
                <Dialog title={dialogTitle} actions={actions} modal={false} open={openDialog}
                        autoScrollBodyContent={true}>
                    <Row>
                        <Col xs={12} sm={6}>
                            <TextField ref="firstName" type="text" hintText="Enter first name"
                                floatingLabelText="First Name" defaultValue={userToOpen.firstName}
                                required/>
                        </Col>
                        <Col xs={12} sm={6}>
                            <TextField ref="lastName" type="text" hintText="Enter last name"
                                floatingLabelText="Last Name" defaultValue={userToOpen.lastName}
                                required/>
                        </Col>
                    </Row>
                    <TextField ref="email" type="email" hintText="Enter email" floatingLabelText="Email"
                        defaultValue={userToOpen.email || ""} required/>
                    <br />
                    <TextField ref="password" title="Minimum 6 characters required" pattern=".{6,}" type="password"
                        hintText="Enter your password" floatingLabelText="Password"
                        defaultValue={userToOpen.password || ""}
                        required/>
                    <br />
                    <br />
                    <Row>
                        <Col xs={5} style={courseSectionTitleStyle}>
                            <h3>Course</h3>
                        </Col>
                        <Col xs={5} style={courseSectionTitleStyle}>
                            <h3>Section</h3>
                        </Col>
                        <Col xs={2}>
                            <RaisedButton label="Add" primary={true} onTouchTap={this.addSection.bind(this)}/>
                        </Col>
                    </Row>
                    <br />
                    <div>
                        {sections.map((section, index) => (
                            <Row key={index}>
                                <Col xs={5}>
                                    <DropdownDisplay menuItems={allCourses} value={section.courseId} onChange={this.updateCourse.bind(this, index)}/>
                                </Col>
                                <Col xs={5}>
                                    <DropdownDisplay menuItems={this.getMenuItemsForSelectedCourse.bind(this, section.course.id)}
                                                     value={section.id} onChange={this.updateSection.bind(this, index)}/>
                                </Col>
                                <Col xs={2}>
                                    <FlatButton secondary={true} label="remove"
                                                onTouchTap={this.removeSection.bind(this, index)}
                                                style={removeButtonStyle}/>
                                </Col>
                            </Row>
                        ))}
                    </div>
                    {requestInProgress ?
                        <Row center="xs">
                            <Col xs={12}><CircularProgress/></Col>
                        </Row> : null}
                </Dialog>

                <Snackbar open={openSnackbar} message={snackbarMessage} autoHideDuration={200000}
                          action="ok" onActionTouchTap={this.resetSnackbar.bind(this)}/>
            </div>
        );
    }

    resetSnackbar() {
        this.setState({openSnackbar: false});
    }

    getMenuItemsForSelectedCourse(selectedCourseId) {
        return this.state.allCourses.map((course, index) => {
            if (course.id === selectedCourseId) {
                return course.sections.map((section, sectionIndex) => (
                    <MenuItem key={index} primaryText={section.name}/>
                ));
            }
        });
    }

    cancelButton(update = false) {
        this.setState({openDialog: false});
        this.props.onDialogClose(update);
    }

    saveUser() {
        let user = {
            firstName: this.refs.firstName.input.value,
            lastName: this.refs.lastName.input.value,
            email: this.refs.email.input.value,
            password: this.refs.password.input.value,
            role: this.props.userRole
        };

        let config = {method: "post"};

        if (this.props.userToOpen.id) {
            config.method = "put";
            user.id = this.props.userToOpen.id;
        }

        this.setState({
            requestInProgress: true,
            openSnackbar: false
        });

        let request = (this.props.userRole === "contentWriter") ?
            ContentService.updateContentWriters(user, config) : ContentService.updateReviewers(user, config);
        request.then((res) => {
            this.setState({requestInProgress: false});
            this.cancelButton(true);
        }).catch((err) => {
            console.log(err);
            this.setState({
                openSnackbar: true,
                snackbarMessage: err.message,
                requestInProgress: false
            });
        });
    }

    deleteUser() {
        if (this.props.userToOpen.id) {
            this.setState({requestInProgress: true, openSnackbar: false});
            let request;
            if (this.props.userRole === "contentWriter") {
                request = ContentService.updateContentWriters(this.props.userToOpen, {method: "delete"});
            } else {
                request = ContentService.updateReviewers(this.props.userToOpen, {method: "delete"});
            }
            request.then((res) => {
                this.setState({requestInProgress: false});
                this.cancelButton(true);
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

    addSection() {
        let updatedSections = [];
        for (let i = 0; i < this.state.sections.length; i++) {
            updatedSections.push(this.state.sections[i]);
        }
        updatedSections.length > 0 ? updatedSections.push(updatedSections[0]) : updatedSections.push({});
        this.setState({
            sections: updatedSections
        });
    }

    removeSection(index) {
        console.log("removeSection from index", index);
        let updatedSections = [];
        for (let i = 0; i < this.state.sections.length; i++) {
            if (i !== index) updatedSections.push(this.state.sections[i]);
        }

        this.setState({
            sections: updatedSections
        });
    }

    updateCourse(index, event, key, payload) {
        console.log("updateCourse from index", payload);
    }

    updateSection(index, event, key, payload) {

    }
}

EditReviewerContentWriterComponent.propTypes = {
    userRole: React.PropTypes.string.isRequired,
    onDialogClose: React.PropTypes.func.isRequired,
    showDialog: React.PropTypes.bool.isRequired,
    userToOpen: React.PropTypes.object.isRequired
};
