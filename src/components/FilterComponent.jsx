"use strict";

import React, {PropTypes} from "react";
import {TableRow, TableRowColumn} from "material-ui/Table";
import TextField from "material-ui/TextField";
import StatusSelection from "./StatusSelectionComponent";
import SectionSelectionComponent from "./SectionSelectionComponent";
import L1SelectionComponent from "./L1SelectionComponent";
import L2SelectionComponent from "./L2SelectionComponent";
import SourceSelectionComponent from "./SourceSelectionComponent";
import {connect} from "react-redux";

class FilterComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            onKeyDownHandler, status, onChangeHandler, sectionId, usage,
            l1Id, l2Id, source
        } = this.props;
        return (
            <TableRow>
                <TableRowColumn>
                    <TextField hintText="id" ref="id" id="id" onKeyDown={onKeyDownHandler.bind(this)}/>
                </TableRowColumn>
                <TableRowColumn>
                    {/*<TextField hintText={usage} ref={usage} id={usage} onKeyDown={onKeyDownHandler.bind(this)}/>*/}
                </TableRowColumn>
                <TableRowColumn>
                    <StatusSelection status={status} onChange={onChangeHandler.bind(this)}/>
                </TableRowColumn>
                {usage !== "question" ? null :
                    <TableRowColumn>
                        <TextField hintText="Min" ref="minDifficulty" id="minDifficulty"
                                   onKeyDown={onKeyDownHandler.bind(this)}/>
                        <TextField hintText="Max" ref="maxDifficulty" id="maxDifficulty"
                                   onKeyDown={onKeyDownHandler.bind(this)}/>
                    </TableRowColumn>
                }
                <TableRowColumn>
                    <SectionSelectionComponent sectionId={sectionId} updateSection={onChangeHandler.bind(this)}/>
                </TableRowColumn>
                <TableRowColumn>
                    <L1SelectionComponent l1Id={l1Id} sectionId={sectionId} updateL1={onChangeHandler.bind(this)}/>
                </TableRowColumn>
                <TableRowColumn>
                    <L2SelectionComponent l1Id={l1Id} l2Id={l2Id} updateL2={onChangeHandler.bind(this)}/>
                </TableRowColumn>
                <TableRowColumn>
                    <SourceSelectionComponent source={source} updateSource={onChangeHandler.bind(this)}/>
                </TableRowColumn>
            </TableRow>
        );
    }
}

FilterComponent.propTypes = {
    onKeyDownHandler: PropTypes.func,
    status: PropTypes.string,
    onChangeHandler: PropTypes.func,
    sectionId: PropTypes.string,
    usage: PropTypes.string,
    l1Id: PropTypes.string,
    l2Id: PropTypes.string,
    source: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
    return {
        usage: ownProps.usage,
        ...state.filter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onKeyDownHandler: (event) => {
            console.log(event);
        },

        onChangeHandler: (event, newValue, extra) => {
            console.log(event, newValue, extra);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterComponent);
