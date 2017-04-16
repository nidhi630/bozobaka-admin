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
    setSource,
    setMinDifficulty,
    setMaxDifficulty,
    getTheoryFilter,
    getQuestionFilter
} from "./../actions/FilterActions";

class FilterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.filterActionTimeout = null;
    }

    componentWillReceiveProps(nextProps) {
        const {filterString, onChangeAction} = this.props;
        if (nextProps.filterString !== filterString) {
            if (this.filterActionTimeout) {
                window.clearTimeout(this.filterActionTimeout);
            }
            this.filterActionTimeout = setTimeout(() => {
                onChangeAction();
            }, 500);
        }
    }

    render() {
        const {
            status, sectionId, usage, l1Id, l2Id, source, updateId, updateMinDifficulty,
            updateMaxDifficulty, updateQuestion, updateTheory, id, question, heading, minDifficulty, maxDifficulty
        } = this.props;

        return (
            <TableRow>
                <TableRowColumn>
                    {/*<TextField type="text" hintText="id" ref="id" id="id" onChange={updateId.bind(this)} defaultValue={id}/>*/}
                </TableRowColumn>
                <TableRowColumn>
                    {usage === "question" ? <TextField type="text" hintText="question" ref="question" id="question"
                                                       onChange={updateQuestion.bind(this)} defaultValue={question}/>
                        : <TextField type="text" hintText="theory" ref="theory" id="theory"
                                     onChange={updateTheory.bind(this)} defaultValue={heading}/>
                    }

                </TableRowColumn>
                <TableRowColumn>
                    <StatusSelection status={status} actionOnUpdate={setStatus}/>
                </TableRowColumn>
                {usage === "question" ?
                    <TableRowColumn>
                        <TextField type="number" hintText="Min" ref="minDifficulty" id="minDifficulty"
                                   onChange={updateMinDifficulty.bind(this)} defaultValue={minDifficulty} style={{width: "50%"}}/>
                        <TextField type="number" hintText="Max" ref="maxDifficulty" id="maxDifficulty"
                                   onChange={updateMaxDifficulty.bind(this)} defaultValue={maxDifficulty}style={{width: "50%", marginLeft: 10}}/>
                    </TableRowColumn>
                    : null
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
                    <SourceSelectionComponent source={source[0]} actionOnUpdate={setSource}/>
                </TableRowColumn>
                <TableRowColumn/>
            </TableRow>
        );
    }
}

FilterComponent.propTypes = {
    id: PropTypes.string,
    heading: PropTypes.string,
    question: PropTypes.string,
    status: PropTypes.string,
    updateL1: PropTypes.func,
    updateL2: PropTypes.func,
    minDifficulty: PropTypes.number,
    maxDifficulty: PropTypes.number,
    sectionId: PropTypes.string,
    usage: PropTypes.string,
    l1Id: PropTypes.string,
    l2Id: PropTypes.string,
    source: PropTypes.array,
    filterString: PropTypes.string,
    onChangeAction: PropTypes.func,
    updateMaxDifficulty: PropTypes.func,
    updateMinDifficulty: PropTypes.func,
    updateId: PropTypes.func,
    updateQuestion: PropTypes.func,
    updateTheory: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
    return {
        usage: ownProps.usage,
        ...state.filters,
        filterString: ownProps.usage === "theory" ? JSON.stringify(getTheoryFilter(state)) : JSON.stringify(getQuestionFilter(state))
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateId: (event, newValue) => {
            dispatch(setId(newValue));
        },

        updateMinDifficulty: (event, newValue) => {
            dispatch(setMinDifficulty(newValue));
        },

        updateMaxDifficulty: (event, newValue) => {
            dispatch(setMaxDifficulty(newValue));
        },

        updateTheory: (event, newValue) => {
            dispatch(setHeading(newValue));
        },

        updateQuestion: (event, newValue) => {
            dispatch(setQuestion(newValue));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterComponent);
