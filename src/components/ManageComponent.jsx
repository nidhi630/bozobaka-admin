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
            adminIds: [],
            admins: {},
            reviewers: [],
            contentWriters: [],
            openCourseDialog: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.parseProps(nextProps);
    }

    componentWillMount() {
        this.parseProps(this.props);
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

        const coursesTableRows = this.props.courses.map((course, index) => {
            return (
                <TableRow key={index}>
                    <TableRowColumn>{course.id}</TableRowColumn>
                    <TableRowColumn>{course.displayName}</TableRowColumn>
                    <TableRowColumn>{course.adminName}</TableRowColumn>
                    <TableRowColumn>{course.contentWriterCount}</TableRowColumn>
                    <TableRowColumn>{course.reviewerCount}</TableRowColumn>
                </TableRow>
            )
        });
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
                                {coursesTableRows}
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
                                    this.state.adminIds.map((adminId, index) => (
                                        <TableRow key={index}>
                                            <TableRowColumn>{adminId}</TableRowColumn>
                                            <TableRowColumn>{this.state.admins[adminId].firstName}</TableRowColumn>
                                            <TableRowColumn
                                                style={{whiteSpace: "normal"}}>{this.getCoursesDisplayText(this.state.admins[adminId].courses)}</TableRowColumn>
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
                                    this.state.reviewers.map((reviewer, index) => (
                                        <TableRow key={index}>
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
                                    this.state.contentWriters.map((contentWriter, index) => (
                                        <TableRow key={index}>
                                            <TableRowColumn>{contentWriter.id}</TableRowColumn>
                                            <TableRowColumn>{contentWriter.firstName}</TableRowColumn>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </Col>
                </Row>
                {this.state.openCourseDialog ? <EditCourseComponent showDialog={this.state.openCourseDialog}
                                                                    courseToOpen={this.courseToOpen}
                                                                    admins={this.state.admins}
                                                                    adminIds={this.state.adminIds}
                                                                    onDialogClose={this.handleDialogClose.bind(this)}
                                                                    updateCourse={this.props.updateCourseData.bind(this)}/>
                    : <div></div>}
            </div>
        );
    }

    parseProps(props) {
        if (props.loggedInUser.role === "superAdmin") {
            this.hasAccess = true;
        }
        let admins = {};
        let adminIds = [];
        for (let i = 0; i < props.courses.length; i++) {
            let adminId = props.courses[i].adminId;
            if (!adminId) continue;
            if (adminId in admins) {
                admins[adminId].courses.push({
                    displayName: props.courses[i].displayName,
                    id: props.courses[i].id
                });
            } else {
                adminIds.push(adminId);
                admins[adminId] = {
                    ...props.courses[i].admin,
                    courses: [{
                        displayName: props.courses[i].displayName,
                        id: props.courses[i].id
                    }]
                }
            }
        }

        this.setState({
            admins,
            adminIds
        });
    }

    editCourse(courseIndex) {
        this.courseToOpen = {};
        if (typeof courseIndex === 'number') {
            this.courseToOpen = this.props.courses[courseIndex];
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
            displayText += courses[i].displayName + ", ";
        }
        if (displayText.endsWith(", ")) {
            displayText = displayText.substr(0, displayText.length - 2);
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