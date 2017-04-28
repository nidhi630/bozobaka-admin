"use strict";

import React, {PropTypes} from "react";
import {Row, Col} from "react-flexbox-grid";
import ListTableComponent from "./ListTableComponent";
import Urls from "./../models/Urls";
import {browserHistory} from "react-router";

export default class ListQuestionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.headerColumns = [{
            displayName: "Question",
            key: "question"
        }, {
            displayName: "Status",
            key: "status"
        }, {
            displayName: "Difficulty",
            key: "difficulty"
        }, {
            displayName: "Section",
            key: "sectionId"
        }, {
            displayName: "L1",
            key: "l1Id"
        }, {
            displayName: "L2",
            key: "l2Id"
        }, {
            displayName: "Source",
            key: "source"
        }, {
            displayName: "Created",
            key: "created"
        }];
    }

    componentWillReceiveProps(nextProps) {
        const {courseId, fetchQuestions} = this.props;
        if (courseId !== nextProps.courseId) {
            fetchQuestions();
        }
    }

    componentDidMount() {
        this.props.fetchQuestions();
    }

    render() {
        const {questions, isLoading, fetchQuestions} = this.props;
        return (
            <div>
                <br/>
                <Row>
                    <Col xs={12}>
                        <h1>List Of Questions</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <ListTableComponent headerColumns={this.headerColumns} tableRows={questions} isLoading={isLoading}
                                            usage="question" onFilterChange={fetchQuestions.bind(this)}
                                            onCellClick={this.onCellClick.bind(this)}/>
                    </Col>
                </Row>
                <br/><br/>
            </div>
        );
    }

    onCellClick(rowNumber) {
        const question = this.props.questions[rowNumber - 1];
        const url = Urls.ADD_QUESTION + "?id=" + question.id;
        browserHistory.push(url);
    }
}

ListQuestionComponent.propTypes = {
    questions: PropTypes.array.isRequired,
    fetchQuestions: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    courseId: PropTypes.string.isRequired
};
