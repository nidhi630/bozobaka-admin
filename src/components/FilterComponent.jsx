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
import {
    setSection,
    setStatus,
    setL1,
    setL2,
    setHeading,
    setId,
    setQuestion,
    setSource
} from "./../actions/FilterActions";

class FilterComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            onKeyDownHandler, status, sectionId, usage, l1Id, l2Id, source
        } = this.props;

        console.log(this.props);
        return (
            <TableRow>
                <TableRowColumn>
                    <TextField hintText="id" ref="id" id="id" onKeyDown={onKeyDownHandler.bind(this)}/>
                </TableRowColumn>
                <TableRowColumn>
                    <TextField hintText={usage} ref={usage} id={usage} onKeyDown={onKeyDownHandler.bind(this)}/>
                </TableRowColumn>
                <TableRowColumn>
                    <StatusSelection status={status} actionOnUpdate={setStatus}/>
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
                    <SectionSelectionComponent sectionId={sectionId} actionOnUpdate={setSection}/>
                </TableRowColumn>
                <TableRowColumn>
                    <L1SelectionComponent l1Id={l1Id} sectionId={sectionId} actionOnUpdate={setL1}/>
                </TableRowColumn>
                <TableRowColumn>
                    <L2SelectionComponent l1Id={l1Id} l2Id={l2Id} actionOnUpdate={setL2}/>
                </TableRowColumn>
                <TableRowColumn>
                    <SourceSelectionComponent source={source} actionOnUpdate={setSource}/>
                </TableRowColumn>
            </TableRow>
        );
    }
}

FilterComponent.propTypes = {
    onKeyDownHandler: PropTypes.func,
    status: PropTypes.string,
    updateL1: PropTypes.func,
    updateL2: PropTypes.func,
    sectionId: PropTypes.string,
    usage: PropTypes.string,
    l1Id: PropTypes.string,
    l2Id: PropTypes.string,
    source: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
    return {
        usage: ownProps.usage,
        ...state.filters
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onKeyDownHandler: (event) => {
            console.log(event);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterComponent);