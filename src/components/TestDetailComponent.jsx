"use strict";

import React, {PropTypes} from "react";
import {Grid, Row, Col} from "react-flexbox-grid";
import {browserHistory} from "react-router";
import Toggle from 'material-ui/Toggle';
import URLs from "./../models/Urls";
import {connect} from "react-redux";

export default class TestDetailComponent extends React.Component {
    constructor(props) {
        super(props);
   }

   render(){
   		return(
   			<div>
   				<Row>
   					<Col><h1>TEST_NAME</h1></Col>
   					<Col><a>edit</a></Col>
   				</Row>
   			</div>
   		);
   }
}