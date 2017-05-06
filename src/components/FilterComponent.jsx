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
    getQuestionFilter,
    setQT
} from "./../actions/FilterActions";
import {publishContentType} from "./../actions/PublishActions";

import DropdownDisplay from "./DropdownDisplayComponent";

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
            status, sectionId, l1Id, l2Id, sourceId, updateMinDifficulty, contentType, updateContentType,
            updateMaxDifficulty, updateQuestion, updateTheory, question, heading, minDifficulty, maxDifficulty,
            headerColumns, usage, qt, updateQT
        } = this.props;

        const style = {
            tableRowColumn: {
                whiteSpace: "normal",
                width: "100%",
                paddingLeft: 0,
                paddingRight: 0,
                backgroundColor: "inherit"
            },
            textField: {
                width: "100%"
            },
            dropdown: {
                width: "100%"
            },
            difficulty: {
                display: "inline-flex"
            }
        };

        return (
            <TableRow striped={true}>
                {
                    headerColumns.map((row, index) => {
                        let value;
                        switch (row.key) {
                            case "question":
                                value = (<TextField type="text" hintText="question" ref="question" id="question"
                                                    onChange={updateQuestion.bind(this)} defaultValue={question}
                                                    style={style.textField}/>);
                                break;
                            case "heading":
                            case "theory":
                                value = (<TextField type="text" hintText="theory" ref="theory" id="theory"
                                                    onChange={updateTheory.bind(this)} defaultValue={heading}
                                                    style={style.textField}/>);
                                break;
                            case "qt":
                                value = (<TextField type="text" hintText="question/theory" id="theory"
                                                    onChange={updateQT.bind(this)} defaultValue={qt}
                                                    style={style.textField}/>);
                                break;
                            case "status":
                                value = (<StatusSelection status={status} actionOnUpdate={setStatus}
                                                          width={style.dropdown.width}/>);
                                break;
                            case "l1Id":
                                value =
                                    (<L1SelectionComponent l1Id={l1Id} sectionId={sectionId} actionOnUpdate={setL1}
                                                          width={style.dropdown.width}/>);
                                break;
                            case "l2Id":
                                value = (<L2SelectionComponent l1Id={l1Id} l2Id={l2Id} actionOnUpdate={setL2}
                                                              width={style.dropdown.width}/>);
                                break;
                            case "source":
                                value = (<SourceSelectionComponent source={sourceId} actionOnUpdate={setSource}
                                                                  width={style.dropdown.width}/>);
                                break;
                            case "sectionId":
                                value = (<SectionSelectionComponent sectionId={sectionId} actionOnUpdate={setSection}
                                                                   width={style.dropdown.width}/>);
                                break;
                            case "difficulty":
                                value = (<div style={style.difficulty}>
                                    <TextField type="number" hintText="Min" ref="minDifficulty" id="minDifficulty"
                                               min="0" max="100"
                                               onChange={updateMinDifficulty.bind(this)} defaultValue={minDifficulty}
                                               style={{width: "50%"}}/>
                                    <TextField type="number" hintText="Max" ref="maxDifficulty" id="maxDifficulty"
                                               min="0" max="100"
                                               onChange={updateMaxDifficulty.bind(this)} defaultValue={maxDifficulty}
                                               style={{width: "50%", marginLeft: 10}}/>
                                </div>);
                                break;
                            case "contentType":
                                value = (
                                    <DropdownDisplay menuItems={["question", "theory"]} value={contentType}
                                                     onChange={updateContentType.bind(this)} hideDefault={usage === "publish2"}
                                                     width={style.dropdown.width}/>
                                );
                                break;
                            default:
                                value = null;
                        }
                        return (<TableRowColumn key={index.toString()}
                                               style={style.tableRowColumn}>{value}</TableRowColumn>);
                    })
                }
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
    sourceId: PropTypes.string,
    filterString: PropTypes.string,
    onChangeAction: PropTypes.func,
    updateMaxDifficulty: PropTypes.func,
    updateMinDifficulty: PropTypes.func,
    updateId: PropTypes.func,
    updateQuestion: PropTypes.func,
    updateTheory: PropTypes.func,
    headerColumns: PropTypes.array,
    updateContentType: PropTypes.func,
    contentType: PropTypes.string,
    qt: PropTypes.string,
    updateQT: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
    return {
        usage: ownProps.usage,
        ...state.filters,
        contentType: state.publish.contentType,
        filterString: ownProps.usage === "theory" ? JSON.stringify(getTheoryFilter(state)) : JSON.stringify(getQuestionFilter(state))
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateId: (event, newValue) => {
            dispatch(setId(newValue));
        },

        updateMinDifficulty: (event, newValue) => {
            dispatch(setMinDifficulty(parseInt(newValue, 10)));
        },

        updateMaxDifficulty: (event, newValue) => {
            dispatch(setMaxDifficulty(parseInt(newValue, 10)));
        },

        updateTheory: (event, newValue) => {
            dispatch(setHeading(newValue));
        },

        updateQuestion: (event, newValue) => {
            dispatch(setQuestion(newValue));
        },

        updateContentType: (event, key, newValue) => {
            dispatch(publishContentType(newValue));
        },

        updateQT: (event, newValue) => {
            dispatch(setQT(newValue));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterComponent);
