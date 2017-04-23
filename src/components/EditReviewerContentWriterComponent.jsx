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

export default class EditReviewerContentWriterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            dialogTitle: this.props.userToOpen.id ? "Edit " + this.props.userRole : "Add New " + this.props.userRole,
            requestInProgress: false,
            openSnackbar: false,
            snackbarMessage: "",
            sections: this.props.userToOpen.sections ? this.props.userToOpen.sections : [],
            allCourses: []
        };
    }

    componentWillMount() {
        this.setState({openDialog: this.props.showDialog});
    }

    componentDidMount() {
        /* TODO: Fetch list of all courses along with the sections */
        this.setState({
            allCourses: [{
                id: "aaa",
                displayName: "course 1",
                sections: [{
                    id: "aab",
                    displayName: "section 11",
                }, {
                    id: "aac",
                    displayName: "section 12",
                }]
            }, {
                id: "aba",
                displayName: "course 2",
                sections: [{
                    id: "abb",
                    displayName: "section 21",
                }, {
                    id: "abc",
                    displayName: "section 22",
                }]
            }, {
                id: "aca",
                displayName: "course 3",
                sections: [{
                    id: "acb",
                    displayName: "section 31",
                }, {
                    id: "acc",
                    displayName: "section 32",
                }]
            }]
        });
    }

    render() {
        const courseSectionTitleStyle = {marginTop: 10};
        const removeButtonStyle = {marginTop: 30};

        const actions = (
            <Row>
                <Col xs={3}>
                    <FlatButton secondary={true} label="Delete" onTouchTap={this.deleteUser.bind(this)}
                                disabled={!this.props.userToOpen.id}/>
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
                <Dialog title={this.state.dialogTitle} actions={actions} modal={false} open={this.state.openDialog}
                        autoScrollBodyContent={true}>
                    <Row>
                        <Col xs={12} sm={6}>
                            <TextField
                                ref="firstName"
                                type="text"
                                hintText="Enter first name"
                                floatingLabelText="First Name"
                                defaultValue={this.props.userToOpen.firstName}
                                required/>
                        </Col>
                        <Col xs={12} sm={6}>
                            <TextField
                                ref="lastName"
                                type="text"
                                hintText="Enter last name"
                                floatingLabelText="Last Name"
                                defaultValue={this.props.userToOpen.lastName}
                                required/>
                        </Col>
                    </Row>
                    <TextField
                        ref="email"
                        type="email"
                        hintText="Enter email"
                        floatingLabelText="Email"
                        defaultValue={this.props.userToOpen.email ? this.props.userToOpen.email : ""}
                        required/>
                    <br />
                    <TextField
                        ref="password"
                        title="Minimum 6 characters required"
                        pattern=".{6,}"
                        type="password"
                        hintText="Enter your password"
                        floatingLabelText="Password"
                        defaultValue={this.props.userToOpen.password ? this.props.userToOpen.password : ""}
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
                    {this.state.allCourses.length > 0 ?
                        <div>
                            {this.state.sections.map((section, index) => (
                                <Row key={index}>
                                    <Col xs={5}>
                                        <SelectField
                                            floatingLabelText="Course"
                                            value={section.course.id}
                                            onChange={this.updateCourse.bind(this, index)}>
                                            {this.state.allCourses.map((course, courseIndex) => (
                                                <MenuItem key={courseIndex} value={course.id}
                                                          primaryText={course.displayName}/>
                                            ))}
                                        </SelectField>
                                    </Col>
                                    <Col xs={5}>
                                        <SelectField
                                            floatingLabelText="Section"
                                            value={section.id}
                                            onChange={this.updateSection.bind(this, index)}>
                                            {this.getMenuItemsForSelectedCourse.bind(this, section.course.id)}
                                        </SelectField>
                                    </Col>
                                    <Col xs={2}>
                                        <FlatButton secondary={true} label="remove"
                                                    onTouchTap={this.removeSection.bind(this, index)}
                                                    style={removeButtonStyle}/>
                                    </Col>
                                </Row>
                            ))}
                        </div>
                        :
                        <div></div>}
                    {this.state.requestInProgress ?
                        <Row center="xs">
                            <Col xs={12}><CircularProgress/></Col>
                        </Row> : <div></div>}
                </Dialog>

                <Snackbar open={this.state.openSnackbar} message={this.state.snackbarMessage} autoHideDuration={5000}/>
            </div>
        )
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
                this.setState({
                    requestInProgress: false
                });
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