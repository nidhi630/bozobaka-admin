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

export default class EditCourseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            dialogTitle: this.props.courseToOpen.id ? "Edit Course" : "Add New Course",
            courseAdminId: this.props.courseToOpen.adminId,
            requestInProgress: false,
            openSnackbar: false,
            snackbarMessage: ""
        }
    }

    componentWillMount() {
        this.setState({
            openDialog: this.props.showDialog
        })
    }

    render() {
        return (
            <div>
                <Dialog title={this.state.dialogTitle} actions={[]} modal={false} open={this.state.openDialog}>
                    <form onSubmit={this.saveCourse.bind(this)}>
                        <Row>
                            <Col xs={12} sm={6}>
                                <TextField
                                    defaultValue={this.props.courseToOpen.name}
                                    ref="courseName"
                                    title="Connot be empty"
                                    pattern=".{1,}"
                                    type="text"
                                    hintText="Enter Course Name"
                                    floatingLabelText="Course Name"
                                    onChange={this.onCourseNameChange.bind(this)}
                                    required/>
                                <br/>
                                <TextField
                                    defaultValue={this.props.courseToOpen.language}
                                    ref="courseLanguage"
                                    title="Connot be empty"
                                    pattern=".{1,}"
                                    type="text"
                                    hintText="Enter Language"
                                    floatingLabelText="Language"
                                    onChange={this.onCourseLanguageChange.bind(this)}
                                    required/>
                            </Col>
                            <Col xs={12} sm={6}>
                                <TextField
                                    defaultValue={this.props.courseToOpen.displayName}
                                    ref="courseDisplayName"
                                    title="Connot be empty"
                                    pattern=".{1,}"
                                    type="text"
                                    floatingLabelFixed={true}
                                    floatingLabelText="Display Name"
                                    required/>
                                <br/>
                                <br/>
                                <p>courseID: <b>{this.props.courseToOpen.id}</b></p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <SelectField
                                    ref="courseAdmin"
                                    floatingLabelText="Admin"
                                    value={this.state.courseAdminId}
                                    onChange={this.setCourseAdmin.bind(this)}>
                                    <MenuItem value={null} primaryText="Assign Later"/>
                                    {this.props.adminIds.map((adminId, index) => (
                                        <MenuItem key={index} value={adminId}
                                                  primaryText={this.props.admins[adminId].firstName}/>
                                    ))}
                                </SelectField>
                            </Col>
                        </Row>
                        <br/>
                        {this.state.requestInProgress ?
                            <Row center="xs">
                                <Col xs={12}>
                                    <CircularProgress/>
                                </Col>
                            </Row>
                            :
                            <Row>
                                <Col xs={6}>
                                    {this.props.courseToOpen.id ?
                                        <FlatButton secondary={true} label="Delete"
                                                    onTouchTap={this.deleteCourse.bind(this)}/> :
                                        <div></div>}
                                </Col>
                                <Col xs={3}>
                                    <FlatButton label="Cancel" onTouchTap={this.cancelButton.bind(this)}/>
                                </Col>
                                <Col xs={3}>
                                    <RaisedButton primary={true} label="Save" type="submit"/>
                                </Col>
                            </Row>
                        }
                    </form>
                </Dialog>

                <Snackbar open={this.state.openSnackbar} message={this.state.snackbarMessage} autoHideDuration={2000}/>
            </div>
        )
    }

    cancelButton() {
        this.setState({
            openDialog: false
        });
        this.props.onDialogClose();
    }

    setCourseAdmin(event, index, value) {
        console.log(value);
        this.setState({
            courseAdminId: value
        });
    }

    generateDisplayName() {
        let courseName = this.refs.courseName.input.value;
        let courseLanguage = this.refs.courseLanguage.input.value;
        this.refs.courseDisplayName.input.value = courseName + " (" + courseLanguage + ")";
    }

    onCourseNameChange(event, newValue) {
        this.generateDisplayName();
    }

    onCourseLanguageChange(event, newValue) {
        this.generateDisplayName();
    }

    saveCourse(event) {
        event.preventDefault();
        let course = {
            name: this.refs.courseName.input.value,
            language: this.refs.courseLanguage.input.value,
            displayName: this.refs.courseDisplayName.input.value,
            adminId: this.refs.courseAdmin.props.value
        };

        let config = {method: "post"};

        if (this.props.courseToOpen.id) {
            config.method = "put";
            course.id = this.props.courseToOpen.id;
        }

        this.setState({
            requestInProgress: true,
            openSnackbar: false
        });
        ContentService.updateCourse(course, config)
            .then((res) => {
                this.props.updateCourse(res);
                this.setState({
                    requestInProgress: false
                });
                this.cancelButton();
            }).catch((err) => {
            this.setState({
                openSnackbar: true,
                snackbarMessage: err.message,
                requestInProgress: false
            });
        });
    }

    deleteCourse() {
        if (this.props.courseToOpen.id) {
            this.setState({
                requestInProgress: true,
                openSnackbar: false
            });
            ContentService.updateCourse(this.props.courseToOpen, {
                method: "delete"
            }).then((res) => {
                console.log(res);
                this.props.updateCourse(this.props.courseToOpen, true);
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
}

EditCourseComponent.propTypes = {
    courseToOpen: React.PropTypes.object.isRequired,
    showDialog: React.PropTypes.bool.isRequired,
    admins: React.PropTypes.object.isRequired,
    adminIds: React.PropTypes.array.isRequired,
    onDialogClose: React.PropTypes.func.isRequired
};