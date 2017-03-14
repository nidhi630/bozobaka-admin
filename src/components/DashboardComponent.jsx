"use strict";

import React, {PropTypes} from "react";
import Paper from "material-ui/Paper";
import RaisedButton from 'material-ui/RaisedButton';
import {Grid, Row, Col} from "react-flexbox-grid";
import SummaryCardComponent from "./SummaryCardComponent";
import {browserHistory} from "react-router";
import URLs from "./../models/Urls";

export default class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid>
                <Row center="xs">
                    <Col xs={12}>
                        <h3>Hi, {this.props.loggedInUser.displayName}</h3>
                    </Col>
                </Row>
                <Row between="sm">
                    <Col xs={12} sm={5} md={3}>
                        <SummaryCardComponent title="Questions Added" value={10} />
                    </Col>
                    <Col xs={12} sm={5} md={3}>
                        <SummaryCardComponent title="Questions Added" value={10} />
                    </Col>
                    <Col xs={12} sm={5} md={3}>
                        <SummaryCardComponent title="Questions Added" value={10} />
                    </Col>
                </Row>
                <Row center="xs">
                    <Col xs={12}>
                        <RaisedButton label="Add Question" primary={true} onClick={this.addQuestionButton.bind(this)} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Paper zDepth={1} rounded={false}>
                            <h4>Last Added Question</h4>
                        </Paper>
                    </Col>
                </Row>
            </Grid>
        );
    }

    addQuestionButton() {
        browserHistory.push(URLs.ADD_QUESTION);
    }
}

DashboardComponent.propTypes = {
    loggedInUser: PropTypes.object.isRequired,
};

DashboardComponent.defaultProps = {};