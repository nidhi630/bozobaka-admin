"use strict";

import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import {Row, Col} from "react-flexbox-grid";

export default class EditAdminComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: true
        }
    }

    componentWillMount() {
        this.setState({
            openDialog: this.props.showDialog
        })
    }

    render() {
        const actions = (
            <Row>
                <Col xs={3}>
                    <FlatButton secondary={true} label="Delete"
                                onTouchTap={this.deleteAdmin.bind(this)}
                                disabled={!this.props.adminToOpen.id}/>
                </Col>
                <Col xs={6}>
                    <FlatButton label="Cancel" onTouchTap={this.cancelButton.bind(this)}/>
                </Col>
                <Col xs={3}>
                    <RaisedButton primary={true} label="Save" onTouchTap={this.saveAdmin.bind(this)}/>
                </Col>
            </Row>
        );

        return (
            <div>
                <Dialog title={this.state.dialogTitle} actions={actions} modal={false} open={this.state.openDialog}>
                    <h1>ok</h1>
                </Dialog>
            </div>
        )
    }

    deleteAdmin() {
        console.log("Delete");
    }

    cancelButton() {
        this.setState({
            openDialog: false
        });
        this.props.onDialogClose();
    }

    saveAdmin() {
        console.log("save admin");
    }
}
