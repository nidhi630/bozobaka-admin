"use strict";

import React, {PropTypes} from "react";
import {Grid, Row, Col} from "react-flexbox-grid";
import Dialog from 'material-ui/Dialog';
import {browserHistory} from "react-router";
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import URLs from "./../models/Urls";
import ListTableComponent from "./ListTableComponent";
import {connect} from "react-redux";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";


export default class TestDetailComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.headerColumns = [{
            displayName: "Id",
            key: "id"
        }, {
            displayName: "Que/Theory",
            key: "qt"
        }, {
            displayName: "TType",
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
            key: "action"
        }];
        this.state={
          openModel: false,
        }
   }

   componentWillReceiveProps(nextProps) {
        const {courseId, fetchQuestions, route, updateStatusFilter } = this.props;
        if (courseId !== nextProps.courseId) {
            fetchQuestions();
        }
        if (route.path !== nextProps.route.path) {
            updateStatusFilter(nextProps.route.status);
            fetchQuestions();
        }
    }

    componentWillMount() {
        this.props.updateStatusFilter(this.props.route.status);
    }

    componentDidMount() {
        this.props.fetchQuestions();
    }

    componentWillUnmount() {
        this.props.updateStatusFilter("draft");
    }

    onCellClick(rowNumber) {
        const question = this.props.questions[rowNumber - 1];
        const url = Urls.ADD_QUESTION + "?id=" + question.id;
        browserHistory.push(url);
    }

  handleOpen() {
    this.setState({openModel: true});
  };

  render(){
    const {questions, isLoading, fetchQuestions, route} = this.props;

    const styles = {
        pageTitle: {
            fontWeight: 400
        }
    };

    let pageTitle;
    switch (route.status) {
        case "trash":
            pageTitle = "Trash Questions";
            break;
        case "later":
            pageTitle = "Marked For Later";
            break;
        case "added":
            pageTitle = "Review Added Questions";
            break;
        case "draft":
            pageTitle = "Draft Questions";
            break;
        default:
            pageTitle = "List Of Questions";
    }
 		return(
 			<div>
 				<Row>
 					<Col><h1>TEST_NAME</h1></Col>
          <Col xs={8}><a>edit</a></Col>       
          <Col xs={1}><Toggle/></Col>
 				</Row>
        <Row>
          <Col xs={12}>
            <RaisedButton primary={true} label="ADD QUESTION" onTouchTap={this.handleOpen}/>
          </Col>
        </Row>
        <Dialog
            modal={true}
            open={this.state.openModel}
          >
          <div>
                <br/>
                <Row>
                    <Col xs={12}>
                        <h1 style={styles.pageTitle}>{pageTitle}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <ListTableComponent headerColumns={this.headerColumns} tableRows={questions}
                                            isLoading={isLoading} usage="question"
                                            onFilterChange={fetchQuestions.bind(this)}
                                            onCellClick={this.onCellClick.bind(this)}/>
                    </Col>
                </Row>
                <br/><br/>
            </div>
          </Dialog>
 			</div>
 		);
  }
}
