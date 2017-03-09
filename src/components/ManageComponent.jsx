"use strict";

import React from "react";
import ContentService from "./../services/ContentService";
import {Row, Col} from "react-flexbox-grid";
import NoAccessErrorComponent from "./NoAccessErrorComponent";
import RaisedButton from "material-ui/RaisedButton";

export default class ManageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.hasAccess = false;
    }

    componentWillMount() {
        if (this.props.loggedInUser.role === "superAdmin") {
            this.hasAccess = true;
        }
    }

    componentDidMount() {
        this.courses = ContentService.courses;
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
        )
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