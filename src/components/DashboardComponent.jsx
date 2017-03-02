"use strict";

import React, {PropTypes} from "react";
import Paper from "material-ui/Paper";
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import {Grid, Row, Col} from "react-flexbox-grid";
import SummaryCardComponent from "./SummaryCardComponent";
import {browserHistory} from "react-router";
import Urls from "./../models/Urls";

export default class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    addQuestionButton() {
        browserHistory.push(Urls.ADD_QUESTION);
    }

    render() {
        return (
            <Grid>
                <Row center="xs">
                    <Col xs={12}>
                        <h3>Hi, {this.props.username}</h3>
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
                <Row>
                    <Col xs={12}>
                        <Paper zDepth={1} rounded={false}>
                            <RaisedButton label="Add Question" primary={true} onClick={this.addQuestionButton.bind(this)} />
                            <Divider />
                            <h4>Last Added Question</h4>
                        </Paper>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

DashboardComponent.propTypes = {
    username: PropTypes.string.isRequired,
};

DashboardComponent.defaultProps = {
    username: "Aditya Jha"
};