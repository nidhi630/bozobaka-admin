"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {Row, Col} from "react-flexbox-grid";
import DropdownDisplay from "./DropdownDisplayComponent";
import {
    fetchExams as fetchExamsRequest
} from "./../actions/ExamActions";
import RaisedButton from "material-ui/RaisedButton";
import {
    questionAddAppearedIn,
    questionRemoveAppearedIn,
    questionUpdateAppearedIn
} from "./../actions/QuestionActions";
import TextField from "material-ui/TextField";

class ExamsAppearedComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchExams();
    }

    render() {
        const {exams, appearedIn, onExamChange, onYearChange, addAppearedIn, removeAppearedIn} = this.props;
        const menuItems = exams.map(exam => exam.name);

        return (
            <div>
                <h3>Appeared In</h3>
                {appearedIn.map((exam, index) => (
                    <Row key={index.toString()}>
                        <Col xs={6} sm={5}>
                            <br/>
                            <DropdownDisplay menuItems={menuItems} onChange={onExamChange.bind(this, index)}
                                             value={exam.name}/>
                        </Col>
                        <Col xs={6} sm={5}>
                            <TextField name={"year" + index} hintText="Enter Year" floatingLabelText="Year"
                                       defaultValue={exam.year} type="number"
                                       onChange={onYearChange.bind(this, index)}/>
                        </Col>
                        <Col xs={12} sm={2}>
                            <br/>
                            <RaisedButton label="remove" onClick={removeAppearedIn.bind(this, index)}/>
                        </Col>
                    </Row>
                ))}
                <br/>
                <RaisedButton label="Add Another Exam" onClick={addAppearedIn.bind(this)} primary={true}/>
            </div>
        );
    }
}

ExamsAppearedComponent.defaultProps = {
    exams: []
};

ExamsAppearedComponent.propTypes = {
    exams: PropTypes.array,
    fetchExams: PropTypes.func,
    appearedIn: PropTypes.array,
    onYearChange: PropTypes.func,
    onExamChange: PropTypes.func,
    addAppearedIn: PropTypes.func,
    removeAppearedIn: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        ...state.exam,
        appearedIn: state.question.appearedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchExams: () => {
            dispatch(fetchExamsRequest());
        },

        onExamChange: (index, event, position, newValue) => {
            dispatch(questionUpdateAppearedIn(newValue, null, index));
        },

        onYearChange: (index, event, newValue) => {
            dispatch(questionUpdateAppearedIn(null, newValue, index));
        },

        addAppearedIn: () => {
            dispatch(questionAddAppearedIn({}));
        },

        removeAppearedIn: (index) => {
            dispatch(questionRemoveAppearedIn(index));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamsAppearedComponent);

