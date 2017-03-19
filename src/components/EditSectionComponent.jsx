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
            showLoader: false,
            openDialog: false,
            dialogTitle: props.sectionToOpen.id ? "Edit Section" : "Add New Section",
            openSnackbar: false,
            snackbarMessage: ""
        }
    }

    componentWillMount() {
        this.setState({openDialog: this.props.showDialog});
    }

    render() {
        const actions = (
            <Row>
                <Col xs={3}>
                    <FlatButton secondary={true} label="Delete" onTouchTap={this.deleteSection.bind(this)}
                                disabled={!this.props.sectionToOpen.id}/>
                </Col>
                <Col xs={6}>
                    <FlatButton label="Cancel" onTouchTap={this.cancelButton.bind(this)}/>
                </Col>
                <Col xs={3}>
                    <RaisedButton primary={true} label="Save" onTouchTap={this.saveSection.bind(this)}/>
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
                        required/>
                </Dialog>
                <Snackbar open={this.state.openSnackbar} message={this.state.snackbarMessage} autoHideDuration={2000}/>
            </div>
        )
    }

    deleteSection() {

    }

    cancelButton(update = false) {
        this.setState({openDialog: false});
        this.props.onDialogClose(update);
    }

    saveSection() {

    }
}

EditSectionComponent.propTypes = {
    sectionToOpen: PropTypes.object.isRequired,
    showDialog: PropTypes.bool.isRequired,
    onDialogClose: PropTypes.func.isRequired
};