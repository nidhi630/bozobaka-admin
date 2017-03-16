"use strict";

import React from "react";
import ContentService from "./../services/ContentService";
import {Row, Col} from "react-flexbox-grid";
import NoAccessErrorComponent from "./NoAccessErrorComponent";
import RaisedButton from "material-ui/RaisedButton";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import EditCourseComponent from "./EditCourseComponent";
import EditReviewerContentWriterComponent from "./EditReviewerContentWriterComponent";
import EditAdminComponent from "./EditAdminComponent";

export default class ManageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.hasAccess = false;
        this.state = {
            admins: [],
            reviewers: [],
            contentWriters: [],
            openCourseDialog: false,
            openReviewerContentWriterDialog: false,
            openAdminDialog: false,
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillMount() {
        this.hasAccess = this.props.loggedInUser.role === "superAdmin";
    }

    componentDidMount() {
        this.fetchDataFromServer();
    }

    render() {
        if (!this.hasAccess) {
            return <NoAccessErrorComponent/>;
        }

        let sectionTitleStyle = {
            paddingTop: 10
        };

        return (
            <div>
                <h2>Manage</h2>
                <Row>
                    <Col xs={6} sm={4}>
                        <h2 style={sectionTitleStyle}>Courses</h2>
                    </Col>
                    <Col xs={6} sm={8}>
                        <RaisedButton label="Add" onClick={this.editCourse.bind(this, null)} primary={true}/>
                    </Col>
                    <Col xs={12}>
                        <Table fixedFooter={false} onCellClick={this.editCourse.bind(this)}>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                    <TableHeaderColumn>Admin</TableHeaderColumn>
                                    <TableHeaderColumn># Question Writer</TableHeaderColumn>
                                    <TableHeaderColumn># Reviewers</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>

                            <TableBody displayRowCheckbox={false} showRowHover={true}>
                                {this.props.courses.map((course, index) => (
                                    <TableRow key={index}>
                                        <TableRowColumn>{course.id}</TableRowColumn>
                                        <TableRowColumn>{course.displayName}</TableRowColumn>
                                        <TableRowColumn>{this.getDisplayText(course.admins)}</TableRowColumn>
                                        <TableRowColumn>{course.contentWriterCount ? course.contentWriterCount : 0}</TableRowColumn>
                                        <TableRowColumn>{course.reviewerCount ? course.reviewerCount : 0}</TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} sm={4}>
                        <h2 style={sectionTitleStyle}>Admins</h2>
                    </Col>
                    <Col xs={6} sm={8}>
                        <RaisedButton label="Add" onClick={this.editAdmin.bind(this, null)} primary={true}/>
                    </Col>
                    <Col xs={12}>
                        <Table fixedFooter={false} onCellClick={this.editAdmin.bind(this)}>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                    <TableHeaderColumn>Courses</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>

                            <TableBody displayRowCheckbox={false} showRowHover={true}>
                                {this.state.admins.map((admin, index) => (
                                    <TableRow key={index}>
                                        <TableRowColumn>{admin.id}</TableRowColumn>
                                        <TableRowColumn>{admin.displayName}</TableRowColumn>
                                        <TableRowColumn
                                            style={{whiteSpace: "normal"}}>{this.getDisplayText.bind(this, admin.courses)}</TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} sm={4}>
                        <h2 style={sectionTitleStyle}>Reviewers</h2>
                    </Col>
                    <Col xs={6} sm={8}>
                        <RaisedButton label="Add" onClick={this.editReviewer.bind(this, null)} primary={true}/>
                    </Col>
                    <Col xs={12}>
                        <Table fixedFooter={false} onCellClick={this.editReviewer.bind(this)}>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>

                            <TableBody displayRowCheckbox={false} showRowHover={true}>
                                {
                                    this.state.reviewers.map((reviewer, index) => (
                                        <TableRow key={index}>
                                            <TableRowColumn>{reviewer.id}</TableRowColumn>
                                            <TableRowColumn>{reviewer.displayName}</TableRowColumn>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} sm={4}>
                        <h2 style={sectionTitleStyle}>Question Writers</h2>
                    </Col>
                    <Col xs={6} sm={8}>
                        <RaisedButton label="Add" onClick={this.editQuestionWriter.bind(this, null)} primary={true}/>
                    </Col>
                    <Col xs={12}>
                        <Table fixedFooter={false} onCellClick={this.editQuestionWriter.bind(this)}>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>

                            <TableBody displayRowCheckbox={false} showRowHover={true}>
                                {
                                    this.state.contentWriters.map((contentWriter, index) => (
                                        <TableRow key={index}>
                                            <TableRowColumn>{contentWriter.id}</TableRowColumn>
                                            <TableRowColumn>{contentWriter.displayName}</TableRowColumn>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </Col>
                </Row>
                {this.state.openCourseDialog ? <EditCourseComponent showDialog={this.state.openCourseDialog}
                                                                    courseToOpen={this.courseToOpen}
                                                                    admins={this.state.admins}
                                                                    onDialogClose={this.handleDialogClose.bind(this)}
                                                                    updateCourse={this.updateCourseData.bind(this)}/>
                    : <div></div>}
                {this.state.openReviewerContentWriterDialog ?
                    <EditReviewerContentWriterComponent showDialog={this.state.openReviewerContentWriterDialog}
                                                        userRole={this.state.userRole}
                                                        onDialogClose={this.handleDialogClose.bind(this)}
                                                        userToOpen={this.userToOpen}/> :
                    <div></div>}
                {this.state.openAdminDialog ?
                    <EditAdminComponent showDialog={this.state.openAdminDialog}
                                        adminToOpen={this.adminToOpen}
                                        courses={this.props.courses}
                                        onDialogClose={this.handleDialogClose.bind(this)}/>
                    : <div></div>
                }
            </div>
        );
    }

    fetchDataFromServer(admin = true, reviewer = true, contentWriter = true) {
        if (admin) {
            ContentService.fetchAdmins().then((admins) => {
                this.setState({admins: admins});
            }).catch((err) => {console.log(err);});
        }
        if (reviewer) {
            ContentService.fetchReviewers()
                .then((reviewers) => {
                    this.setState({reviewers: reviewers});})
                .catch((err) => {console.log(err);});
        }
        if (contentWriter) {
            ContentService.fetchContentWriters()
                .then((contentWriters) => {
                    this.setState({contentWriters: contentWriters})
                }).catch((err) => {console.log(err);});
        }
    }

    updateCourseData(course, remove) {
        this.fetchDataFromServer(true, false, false);
        this.props.updateCourseData(course, remove);
    }

    editCourse(courseIndex) {
        this.courseToOpen = typeof courseIndex === 'number' ? this.props.courses[courseIndex] : {};
        this.setState({openCourseDialog: true});
    }

    editAdmin(adminIndex) {
        typeof adminIndex === "number" ? this.adminToOpen = this.state.admins[adminIndex] : this.adminToOpen = {};
        this.setState({openAdminDialog: true});
    }

    editReviewer(index) {
        this.userToOpen = (typeof index === "number") ? this.state.reviewers[index] : {};
        this.setState({openReviewerContentWriterDialog: true, userRole: "reviewer"});
    }

    editQuestionWriter(index) {
        this.userToOpen = (typeof index === "number") ? this.state.contentWriters[index] : {};
        this.setState({openReviewerContentWriterDialog: true, userRole: "contentWriter",});
    }

    getDisplayText(items = []) {
        let displayText = "";
        for (let i = 0; i < items.length; i++) {
            displayText += items[i].displayName + ", ";
        }
        if (displayText.endsWith(", ")) {
            displayText = displayText.substr(0, displayText.length - 2);
        }
        return displayText;
    }

    handleDialogClose(update = false) {
        this.setState((prevState, props) => {
            if (prevState.openCourseDialog) {
                update ? this.fetchDataFromServer() : null;
                return {openCourseDialog: false};
            } else if (prevState.openAdminDialog) {
                update ? this.fetchDataFromServer(true, false, false) : null;
                return {openAdminDialog: false};
            } else if (prevState.openReviewerContentWriterDialog) {
                update ? this.userRole === "reviewer" ? this.fetchDataFromServer(false, true, false)
                        : this.fetchDataFromServer(false, false, true) : null;
                return {openReviewerContentWriterDialog: false};
            }
        });
    }
}