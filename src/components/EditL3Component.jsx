"use strict";

import React, {PropTypes} from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import {Row, Col} from "react-flexbox-grid";
import ContentService from "./../services/ContentService";
import CircularProgress from "material-ui/CircularProgress";
import Snackbar from "material-ui/Snackbar";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from 'material-ui/MenuItem';

export default class EditL3Component extends React.Component {
    constructor(props) {
        super(props);
        this.scope = {
            l3: props.l3ToOpen
        };
        this.state = {
            requestInProgress: false,
            openDialog: false,
            dialogTitle: props.l3ToOpen.id ? "Edit L2" : "Add New L2",
            openSnackbar: false,
            snackbarMessage: "",
            sectionValue: props.l3ToOpen.sectionId ? props.l3ToOpen.sectionId : props.sections[0].id
        };
    }

    componentWillMount() {
        this.setState({openDialog: this.props.showDialog});
    }

    render() {

        const actions = (
            <Row>
                <Col xs={6} sm={3}>
                    <FlatButton secondary={true} label="Delete" onClick={this.deleteButton.bind(this)}
                                disabled={!this.props.l3ToOpen.id}/>
                </Col>
                <Col xs={6} sm={6}>
                    <FlatButton label="Cancel" onClick={this.cancelButton.bind(this, false)}/>
                </Col>
                <Col xs={6} sm={3}>
                    <RaisedButton primary={true} label="Save" onClick={this.saveButton.bind(this)}/>
                </Col>
            </Row>
        );

        const styles = {
            dropdown: {
                width: 300
            }
        };

        return (
            <div>
                <Dialog actions={actions} open={this.state.openDialog} modal={false} title={this.state.dialogTitle}>
                    <TextField
                        defaultValue={this.props.l3ToOpen.name}
                        ref="sectionName"
                        title="Connot be empty"
                        pattern=".{1,}"
                        type="text"
                        hintText="Enter L3 Name"
                        floatingLabelText="L3 Name"
                        onChange={this.handleL2NameChange.bind(this)}
                        required/>
                    <br />
                    <br />
                    <DropDownMenu
                        value={this.state.sectionValue}
                        onChange={this.handleL1Change.bind(this)}
                        disabled={this.scope.l3.id ? true : false}
                        style={styles.dropdown}
                        autoWidth={false}>
                        {this.props.sections.map((section, index) => (
                            <MenuItem value={section.id} primaryText={section.name} key={index}/>
                        ))}
                    </DropDownMenu>
                    {this.state.requestInProgress ?
                        <Row center="xs">
                            <Col xs={12}><CircularProgress/></Col>
                        </Row> : <br/>}
                </Dialog>
                <Snackbar open={this.state.openSnackbar} message={this.state.snackbarMessage} autoHideDuration={2000}/>
            </div>
        )
    }

    handleSectionChange(event, index, value) {
        this.setState({sectionValue: value});
    }

    handleL1Change(event, index, value) {
        this.setState({sectionValue: value});
    }

    handleL2NameChange(event, newValue) {
        this.scope.l3.name = newValue;
    }

    cancelButton(update = false) {
        this.setState({openDialog: false});
        this.props.onDialogClose(update);
    }

    saveButton() {
        if (!this.scope.l3.name) return;
        this.setState({requestInProgress: true});
        ContentService.updateL1({name: this.scope.l3.name}, {
            method: this.scope.l3.id ? "put" : "post",
            l2Id: this.scope.l3.id,
            l1Id: this.state.sectionValue
        }).then((res) => {
            this.setState({requestInProgress: false});
            this.cancelButton(true);
        }).catch((err) => {
            this.setState({
                requestInProgress: true,
                openSnackbar: true,
                snackbarMessage: err.message
            });
        });
    }

    deleteButton() {
        this.setState({requestInProgress: true});
        ContentService.updateL1({name: this.scope.l1.name}, {
            method: "delete",
            l1Id: this.scope.l1.id,
            sectionId: this.state.sectionValue
        }).then((res) => {
            this.setState({requestInProgress: false});
            this.cancelButton(true);
        }).catch((err) => {
            this.setState({
                requestInProgress: false,
                openSnackbar: true,
                snackbarMessage: err.message
            });
        });
    }
}

EditL3Component.propTypes = {
    courseId: PropTypes.string.isRequired,
    l3ToOpen: PropTypes.object.isRequired,
    showDialog: PropTypes.bool.isRequired,
    onDialogClose: PropTypes.func.isRequired,
    sections: PropTypes.array.isRequired
};