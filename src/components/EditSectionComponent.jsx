"use strict";

import React, {PropTypes} from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import {Row, Col} from "react-flexbox-grid";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import ContentService from "./../services/ContentService";
import CircularProgress from "material-ui/CircularProgress";
import Snackbar from "material-ui/Snackbar";
import DropDownMenu from "material-ui/DropDownMenu";

export default class EditSectionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestInProgress: false,
            openDialog: false,
            dialogTitle: props.sectionToOpen.id ? "Edit Section" : "Add New Section",
            openSnackbar: false,
            snackbarMessage: ""
        };
        this.scope = {
            sectionName: this.props.sectionToOpen.name
        };
    }

    componentWillMount() {
        this.setState({openDialog: this.props.showDialog});
    }

    render() {
        const actions = (
            <Row>
                <Col xs={3}>
                    <FlatButton secondary={true} label="Delete" onClick={this.deleteSection.bind(this)}
                                disabled={!this.props.sectionToOpen.id}/>
                </Col>
                <Col xs={6}>
                    <FlatButton label="Cancel" onClick={this.cancelButton.bind(this, false)}/>
                </Col>
                <Col xs={3}>
                    <RaisedButton primary={true} label="Save" onClick={this.saveSection.bind(this)}/>
                </Col>
            </Row>
        );

        return (
            <div>
                <Dialog actions={actions} open={this.state.openDialog} modal={false} title={this.state.dialogTitle}>
                    <TextField
                        defaultValue={this.props.sectionToOpen.name}
                        ref="sectionName"
                        title="Connot be empty"
                        pattern=".{1,}"
                        type="text"
                        hintText="Enter Section Name"
                        floatingLabelText="Section Name"
                        onChange={this.handleSectionNameChange.bind(this)}
                        required/>
                    {this.state.requestInProgress ?
                        <Row center="xs">
                            <Col xs={12}><CircularProgress/></Col>
                        </Row> : <br/>}
                </Dialog>
                <Snackbar open={this.state.openSnackbar} message={this.state.snackbarMessage} autoHideDuration={2000}/>
            </div>
        )
    }

    handleSectionNameChange(event, newValue) {
        this.scope.sectionName = newValue;
    }

    deleteSection() {
        this.setState({requestInProgress: true});

        ContentService.updateSections({
            name: this.scope.sectionName
        }, {
            method: "delete",
            courseId: this.props.courseId,
            sectionId: this.props.sectionToOpen.id
        }).then((res) => {
            this.setState({requestInProgress: false});
            this.cancelButton(true);
        }).catch((err) => {
            this.setState({
                requestInProgress: false,
                openSnackbar: true,
                snackbarMessage: err.message
            });
        })
    }

    cancelButton(update = false) {
        this.setState({openDialog: false});
        this.props.onDialogClose(update);
    }

    saveSection() {
        if (!this.scope.sectionName || this.state.requestInProgress) return;
        this.setState({requestInProgress: true});

        ContentService.updateSections({
            name: this.scope.sectionName
        }, {
            method: this.props.sectionToOpen.id ? "put" : "post",
            courseId: this.props.courseId,
            sectionId: this.props.sectionToOpen.id
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

EditSectionComponent.propTypes = {
    sectionToOpen: PropTypes.object.isRequired,
    showDialog: PropTypes.bool.isRequired,
    onDialogClose: PropTypes.func.isRequired,
    courseId: PropTypes.string.isRequired
};