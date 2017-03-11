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

export default class EditCourseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            dialogTitle: this.props.courseToOpen.id ? "Edit Course" : "Add New Course",
            courseAdminId: this.props.courseToOpen.adminId,
            requestInProgress: false
        }
    }

    componentWillMount() {
        this.setState({
            openDialog: this.props.showDialog
        })
    }

    render() {
        return (
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
                    {this.state.requestInProgress ? <CircularProgress/> :
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
        )
    }

    cancelButton() {
        this.setState({
            openDialog: false
        });
        this.props.onDialogClose("courseDialog");
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

        let config = {method: "put"};

        if (!this.props.courseToOpen.id) {
            config.method = "post";
        }

        this.setState({
            requestInProgress: true
        });
        ContentService.updateCourse(course, config)
            .then((res) => {
                /* TODO: update course in state */
                this.props.updateCourse(res);
                this.setState({
                    requestInProgress: false
                });
                this.cancelButton();
            }).catch((err) => {
            /* TODO: show error */
            this.setState({
                requestInProgress: false
            });
        });
    }

    deleteCourse() {
        if (this.props.courseToOpen.id) {
            /* TODO: make delete request through ContentService */
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