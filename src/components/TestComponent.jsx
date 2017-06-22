"use strict";

import React, {PropTypes} from "react";
import Dialog from 'material-ui/Dialog';
import RaisedButton from "material-ui/RaisedButton";
import {Grid, Row, Col} from "react-flexbox-grid";
import SummaryCardComponent from "./SummaryCardComponent";
import {browserHistory} from "react-router";
import URLs from "./../models/Urls";
import {connect} from "react-redux";
import LivePreview from "./LivePreviewComponent";
import {InlineMath, BlockMath} from "react-katex";

export default class TestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddTest = this.handleAddTest.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDeleteTest = this.handleDeleteTest.bind(this);
        this.handleSectionsData = this.handleSectionsData.bind(this);
        this.state = {
			openModel: false,
			name: '',
			time: '',
			sections: [{'title': 'Quant', 'isSelected': false},
				{'title': 'Verbal', 'isSelected': false},
				{'title': 'Reasoning', 'isSelected': false},
				{'title': 'General Awareness', 'isSelected': false},
			],			
		};
    }

	handleOpen() {
		this.setState({openModel: true});
	};

	handleClose() {
		this.setState({openModel: false});
	};

    handleAddTest(){
    	this.setState({openModel: false});
    }

    handleDeleteTest(){
    	this.setState({openModel: false});
    }

    handleSectionsData(value, isChecked){
    	const { sections } = this.state;
    	sections.map(element => {
    		 if(element.title === value){
    		 	const temp = element;
    		 	temp.isSelected = isChecked;
    		 	this.setState({element: temp})
    		 }
    	});
    }

    render(){
    	const actions = [
	      <RaisedButton
	        label="DELETE"
	        primary={true}
	        onTouchTap={this.handleDeleteTest}
	      />,
	      <RaisedButton
	        label="CANCEL"
	        primary={true}
	        onTouchTap={this.handleClose}
	      />,
	      <RaisedButton
	        label="ADD"
	        primary={true}
	        onTouchTap={this.handleAddTest}
	      />,
	    ];
    	return(
    		<div className="home">
                <br/>
                <Row>
                    <Col xs={12}>
                        <h1>Test</h1>
                    </Col>
                </Row>
                <Row>
                	<Col xs={12}>
                		<RaisedButton primary={true} label="ADD" onTouchTap={this.handleOpen}/>
                	</Col>
                </Row>
                <Dialog
		          actions={actions}
		          modal={true}
		          open={this.state.openModel}
		        >
		        	<br/>
		        	<Row>
	                    <Col xs={12}>
	                        <h1>Add Test</h1>
	                    </Col>
	                </Row>
	                <br/>
	                    <span style={{fontSize: 20}}>Name</span>
	                    <br/>
					  	<input type="text" name="name" value={this.state.name}
					  	onChange={(e) => this.setState({name: e.target.value})}/>
					  	<br/>
					  	<span style={{fontSize: 20}}>Time</span>
	                    <br/>
					  	<input type="text" name="time" value={this.state.time}
					  	onChange={(e) => this.setState({time: e.target.value})}/>
					  	<br/>
					  	<span style={{fontSize: 20}}>Sections:</span>
					  	<br/>
					  	<input type="checkbox" name="sections" value="Quant "
					  	onChange={(e) => this.handleSectionsData(e.target.value.trim(), e.target.checked)}/><span>Quant</span>
					  	<input type="checkbox" name="sections" value="Verbal "
					  	onChange={(e) => this.handleSectionsData(e.target.value.trim(), e.target.checked)}/><span>Verbal</span>
					  	<input type="checkbox" name="sections" value="Reasoning"
					  	onChange={(e) => this.handleSectionsData(e.target.value.trim(), e.target.checked)}/><span>Reasoning</span>
					  	<input type="checkbox" name="sections" value="General Awareness"
					  	onChange={(e) => this.handleSectionsData(e.target.value.trim(), e.target.checked)}/><span>General Awareness</span>
		        </Dialog>
            </div>
    	);
    }
}
