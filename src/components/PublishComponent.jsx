"use strict";

import React, {PropTypes} from "react";
import {Row, Col} from "react-flexbox-grid";
import ListTableComponent from "./ListTableComponent";
import Urls from "./../models/Urls";
import {browserHistory} from "react-router";

export default class PublishComponent extends React.Component {
    constructor(props) {
        super(props);
        this.headerColumns = [{
            displayName: "Question",
            key: "question"
        }, {
            displayName: "Type",
            key: "contentType"
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
            displayName: "Sort",
            key: "rank"
        }, {
            displayName: "Action",
            key: "action",
            actionLabel: "Add below"
        }];
    }

    componentWillReceiveProps(nextProps) {
        const {courseId, fetchData, contentType} = this.props;
        if (courseId !== nextProps.courseId) {
            fetchData();
        }
        if (contentType !== nextProps.contentType) {
            if (nextProps.contentType === "question") {
                this.headerColumns[0] = {
                    displayName: "Question",
                    key: "question"
                };
            } else {
                this.headerColumns[0] = {
                    displayName: "Theory",
                    key: "theory"
                };
            }
            fetchData();
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        const {questions, isLoading, fetchData, theories, contentType} = this.props;
        const tableRows = contentType === "question" ? questions : theories;

        const styles = {
            pageTitle: {
                fontWeight: 400
            }
        };

        return (
            <div>
                <br/>
                <Row>
                    <Col xs={12}>
                        <h1 style={styles.pageTitle}>Publish</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <ListTableComponent headerColumns={this.headerColumns} tableRows={tableRows} usage="publish"
                                            isLoading={isLoading} onFilterChange={fetchData.bind(this)}
                                            onCellClick={this.onCellClick.bind(this)}/>
                    </Col>
                </Row>
                <br/><br/>
            </div>
        );
    }

    onCellClick(rowNumber, columnsId) {
        if (columnsId === 7) {
            // add below
            alert("add below");
        } else if (columnsId === 6) {
            // change sort
            alert("add below");
        } else {
            const question = this.props.questions[rowNumber - 1];
            const url = Urls.ADD_QUESTION + "?id=" + question.id;
            browserHistory.push(url);
        }
    }
}

PublishComponent.propTypes = {
    questions: PropTypes.array.isRequired,
    fetchData: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    courseId: PropTypes.string.isRequired,
    updateStatusFilter: PropTypes.func,
    contentType: PropTypes.string,
    theories: PropTypes.array
};
