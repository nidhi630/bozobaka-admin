"use strict";

import React from "react";
import ContentService from "./../services/ContentService";
import {Row, Col} from "react-flexbox-grid";
import NoAccessErrorComponent from "./NoAccessErrorComponent";
import RaisedButton from "material-ui/RaisedButton";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";

export default class ManageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.hasAccess = false;
    }

    componentWillMount() {
        if (this.props.loggedInUser.role === "superAdmin") {
            this.hasAccess = true;
        }
        this.courses = ContentService.courses;
    }

    componentDidMount() {

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
                                {this.courses.map((course) => (
                                    <TableRow key={course.id}>
                                        <TableRowColumn>{course.id}</TableRowColumn>
                                        <TableRowColumn>{course.name}</TableRowColumn>
                                        <TableRowColumn>{course.admin ? course.admin.firstName : "Not Assigned"}</TableRowColumn>
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
                </Row>
                <Row>
                    <Col xs={6} sm={4}>
                        <h2 style={sectionTitleStyle}>Reviewers</h2>
                    </Col>
                    <Col xs={6} sm={8}>
                        <RaisedButton label="Add" onClick={this.editReviewer.bind(this, null)} primary={true}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} sm={4}>
                        <h2 style={sectionTitleStyle}>Question Writers</h2>
                    </Col>
                    <Col xs={6} sm={8}>
                        <RaisedButton label="Add" onClick={this.editQuestionWriter.bind(this, null)} primary={true}/>
                    </Col>
                </Row>
            </div>
        );

        return toRender;
    }

    editCourse(courseID) {

    }

    editAdmin(adminID) {

    }

    editReviewer(reviewerID) {

    }

    editQuestionWriter(questionWriterID) {

    }
}