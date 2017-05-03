"use strict";

import React, {PropTypes} from "react";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import {Grid, Row, Col} from "react-flexbox-grid";
import SummaryCardComponent from "./SummaryCardComponent";
import {browserHistory} from "react-router";
import URLs from "./../models/Urls";
import {connect} from "react-redux";
import LivePreview from "./LivePreviewComponent";
import {InlineMath, BlockMath} from "react-katex";

class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount() {
        /* TODO: fetch dashboard data from server */
    }

    render() {
        const styles = {
            titleStyle: {
                fontSize: "1.1em",
                fontWeight: 400,
                padding: "1em"
            },
            labelStyle: {
                fontSize: 18
            },
            actionButtonStyle: {
                height: 45
            },
            lastAddedQuestion: {
                paper: {
                    padding: "1em",
                    marginTop: "1em"
                },
                bullet: {
                    fontSize: "1.2em",
                    fontWeight: "bold",
                    marginRight: "1em"
                },
                item: {
                    display: "inline-block"
                }
            }
        };

        const {loggedInUser} = this.props;

        const demoQuestion = (
            <InlineMath math="x^2 + y^2 = z^2"/>
        );
        const demoAnswer = (
            <InlineMath math="x^2 + y^2 = z^2"/>
        );

        return (
            <Grid>
                <Row center="xs">
                    <Col xs={12}>
                        <p style={styles.titleStyle}>Hey, {loggedInUser.displayName}</p>
                    </Col>
                </Row>
                {loggedInUser.role === "reviewer" ?
                    <Row between="sm">
                        <Col xs={12} sm={6}>
                            <SummaryCardComponent title="Questions Reviewed" value={235}/>
                        </Col>
                        <Col xs={12} sm={6}>
                            <SummaryCardComponent title="Questions Remaining" value={200}/>
                        </Col>
                    </Row>
                    :
                    <Row between="sm">
                        <Col xs={12} sm={5} md={3}>
                            <SummaryCardComponent title="Questions Added" value={235}/>
                        </Col>
                        <Col xs={12} sm={5} md={3}>
                            <SummaryCardComponent title="Questions Added" value={200}/>
                        </Col>
                        <Col xs={12} sm={5} md={3}>
                            <SummaryCardComponent title="Questions Added" value={235}/>
                        </Col>
                    </Row>
                }
                <br/>
                <Row center="xs">
                    {loggedInUser.role === "reviewer" ?
                        <Col xs={6} sm={4} md={3}>
                            <RaisedButton style={styles.actionButtonStyle} labelStyle={styles.labelStyle}
                                          fullWidth={true} label="Review Question"
                                          primary={true} onClick={() => browserHistory.push(URLs.REVIEW_QUESTION)}/>
                        </Col>
                        : null
                    }
                    {loggedInUser.role === "contentWriter" ?
                        <Col xs={6} sm={4} md={3}>
                            <RaisedButton style={styles.actionButtonStyle} labelStyle={styles.labelStyle}
                                          fullWidth={true} label="Add Question"
                                          primary={true} onClick={() => browserHistory.push(URLs.ADD_QUESTION)}/>
                        </Col>
                        : null
                    }
                </Row>
                <Row>
                    <Col xs={12}>
                        <Paper zDepth={1} rounded={false} style={styles.lastAddedQuestion.paper}>
                            <div>
                                <span style={styles.lastAddedQuestion.bullet}>Q.</span>
                                <div style={styles.lastAddedQuestion.item}>
                                    <LivePreview content={demoQuestion} />
                                </div>
                            </div>
                            <br/>
                            <div>
                                <span style={styles.lastAddedQuestion.bullet}>A.</span>
                                <div style={styles.lastAddedQuestion.item}>
                                    <LivePreview content={demoAnswer} />
                                </div>
                            </div>
                        </Paper>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

DashboardComponent.propTypes = {
    loggedInUser: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        ...state.GlobalReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
