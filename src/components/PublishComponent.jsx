"use strict";

import React, {PropTypes} from "react";
import {Row, Col} from "react-flexbox-grid";
import ListTableComponent from "./ListTableComponent";
import Urls from "./../models/Urls";
import {browserHistory} from "react-router";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import CircularProgress from "material-ui/CircularProgress";

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
        this.selectedItem = {};
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
        const {questions, fetchData, theories, contentType, unpublish, sortDialog, sortDialogStatus, isLoading} = this.props;
        const tableRows = contentType === "question" ? questions : theories;

        const styles = {
            pageTitle: {
                fontWeight: 400
            }
        };

        const actions = (
            <Row>
                <Col xs={6} sm={3}>
                    <FlatButton secondary={true} label="Unpublish" onClick={unpublish.bind(this)}/>
                </Col>
                <Col xs={6} sm={6}>
                    <FlatButton label="Cancel" onClick={sortDialogStatus.bind(this, false)}/>
                </Col>
                <Col xs={6} sm={3}>
                    <RaisedButton primary={true} label="Update" onClick={this.updateSort.bind(this)}/>
                </Col>
            </Row>
        );

        return (
            <div>
                <br/>
                <Row>
                    <Col xs={10}>
                        <h1 style={styles.pageTitle}>Publish</h1>
                    </Col>
                    <Col xs={2}>
                        {isLoading ? <CircularProgress diameter={8}/> : null}
                    </Col>
                    <br/><br/>
                </Row>
                <Row>
                    <Col xs={12}>
                        <ListTableComponent headerColumns={this.headerColumns} tableRows={tableRows} usage="publish"
                                            isLoading={isLoading} onFilterChange={fetchData.bind(this)}
                                            onCellClick={this.onCellClick.bind(this)}/>
                    </Col>
                </Row>
                <br/><br/>
                <Dialog open={sortDialog} actions={actions} modal={false} title="Change Sorting #">
                    <Row>
                        <Col xs={4}>
                            <p>From</p>
                            <br/><br/>
                            {this.selectedItem.rank}
                        </Col>
                        <Col xs={8}>
                            <p>To</p>
                            <TextField ref="newRankValue" type="number" floatingLabelText="Rank"/>
                        </Col>
                        <br/>
                    </Row>
                </Dialog>
            </div>
        );
    }

    onCellClick(rowNumber, columnsId) {
        const index = rowNumber - 1;
        const {questions, theories, contentType, sortDialogStatus} = this.props;

        if (columnsId === 7) {
            // add below
            alert("add below");
        } else if (columnsId === 6) {
            // change sort
            this.selectedItem = contentType === "question" ? questions[index] : theories[index];
            sortDialogStatus(true);
        } else {
            const question = questions[index];
            const url = Urls.ADD_QUESTION + "?id=" + question.id;
            browserHistory.push(url);
        }
    }

    updateSort() {
        try {
            const rank = parseInt(this.refs.newRankValue.input.value, 10);
            const id = this.selectedItem.id;

            this.props.updateSort(id, rank);
            this.props.sortDialogStatus(null, false);
        } catch (error) {
            console.log(error);
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
    theories: PropTypes.array,
    sortDialog: PropTypes.bool,
    unpublish: PropTypes.func,
    sortDialogStatus: PropTypes.func,
    updateSort: PropTypes.func
};
