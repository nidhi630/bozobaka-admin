"use strict";

import React, {PropTypes} from "react";
import {Grid, Row, Col} from "react-flexbox-grid";
import Dialog from 'material-ui/Dialog';
import {browserHistory} from "react-router";
import Icon from 'material-ui/FontIcon';
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
            key: "actionCheckbox",
        }];
        this.state={
          openModel: false,
          selected: [],
        }
   }

   componentWillReceiveProps(nextProps) {
        const {courseId, fetchQuestions, route} = this.props;
        if (courseId !== nextProps.courseId) {
            fetchQuestions();
        }
        if (route.path !== nextProps.route.path) {
            fetchQuestions();
        }
    }

    componentDidMount() {
        this.props.fetchQuestions();
    }
    onCellClick(rowNumber, columnId) {
        // const { selected } = this.state;
        // let temp_obj = {};
        // const tempArr = selected.slice();
        // if(tempArr.length > 0){
        // tempArr.map(element => {
        //      if(element.id === rowNumber){
        //         const temp = element;
        //         temp.ischecked = !(element.ischecked);
        //      }else{
        //         temp_obj = {id: rowNumber, ischecked: true};
        //         tempArr.push(temp_obj);
        //     }
        //      this.setState({selected: tempArr})
        // });
        // }
        // else{
        //     temp_obj = {id: rowNumber, ischecked: true};
        //     tempArr.push(temp_obj);
        //     this.setState({selected: tempArr})
        //  }
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
        <div>
            {questions ? (
                //questions.map((question) => (
                <Row style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    height: 50,
                    justifyContent: 'center',
                    display:'flex',
                    alignItems:'center',
                    marginTop: 20
                }}>
                    <Col xs={1} onClick={this.goToTestDetailPage}>
                        <h3>TEST_Id</h3>
                    </Col>
                    <Col xs={2} onClick={this.goToTestDetailPage}>
                        <h3>QUESTION</h3>
                    </Col>
                    <Col xs={2} onClick={this.goToTestDetailPage}>
                        <h3>THEORY</h3>
                    </Col>
                    <Col xs={2} onClick={this.goToTestDetailPage}>
                        <h3>SECTION</h3>
                    </Col>
                    <Col xs={2} onClick={this.goToTestDetailPage}>
                        <h3>L1</h3>
                    </Col>
                    <Col xs={2} onClick={this.goToTestDetailPage}>
                        <h3>L2</h3>
                    </Col>
                    <Col  xs={1}>
                        <Icon className="fa fa-trash-o"
                          style={iconStyles}
                        />
                    </Col>
                </Row>//))
            ): (<Row/>)}
        </div>
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

const iconStyles = {
  marginRight: 24,
};
