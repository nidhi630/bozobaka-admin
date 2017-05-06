"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import {Row, Col} from "react-flexbox-grid";
import CircularProgress from "material-ui/CircularProgress";
import Snackbar from "material-ui/Snackbar";
import {
    publishInitQuestions,
    publishInitTheories,
    fetchData as fetchDataRequest,
    publishHasErrored,
    publishItem as publishItemRequest,
    publishPublishDialogStatus
} from "./../actions/PublishActions";
import ListTableComponent from "./ListTableComponent";

class PublishingPopupComponent extends React.Component {
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
            displayName: "Action",
            key: "action",
            actionLabel: "Publish"
        }];
        this.selectedItem = {};
    }

    componentWillReceiveProps(nextProps) {
        const {courseId, fetchData, contentType} = this.props;
        if (courseId !== nextProps.courseId) {
            fetchData();
        }
        if (contentType !== nextProps.contentType) {
            if (contentType === "question") {
                this.headerColumns[0].displayName = "Question";
                this.headerColumns[0].key = "question";
            } else {
                this.headerColumns[0].displayName = "theory";
                this.headerColumns[0].key = "theory";
            }
            fetchData();
        }
    }

    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        const {questions, theories, isLoading, contentType, publishDialog, publishDialogStatus, fetchData} = this.props;
        const tableRows = contentType === "question" ? questions : theories;

        const style = {
            dialog: {
                width: "90%",
                maxWidth: 1000
            }
        };

        const actions = (
            <Row>
                <Col xs={6} sm={3}>
                    {isLoading ? <CircularProgress size={32}/> : null}
                </Col>
                <Col xs={6} sm={6}>
                    <FlatButton label="Cancel" onClick={publishDialogStatus.bind(this, false)}/>
                </Col>
                <Col xs={6} sm={3}>
                    <RaisedButton primary={true} label="Send" onClick={publishDialogStatus.bind(this, false)}/>
                </Col>
            </Row>
        );

        return (
            <Dialog title="Accepted Items" open={publishDialog} actions={actions} autoScrollBodyContent={true}>
                <Row>
                    <Col xs={12}>
                        <ListTableComponent headerColumns={this.headerColumns} tableRows={tableRows} usage="publish2"
                                            isLoading={isLoading} onFilterChange={fetchData.bind(this)}
                                            onCellClick={this.onCellClick.bind(this)}/>
                    </Col>
                    <br/><br/>
                    <Col xs={12}>
                        {!tableRows.length ? "No Items" : null}
                    </Col>
                </Row>
            </Dialog>
        );
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    onCellClick(rowNumber, columnsId) {
        const index = rowNumber - 1;
        const {questions, theories, contentType, publishItem, rankToSet, publishDialogStatus} = this.props;
        this.selectedItem = contentType === "question" ? questions[index] : theories[index];

        if (columnsId === 6) {
            // publish
            publishItem(this.selectedItem, rankToSet);
            publishDialogStatus(false);
        }
    }
}

PublishingPopupComponent.propTypes = {
    courseId: PropTypes.string,
    fetchData: PropTypes.func,
    resetState: PropTypes.func,
    questions: PropTypes.array,
    theories: PropTypes.array,
    isLoading: PropTypes.bool,
    hasErrored: PropTypes.bool,
    errorMessage: PropTypes.string,
    publishDialog: PropTypes.bool,
    publishDialogStatus: PropTypes.func,
    contentType: PropTypes.string,
    publishItem: PropTypes.func,
    rankToSet: PropTypes.number
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.publish,
        courseId: state.ContentReducer.selectedCourse.id,
        rankToSet: ownProps.rankToSet
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        resetState: () => {
            dispatch(publishInitQuestions([]));
            dispatch(publishInitTheories([]));
            dispatch(publishHasErrored(null, ""));
        },

        fetchData: () => {
            dispatch(fetchDataRequest());
        },

        publishDialogStatus: (status) => {
            dispatch(publishPublishDialogStatus(status || false));
        },

        publishItem: (item, rank) => {
            dispatch(publishItemRequest(item, rank));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublishingPopupComponent);
