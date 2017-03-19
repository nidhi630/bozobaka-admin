"use strict";

import React from "react";
import NoAccessErrorComponent from "./NoAccessErrorComponent";
import {Row, Col} from "react-flexbox-grid";
import RaisedButton from "material-ui/RaisedButton";

export default class ManageCourseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.hasAccess = false;
        this.state = {};
    }

    componentWillMount() {
        this.hasAccess = this.props.loggedInUser.role === "admin";
    }

    componendDidMount() {

    }

    render() {
        if (!this.hasAccess) {
            return <NoAccessErrorComponent/>
        }

        return (
            <div>
                <h2>Manage Course</h2>
                <Row>
                    <Col xs={6} sm={2}>
                        <RaisedButton label="Add Section" onClick={this.editSection.bind(this)} primary={true}/>
                    </Col>
                    <Col xs={6} sm={2}>
                        <RaisedButton label="Add L1" onClick={this.editL1.bind(this)} primary={true}/>
                    </Col>
                    <Col xs={6} sm={2}>
                        <RaisedButton label="Add L2" onClick={this.editL2.bind(this)} primary={true}/>
                    </Col>
                    <Col xs={6} sm={2}>
                        <RaisedButton label="Add L3" onClick={this.editL3.bind(this)} primary={true}/>
                    </Col>
                    <Col xs={6} sm={2}>
                        <RaisedButton label="Add L4" onClick={this.editL4.bind(this)} primary={true}/>
                    </Col>
                </Row>
            </div>
        )
    }

    fetchDataFromServer() {

    }

    editSection() {
        console.log("editSection");
    }

    editL1() {
        console.log("editL1");
    }

    editL2() {
        console.log("editL1");
    }

    editL3() {
        console.log("editL1");
    }

    editL4() {
        console.log("editL1");
    }
}