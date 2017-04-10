"use strict";

import React, {PropTypes} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from "material-ui/TextField";
import {connect} from "react-redux";
import {
    sourceUpdateName,
    postSource,
    sourceDialogState
} from "./../actions/SourceActions";

class AddSourceComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {createSource, sourceTextChange, openDialog, dialogState} = this.props;
        const actions = [
            <FlatButton label="Cancel" onTouchTap={dialogState.bind(this)}/>,
            <FlatButton label="Save" primary={true} onTouchTap={createSource.bind(this)}/>
        ];

        return (
            <div>
                <RaisedButton label="Add Source" primary={true} onClick={dialogState.bind(this, true)}/>
                <Dialog
                    title="Add Source"
                    actions={actions}
                    modal={false}
                    open={openDialog}
                    onRequestClose={dialogState.bind(this)}>
                    <TextField title="Source" hintText="Add Source Name" onChange={sourceTextChange.bind(this)} />
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.sources.name,
        openDialog: state.sources.openDialog
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createSource: (name) => {
            dispatch(postSource(name));
        },

        sourceTextChange: (event, value) => {
            dispatch(sourceUpdateName(value));
        },

        dialogState: (state = false) => {
            dispatch(sourceDialogState(state));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSourceComponent);