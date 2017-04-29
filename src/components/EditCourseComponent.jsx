"use strict";

import React, {PropTypes} from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import {Row, Col} from "react-flexbox-grid";
import ContentService from "./../services/ContentService";
import CircularProgress from "material-ui/CircularProgress";
import Snackbar from "material-ui/Snackbar";
import DropdownDisplay from "./DropdownDisplayComponent";
import Course from "./../models/Course";

export default class EditCourseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            dialogTitle: props.courseToOpen.id ? "Edit Course" : "Add New Course",
            requestInProgress: false,
            openSnackbar: false,
            snackbarMessage: "",
            course: props.courseToOpen ? props.courseToOpen : new Course()
        };
    }

    componentWillMount() {
        this.setState({openDialog: this.props.showDialog});
    }

    render() {

        const {admins} = this.props;
        const {dialogTitle, openDialog, course} = this.state;

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
                <Dialog title={dialogTitle} actions={actions} modal={false} open={openDialog}
                        autoScrollBodyContent={true}>
                    <form onSubmit={this.saveCourse.bind(this)}>
                        <Row>
                            <Col xs={12} sm={6}>
                                <TextField value={course.name} type="text" title="Connot be empty"
                                           floatingLabelText="Course Name" pattern=".{1,}" hintText="Enter Course Name"
                                           onChange={this.onCourseNameChange.bind(this)} required/>
                                <br/>
                                <TextField value={course.language} type="text" pattern=".{1,}"
                                           title="Connot be empty" hintText="Enter Language"
                                           floatingLabelText="Language"
                                           onChange={this.onCourseLanguageChange.bind(this)} required/>
                            </Col>
                            <Col xs={12} sm={6}>
                                <TextField value={course.displayName} title="Connot be empty" pattern=".{1,}"
                                           type="text" floatingLabelFixed={true} floatingLabelText="Display Name"
                                           required/>
                                <br/>
                                <br/>
                                {course.id ? <p>courseID: <b>{course.id}</b></p> : ""}
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <h3>Admins</h3>
                            <br/>
                        </Row>
                        <br/>
                        {course && course.adminIds ? course.adminIds.map((courseAdmin, index) => (
                            <Row key={courseAdmin}>
                                <Col xs={12} sm={8}>
                                    <DropdownDisplay onChange={this.setCourseAdmin.bind(this, index)}
                                                     menuItems={admins} value={courseAdmin}/>
                                </Col>
                                <Col xs={12} sm={4}>
                                    <FlatButton secondary={true} label="remove"
                                                onTouchTap={this.removeCourseAdmin.bind(this, index)}/>
                                </Col>
                            </Row>
                        )) : null}
                        <br/>
                        <RaisedButton primary={true} label="Add Another Admin"
                                      onTouchTap={this.addCourseAdmin.bind(this)}/>
                        {this.state.requestInProgress ?
                            <Row center="xs">
                                <Col xs={12}><CircularProgress/></Col>
                            </Row> : <br/>}
                    </form>
                </Dialog>

                <Snackbar open={this.state.openSnackbar} message={this.state.snackbarMessage} autoHideDuration={2000}/>
            </div>
        );
    }

    cancelButton(update = false) {
        this.setState({openDialog: false});
        this.props.onDialogClose(update);
    }

    addCourseAdmin() {
        const {course} = this.state;
        this.setState({
            course: {
                ...course,
                adminIds: !course.adminIds ? [""] : [
                    ...course.adminIds,
                    ""
                ]
            }
        });
    }

    setCourseAdmin(adminIndex, event, index, value) {
        const {course} = this.state;
        this.setState({
            course: {
                ...course,
                adminIds: [
                    ...course.adminIds.slice(0, adminIndex),
                    value,
                    ...course.adminIds.slice(adminIndex + 1)
                ]
            }
        });
    }

    removeCourseAdmin(index) {
        const {course} = this.state;
        this.setState({
            course: {
                ...course,
                adminIds: [
                    ...course.adminIds.slice(0, index),
                    ...course.adminIds.slice(index + 1)
                ]
            }
        });
    }

    onCourseNameChange(event, newValue) {
        const {course} = this.state;
        this.setState({
            course: {
                ...course,
                name: newValue,
                displayName: newValue + " (" + (course.language || "") + ")"
            }
        });
    }

    onCourseLanguageChange(event, newValue) {
        const {course} = this.state;
        this.setState({
            course: {
                ...course,
                language: newValue,
                displayName: (course.name || "") + " (" + newValue + ")"
            }
        });
    }

    validCourse(course) {
        if (course.adminIds && course.adminIds.length > 0) {
            course.adminIds = course.adminIds.filter(admin => (admin !== ""));
        } else {
            course.adminIds = [];
        }
        return course.name.length > 0 && course.language.length > 0 && course.displayName.length > 0;
    }

    saveCourse(event) {
        const {course} = this.state;

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
    onDialogClose: PropTypes.func.isRequired,
    updateCourse: PropTypes.func
};
