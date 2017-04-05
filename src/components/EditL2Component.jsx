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

export default class EditL2Component extends React.Component {
    constructor(props) {
        super(props);
        this.scope = {
            l2: props.l2ToOpen
        };
        this.state = {
            requestInProgress: false,
            openDialog: false,
            dialogTitle: props.l2ToOpen.id ? "Edit L2" : "Add New L2",
            openSnackbar: false,
            snackbarMessage: "",
            sectionValue: props.l1ToOpen.sectionId ? props.l1ToOpen.sectionId : props.sections[0].id,
            l1Value: props.l1Id ? props.l1Id : ""
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
                                disabled={!this.props.l2ToOpen.id}/>
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
                        defaultValue={this.props.l2ToOpen.name}
                        ref="sectionName"
                        title="Connot be empty"
                        pattern=".{1,}"
                        type="text"
                        hintText="Enter L2 Name"
                        floatingLabelText="L2 Name"
                        onChange={this.handleL2NameChange.bind(this)}
                        required/>
                    <br />
                    <br />
                    <DropDownMenu
                        value={this.state.sectionValue}
                        onChange={this.handleL1Change.bind(this)}
                        disabled={this.scope.l2.id ? true : false}
                        style={styles.dropdown}
                        autoWidth={false}>
                        {this.props.sections.map((section, index) => (
                            <MenuItem value={section.id} primaryText={section.name} key={index}/>
                        ))}
                    </DropDownMenu>
                    <DropDownMenu
                        value={this.state.l1Value}
                        onChange={this.handleL1Change.bind(this)}
                        disabled={this.scope.l2.id ? true : false}
                        style={styles.dropdown}
                        autoWidth={false}>
                        {this.props.sections.map((section, index) => {
                            if (section.id === this.state.sectionValue) {
                                return section.l1s.map((l1, l1Index) => (
                                    <MenuItem value={l1.id} primaryText={l1.name} key={l1Index}/>
                                ));
                            }
                        })}
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
        this.setState({l1Value: value});
    }

    handleL2NameChange(event, newValue) {
        this.scope.l2.name = newValue;
    }

    cancelButton(update = false) {
        this.setState({openDialog: false});
        this.props.onDialogClose(update);
    }

    saveButton() {
        if (!this.scope.l2.name) return;
        this.setState({requestInProgress: true});
        ContentService.updateL1({name: this.scope.l3.name}, {
            method: this.scope.l2.id ? "put" : "post",
            l2Id: this.scope.l2.id,
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

EditL2Component.propTypes = {
    courseId: PropTypes.string.isRequired,
    l2ToOpen: PropTypes.object.isRequired,
    showDialog: PropTypes.bool.isRequired,
    onDialogClose: PropTypes.func.isRequired,
    sections: PropTypes.array.isRequired
};