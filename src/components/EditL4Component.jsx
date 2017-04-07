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
            l4: props.l4ToOpen
        };

        let sectionValue = props.l1ToOpen.sectionId ? props.l1ToOpen.sectionId : props.sections[0].id;
        let l1Value = props.l1ToOpen.id ? props.l1ToOpen.id : props.sections[0].l1s.length ? props.sections[0].l1s[0].id : null;
        let l2Value = props.l2ToOpen.id ? props.l2ToOpen.id : l1Value && props.sections[0].l1s[0].l2s.length ? props.sections[0].l1s[0].l2s[0].id : null;
        let l3Value = props.l3ToOpen.id ? props.l3ToOpen.id : l2Value && props.sections[0].l1s[0].l2s[0].l3s.length ? props.sections[0].l1s[0].l2s[0].l3s[0].id : null;

        this.state = {
            requestInProgress: false,
            openDialog: false,
            dialogTitle: props.l3ToOpen.id ? "Edit L4" : "Add New L4",
            openSnackbar: false,
            snackbarMessage: "",
            sectionValue: sectionValue,
            l1Value: l1Value,
            l2Value: l2Value,
            l3Value: l3Value
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
                                disabled={!this.props.l4ToOpen.id}/>
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
                width: "100%"
            }
        };

        let sections, l1s, l2s, l3s;
        sections = this.props.sections.map((section, sectionIndex) => {
            if (section.id === this.state.sectionValue) {
                l1s = section.l1s.map((l1, l1Index) => {
                    if (l1.id === this.state.l1Value) {
                        l2s = l1.l2s.map((l2, l2Index) => {
                            if (l2.id === this.state.l2Value) {
                                l3s = l2.l3s.map((l3, l3Index) => (
                                    <MenuItem value={l3.id} primaryText={l3.name} key={l3Index}/>
                                ))
                            }
                            return <MenuItem value={l2.id} primaryText={l2.name} key={l2Index}/>
                        })
                    }
                    return <MenuItem value={l1.id} primaryText={l1.name} key={l1Index}/>
                })
            }
            return <MenuItem value={section.id} primaryText={section.name} key={sectionIndex}/>
        });

        return (
            <div>
                <Dialog actions={actions} open={this.state.openDialog} modal={false} title={this.state.dialogTitle}>
                    <TextField
                        defaultValue={this.props.l4ToOpen.name}
                        ref="sectionName"
                        title="Connot be empty"
                        pattern=".{1,}"
                        type="text"
                        hintText="Enter L4 Name"
                        floatingLabelText="L4 Name"
                        onChange={this.handleL4NameChange.bind(this)}
                        required/>
                    <br />
                    <br />
                    <Row>
                        <Col xs={12} sm={6}>
                            <p>Section</p>
                            <DropDownMenu
                                value={this.state.sectionValue}
                                onChange={this.handleSectionChange.bind(this)}
                                disabled={!!this.scope.l4.id}
                                style={styles.dropdown}
                                autoWidth={false}>
                                {sections}
                            </DropDownMenu>
                        </Col>
                        <Col xs={12} sm={6}>
                            {!this.state.l1Value ? null :
                                <div>
                                    <p>L1</p>
                                    <DropDownMenu
                                        value={this.state.l1Value}
                                        onChange={this.handleL1Change.bind(this)}
                                        disabled={!!this.scope.l4.id}
                                        style={styles.dropdown}
                                        autoWidth={false}>
                                        {l1s}
                                    </DropDownMenu>
                                </div>
                            }
                        </Col>
                        <br/><br/>
                        <Col xs={12} sm={6}>
                            {!this.state.l2Value ? null :
                                <div>
                                    <p>L2</p>
                                    <DropDownMenu
                                        value={this.state.l2Value}
                                        onChange={this.handleL2Change.bind(this)}
                                        disabled={!!this.scope.l4.id}
                                        style={styles.dropdown}
                                        autoWidth={false}>
                                        {l2s}
                                    </DropDownMenu>
                                </div>
                            }
                        </Col>
                        <Col xs={12} sm={6}>
                            {!this.state.l3Value ? null :
                                <div>
                                    <p>L3</p>
                                    <DropDownMenu
                                        value={this.state.l3Value}
                                        onChange={this.handleL3Change.bind(this)}
                                        disabled={!!this.scope.l4.id}
                                        style={styles.dropdown}
                                        autoWidth={false}>
                                        {l3s}
                                    </DropDownMenu>
                                </div>
                            }
                        </Col>
                    </Row>
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
        let l1s = this.props.sections[index].l1s;
        let l2s = l1s.length ? l1s[0].l2s : [];
        let l3s = l2s.length ? l2s[0].l3s : [];
        this.setState({
            sectionValue: value,
            l1Value: l1s.length ? l1s[0].id : null,
            l2Value: l2s.length ? l2s[0].id : null,
            l3Value: l3s.length ? l3s[0].id : null
        });
    }

    handleL1Change(event, index, value) {
        let l2s = [], l3s = [];
        this.props.sections.forEach((section) => {
            if (section.id === this.state.sectionValue) {
                l2s = section.l1s[index].l2s;
                l3s = l2s.l3s ? l2s.l3s : [];
            }
        });

        this.setState({
            l1Value: value,
            l2Value: l2s.length ? l2s[0].id : null,
            l3Value: l3s.length ? l3s[0].id : null
        });
    }

    handleL2Change(event, index, value) {
        let l3s;
        this.props.sections.forEach((section) => {
            if (section.id === this.state.sectionValue) {
                section.l1s.forEach((l1) => {
                    if (l1.id === this.state.l1Value) {
                        l3s = l1.l2s[index].l3s;
                    }
                })
            }
        });
        this.setState({
            l2Value: value,
            l3Value: l3s.length ? l3s[0].id : null
        });
    }

    handleL3Change(event, index, value) {
        this.setState({
            l3Value: value
        });
    }

    handleL4NameChange(event, newValue) {
        this.scope.l4.name = newValue;
    }

    cancelButton(update = false) {
        this.setState({openDialog: false});
        this.props.onDialogClose(update);
    }

    saveButton() {
        if (!this.scope.l3.name || !this.state.sectionValue || !this.state.l1Value || !this.state.l2Value || this.state.requestInProgress) return;
        this.setState({requestInProgress: true});
        ContentService.updateL3({name: this.scope.l3.name}, {
            method: this.scope.l3.id ? "put" : "post",
            l3Id: this.scope.l3.id,
            l2Id: this.state.l2Value
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

    deleteButton() {
        this.setState({requestInProgress: true});
        ContentService.updateL4({name: this.scope.l4.name}, {
            method: "delete",
            l4Id: this.scope.l4.id,
            l3Id: this.state.l3Value
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
    l1ToOpen: PropTypes.object.isRequired,
    l3ToOpen: PropTypes.object.isRequired,
    l2ToOpen: PropTypes.object.isRequired,
    l4ToOpen: PropTypes.object.isRequired,
    showDialog: PropTypes.bool.isRequired,
    onDialogClose: PropTypes.func.isRequired,
    sections: PropTypes.array.isRequired
};