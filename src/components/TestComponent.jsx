"use strict";

import React, {PropTypes} from "react";
import Dialog from 'material-ui/Dialog';
import RaisedButton from "material-ui/RaisedButton";
import {Grid, Row, Col} from "react-flexbox-grid";
import {browserHistory} from "react-router";
import URLs from "./../models/Urls";
import {connect} from "react-redux";
import TestRowComponent from './TestRowComponent'

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
    	const { name, time, sections} = this.state;
    	const id = Math.random();
    	if(name && time){
    		const data = [{'testId': id, 'testName': name, 'testTime': time, 'testSection': sections}];
    	}
    }

    handleDeleteTest(){
    	this.setState({openModel: false});
    }

    handleSectionsData(e){
    	const value = e.target.value;
    	const isChecked = e.target.checked;
    	const { sections } = this.state;
    	sections.map(element => {
    		 if(element.title === value){
    		 	const temp = element;
    		 	temp.isSelected = isChecked;
    		 	this.setState({element: temp})
    		 	console.log(sections)
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
    		<div style={{ margin: '0 auto' }}>
                <br/>
                <Row style={{ marginBottom: 20 }}>
                    <Col xs={12}>
                        <h1>Test</h1>
                    </Col>
                </Row>
                <Row style={{ marginBottom: 20 }}>
                	<Col xs={12}>
                		<RaisedButton primary={true} label="ADD" onTouchTap={this.handleOpen}/>
                	</Col>
                </Row>
                <Row style={{ marginBottom: 20 }}>
                    <Col xs={12}>
                        <TestRowComponent router={this.props.router}/>
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
	                    <span className="model_Text">Name</span>
	                    <br/>
					  	<input 
					  		type="text" 
					  		name="name" 
					  		value={this.state.name}
					  		onChange={(e) => this.setState({name: e.target.value})}
					  	/>
					  	<br/>
					  	<span className="model_Text">Time</span>
	                    <br/>
					  	<input 
					  		type="text"
					  		name="time"
					  		value={this.state.time}
					  		onChange={(e) => this.setState({time: e.target.value})}
					  	/>
					  	<br/>
					  	<span className="model_Text">Sections:</span>
					  	<br/>
					  	<input
					  		type="checkbox"
					  		name="sections"
					  		value="Quant"
					  		onChange={(e) => this.handleSectionsData(e)}
					  	/><span className="modelSectionText">Quant</span>
					  	<input 
					  		type="checkbox" 
					  		name="sections" 
					  		value="Verbal"
					  		onChange={(e) => this.handleSectionsData(e)}
					  	/><span className="modelSectionText">Verbal</span>
					  	<input 
					  		type="checkbox" 
					  		name="sections" 
					  		value="Reasoning"
					  		onChange={(e) => this.handleSectionsData(e)}
					  	/><span className="modelSectionText">Reasoning</span>
					  	<input 
					  		type="checkbox" 
					  		name="sections" 
					  		value="General Awareness"
					  		onChange={(e) => this.handleSectionsData(e)}
					  	/><span className="modelSectionText">General Awareness</span>
		        </Dialog>
            </div>
    	);
    }
}
