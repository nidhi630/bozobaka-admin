"use strict";

import React from "react";
import ContentService from "./../services/ContentService";
import {Row, Col} from "react-flexbox-grid";
import NoAccessErrorComponent from "./NoAccessErrorComponent";
import RaisedButton from "material-ui/RaisedButton";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";

import EditCourseComponent from "./EditCourseComponent";

export default class ManageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.hasAccess = false;
        this.state = {
            reviewers: [],
            contentWriters: [],
            openCourseDialog: false
        }
    }

    componentWillMount() {
        if (this.props.loggedInUser.role === "superAdmin") {
            this.hasAccess = true;
        }
        this.courses = this.props.courses;
        this.admins = {};
        this.adminIds = [];
        for (let i = 0; i < this.courses.length; i++) {
            let adminId = this.courses[i].adminId;
            if (!adminId) continue;
            if (adminId in this.adminIds) {
                this.admins[adminId].courses.push({
                    displayName: this.courses[i].displayName,
                    id: this.courses[i].id
                });
            } else {
                this.adminIds.push(adminId);
                this.admins[adminId] = {
                    ...this.courses[i].admin,
                    courses: [{
                        displayName: this.courses[i].displayName,
                        id: this.courses[i].id
                    }]
                }
            }
        }
    }

    componentDidMount() {
        ContentService.fetchReviewers()
            .then((reviewers) => {
                this.setState({
                    reviewers: reviewers
                });
            }).catch((err) => {
            console.log(err);
        });

        ContentService.fetchContentWriters()
            .then((contentWriters) => {
                this.setState({
                    contentWriters: contentWriters
                })
            }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        if (!this.hasAccess) {
            return <NoAccessErrorComponent/>;
        }

        let sectionTitleStyle = {
            paddingTop: 10
        };

        let toRender = (
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
                        <Table fixedFooter={false}>
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
                                {this.courses.map((course, index) => (
                                    <TableRow key={course.id} onRowClick={this.editCourse.bind(this, index)}>
                                        <TableRowColumn>{course.id}</TableRowColumn>
                                        <TableRowColumn>{course.name}</TableRowColumn>
                                        <TableRowColumn>{course.admin.firstName}</TableRowColumn>
                                        <TableRowColumn>{course.contentWriterCount}</TableRowColumn>
                                        <TableRowColumn>{course.reviewerCount}</TableRowColumn>
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
                        <Table fixedFooter={false}>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                    <TableHeaderColumn>Courses</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>

                            <TableBody displayRowCheckbox={false} showRowHover={true}>
                                {
                                    this.adminIds.map((adminId) => (
                                        <TableRow key={adminId}>
                                            <TableRowColumn>{adminId}</TableRowColumn>
                                            <TableRowColumn>{this.admins[adminId].firstName}</TableRowColumn>
                                            <TableRowColumn>{this.getCoursesDisplayText(this.admins[adminId].courses)}</TableRowColumn>
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
                        <Table fixedFooter={false}>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>

                            <TableBody displayRowCheckbox={false} showRowHover={true}>
                                {
                                    this.state.reviewers.map((reviewer) => (
                                        <TableRow key={reviewer.id}>
                                            <TableRowColumn>{reviewer.id}</TableRowColumn>
                                            <TableRowColumn>{reviewer.firstName}</TableRowColumn>
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
                        <Table fixedFooter={false}>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>

                            <TableBody displayRowCheckbox={false} showRowHover={true}>
                                {
                                    this.state.contentWriters.map((contentWriter) => (
                                        <TableRow key={contentWriter.id}>
                                            <TableRowColumn>{contentWriter.id}</TableRowColumn>
                                            <TableRowColumn>{contentWriter.firstName}</TableRowColumn>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </Col>
                </Row>
                {this.state.openCourseDialog ?
                    <EditCourseComponent courseToOpen={this.courseToOpen}
                                         admins={this.admins}
                                         adminIds={this.adminIds}
                                         onDialogClose={this.handleDialogClose.bind(this)}/>
                    :
                    <div></div>}
            </div>
        );

        return toRender;
    }

    editCourse(courseIndex) {
        this.courseToOpen = {};
        if (courseIndex) {
            this.courseToOpen = this.courses[courseIndex];
        }
        this.setState({
            openCourseDialog: true,
        });
    }

    editAdmin(adminID) {

    }

    editReviewer(reviewerID) {

    }

    editQuestionWriter(questionWriterID) {

    }

    getCoursesDisplayText(courses = []) {
        let displayText = "";
        for (let i = 0; i < courses.length; i++) {
            displayText += courses[i].displayName;
        }
        return displayText;
    }

    handleDialogClose(type) {
        console.log(type);
        this.setState({
            openCourseDialog: false
        })
    }
}