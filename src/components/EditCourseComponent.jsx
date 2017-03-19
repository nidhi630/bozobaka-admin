"use strict";

import React, {PropTypes} from "react";
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
            dialogTitle: props.courseToOpen.id ? "Edit Course" : "Add New Course",
            courseAdminId: this.props.courseToOpen.adminId,
            requestInProgress: false,
            openSnackbar: false,
            snackbarMessage: ""
        }
    }

    componentWillMount() {
        this.setState({openDialog: this.props.showDialog});
    }

    render() {
        const actions = (
            <Row>
                <Col xs={3}>
                    <FlatButton secondary={true} label="Delete" onTouchTap={this.deleteCourse.bind(this)}
                                disabled={!this.props.courseToOpen.id}/>
                </Col>
                <Col xs={6}>
                    <FlatButton label="Cancel" onTouchTap={this.cancelButton.bind(this)}/>
                </Col>
                <Col xs={3}>
                    <RaisedButton primary={true} label="Save" onTouchTap={this.saveCourse.bind(this)}/>
                </Col>
            </Row>
        );

        return (
            <div>
                <Dialog title={this.state.dialogTitle} actions={actions} modal={false} open={this.state.openDialog}>
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
                                {this.props.courseToOpen.id ? <p>courseID: <b>{this.props.courseToOpen.id}</b></p> : ""}
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
                                    {this.props.admins.map((admin, index) => (
                                        <MenuItem key={index} value={admin.id}
                                                  primaryText={admin.displayName}/>
                                    ))}
                                </SelectField>
                            </Col>
                        </Row>
                        <br/>
                        {this.state.requestInProgress ?
                            <Row center="xs">
                                <Col xs={12}><CircularProgress/></Col>
                            </Row> : <br/>}
                    </form>
                </Dialog>

                <Snackbar open={this.state.openSnackbar} message={this.state.snackbarMessage} autoHideDuration={2000}/>
            </div>
        )
    }

    cancelButton(update = false) {
        this.setState({openDialog: false});
        this.props.onDialogClose(update);
    }

    setCourseAdmin(event, index, value) {
        console.log(value);
        this.setState({courseAdminId: value});
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

    validCourse(course) {
        return course.name.length > 0 && course.language.length > 0 && course.displayName.length > 0;
    }

    saveCourse(event) {
        event.preventDefault();
        let course = {
            name: this.refs.courseName.input.value,
            language: this.refs.courseLanguage.input.value,
            displayName: this.refs.courseDisplayName.input.value,
            admins: this.refs.courseAdmin.props.value ? [this.refs.courseAdmin.props.value] : []
        };

        if (!this.validCourse(course)) return;

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
                this.setState({requestInProgress: false});
                this.cancelButton(true);
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
            this.setState({requestInProgress: true, openSnackbar: false});
            ContentService.updateCourse(this.props.courseToOpen, {method: "delete"})
                .then((res) => {
                    console.log(res);
                    this.props.updateCourse(this.props.courseToOpen, true);
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
}

EditCourseComponent.propTypes = {
    courseToOpen: PropTypes.object.isRequired,
    showDialog: PropTypes.bool.isRequired,
    admins: PropTypes.array.isRequired,
    onDialogClose: PropTypes.func.isRequired
};