"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {Row, Col} from "react-flexbox-grid";
import DropdownDisplay from "./DropdownDisplayComponent";
import {
    fetchExams as fetchExamsRequest
} from "./../actions/ExamActions";
import DatePicker from "material-ui/DatePicker";
import RaisedButton from "material-ui/RaisedButton";

class ExamsAppearedComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchExams();
    }

    render() {
        const {exams, appearedIn, onExamChange, onYearChange, addAppearedIn} = this.props;

        return (
            <div>
                <h3>Appeared In</h3>
                <br/>
                {
                    appearedIn.map((app, index) => (
                        <Row>
                            <Col xs={6} sm={5}>
                                <DropdownDisplay menuItems={exams} onChange={onExamChange.bind(this, index)}/>
                            </Col>
                            <Col xs={6} sm={5}>
                                <DatePicker hintText="Year"
                                            container="inline"
                                            defaultDate={app.year}
                                            formatDate={(date) => (date.getYear())}
                                            onChange={onYearChange.bind(this, index)}/>
                            </Col>
                            <Col xs={12} sm={2}>
                            </Col>
                        </Row>
                    ))
                }
                <br/>
                <RaisedButton label="Add Another" onTouchTap={addAppearedIn.bind(this)} />
            </div>
        );
    }
}

ExamsAppearedComponent.propTypes = {
    exams: PropTypes.array,
    fetchExams: PropTypes.func,
    appearedIn: PropTypes.array,
    onYearChange: PropTypes.func,
    onExamChange: PropTypes.func,
    addAppearedIn: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        ...state.exams,
        appearedIn: state.question.appearedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchExams: () => {
            dispatch(fetchExamsRequest());
        },

        onExamChange: () => {
            console.log(arguments);
        },

        onYearChange: () => {
            console.log(arguments);
        },

        addAppearedIn: () => {
            dispatch
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamsAppearedComponent);

