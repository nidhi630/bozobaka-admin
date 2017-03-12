"use strict";

import React from "react";
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

export default class EditReviewerContentWriterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            dialogTitle: this.props.userToOpen.id ? "Edit " + this.props.userRole : "Add New " + this.props.userRole,
            requestInProgress: false,
            openSnackbar: false,
            snackbarMessage: ""
        }
    }

    componentWillMount() {
        this.setState({
            openDialog: this.props.showDialog
        })
    }

    render() {
        return (
            <div>
                <Dialog title={this.state.dialogTitle} actions={[]} modal={false} open={this.state.openDialog}>
                    <h1>{this.props.userToOpen.toString()}</h1>
                    <h2>{this.props.userRole}</h2>

                    {this.state.requestInProgress ?
                        <Row center="xs">
                            <Col xs={12}>
                                <CircularProgress/>
                            </Col>
                        </Row>
                        :
                        <Row>
                            <Col xs={6}>
                                {this.props.userToOpen.id ?
                                    <FlatButton secondary={true} label="Delete"
                                                onTouchTap={this.deleteUser.bind(this)}/> :
                                    <div></div>}
                            </Col>
                            <Col xs={3}>
                                <FlatButton label="Cancel" onTouchTap={this.cancelButton.bind(this)}/>
                            </Col>
                            <Col xs={3}>
                                <RaisedButton primary={true} label="Save" type="submit"/>
                            </Col>
                        </Row>
                    }
                </Dialog>

                <Snackbar open={this.state.openSnackbar} message={this.state.snackbarMessage} autoHideDuration={2000}/>
            </div>
        )
    }

    cancelButton() {
        this.setState({
            openDialog: false
        });
        this.props.onDialogClose();
    }

    deleteUser() {
        if (this.props.userToOpen.id) {
            this.setState({
                requestInProgress: true,
                openSnackbar: false
            });
            let request;
            if (this.props.userRole === "contentWriter") {
                request = ContentService.updateContentWriters(this.props.userToOpen, {method: "delete"});
            } else {
                request = ContentService.updateReviewers(this.props.userToOpen, {method: "delete"});
            }
            request.then((res) => {
                console.log(res);
                if (this.props.userRole === "contentWriter") {
                    this.props.updateContentWriter(this.props.courseToOpen, true);
                } else {
                    this.props.updateReviewer(this.props.courseToOpen, true);
                }
                this.setState({
                    requestInProgress: false
                });
                this.cancelButton();
            }).catch((err) => {
                console.log(err);
                this.setState({
                    openSnackbar: true,
                    snackbarMessage: err.message,
                    requestInProgress: false
                });
            });
        }
    }
}

EditReviewerContentWriterComponent.propTypes = {
    updateReviewer: React.PropTypes.func.isRequired,
    updateContentWriter: React.PropTypes.func.isRequired,
    userRole: React.PropTypes.string.isRequired,
    onDialogClose: React.PropTypes.func.isRequired,
    showDialog: React.PropTypes.bool.isRequired,
    userToOpen: React.PropTypes.object.isRequired
};