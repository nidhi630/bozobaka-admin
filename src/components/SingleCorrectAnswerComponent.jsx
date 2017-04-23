"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {Row, Col} from "react-flexbox-grid";
import {
    questionUpdateAnswer
} from "./../actions/QuestionActions";
import {RadioButton, RadioButtonGroup} from "material-ui/RadioButton";


export class SingleCorrectAnswerComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const styles = {
            radioButton: {
                width: "48%",
                display: "inline-block",
                marginBottom: 15
            }
        };

        const {optionsCount, answer, onChange} = this.props;
        const options = [];
        for (let i = 0; i < optionsCount; i = i + 1) {
            const label = "Option " + (i + 1);
            const item = (<RadioButton value={i + 1} label={label} key={i} style={styles.radioButton}/>);
            options.push(item);
        }
        return (
            <div>
                <h3>Answer</h3>
                <br/>
                <Row>
                    <Col xs={12}>
                        <RadioButtonGroup name="answer" defaultSelected={answer} onChange={onChange.bind(this)}>
                            {options}
                        </RadioButtonGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}

SingleCorrectAnswerComponent.propTypes = {
    answer: PropTypes.number,
    optionsCount: PropTypes.number,
    onChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        answer: state.question.answer.single,
        optionsCount: state.question.options.length
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (event, newValue) => {
            dispatch(questionUpdateAnswer(newValue));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleCorrectAnswerComponent);
