"use strict";

import React from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import {Row, Col} from "react-flexbox-grid";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class EditCourseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseAdminId: this.props.courseToOpen.adminId
        }
    }

    render() {
        return (
            <Dialog title="Edit Course" actions={[]} modal={false} open={true}>
                <Row>
                    <Col xs={12} sm={6}>
                        <TextField
                            defaultValue={this.props.courseToOpen.name}
                            ref="courseName"
                            title="Connot be empty"
                            pattern=".{1,}"
                            type="text"
                            hintText="Enter Course Name"
                            floatingLabelText="Course Name"
                            required/>
                        <br/>
                        <TextField
                            defaultValue={this.props.courseToOpen.language}
                            ref="courseLanguage"
                            title="Connot be empty"
                            pattern=".{1,}"
                            type="text"
                            hintText="Enter Language"
                            floatingLabelText="Language"
                            required/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <TextField
                            defaultValue={this.props.courseToOpen.displayName}
                            ref="courseDisplayName"
                            title="Connot be empty"
                            pattern=".{1,}"
                            type="text"
                            hintText="Enter Display Name"
                            floatingLabelText="Display Name"
                            required/>
                    </Col>
                </Row>
                <br/>
                <SelectField
                    ref="courseAdmin"
                    floatingLabelText="Admin"
                    value={this.state.courseAdminId}
                    onChange={this.setCourseAdmin.bind(this)}>
                    <MenuItem value={null} primaryText="" />
                    {this.props.adminIds.map((adminId) => (
                        <MenuItem key={adminId} value={adminId} primaryText={this.props.admins[adminId].firstName} />
                    ))}
                </SelectField>
                <Row>
                    <Col xs={6}>
                        <FlatButton secondary={true} label="Delete"/>
                    </Col>
                    <Col xs={3}>
                        <FlatButton label="Cancel" onTouchTap={this.props.onDialogClose.bind(this, "courseDialog")} />
                    </Col>
                    <Col xs={3}>
                        <FlatButton primary={true} label="Save"/>
                    </Col>
                </Row>
            </Dialog>
        )
    }

    setCourseAdmin(event, index, value) {
        console.log(value);
        this.setState({
            courseAdminId: value
        });
    }
}