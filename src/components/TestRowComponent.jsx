"use strict";

import React, {PropTypes} from "react";
import {Grid, Row, Col} from "react-flexbox-grid";
import {browserHistory} from "react-router";
import Toggle from 'material-ui/Toggle';
import URLs from "./../models/Urls";
import {connect} from "react-redux";

export default class TestRowComponent extends React.Component {
    constructor(props) {
        super(props);
        this.goToTestDetailPage = this.goToTestDetailPage.bind(this);
        this.goToToggle = this.goToToggle.bind(this);
   }

   goToTestDetailPage(){
   	const {router} = this.props;
   	router.push(`/${URLs.TEST_DETAIL}`);
   }

   goToToggle(){
   	console.log('hello')
   }

   render(){
   		return(
   			<div>
   				<Row style={{
   					borderColor: 'black',
   					borderWidth: 1,
   					borderStyle: 'solid',
   					height: 50,
   					justifyContent: 'center',
   					display:'flex',
   					alignItems:'center'
   				}}>
   					<Col xs={3} onClick={this.goToTestDetailPage}>
   						<h3>TEST_DATE</h3>
   					</Col>
   					<Col xs={3} onClick={this.goToTestDetailPage}>
   						<h3>TEST_NAME</h3>
   					</Col>
   					<Col xs={5} onClick={this.goToTestDetailPage}>
   						<h3>NO_OF_QUESTION - TIME</h3>
   					</Col>
   					<Col  xs={1}>
   						<Toggle
   							onToggle={this.goToToggle}
					    />
   					</Col>
   				</Row>
   			</div>
   		);
   }
}