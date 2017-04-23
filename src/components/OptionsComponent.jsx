/**
 * Created by aditya on 23/4/17.
 */

"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {Row, Col} from "react-flexbox-grid";
import {
    questionAddOption,
    questionUpdateOption,
    questionRemoveOption
} from "./../actions/QuestionActions";
import Editor from "./EditorComponent";
import LivePreview from "./LivePreviewComponent";
import {parseKatex} from "./../services/KatexParser";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";

class OptionsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.optionName = "ABCDEFGHIJKLMNOPQRSTUVZXYZ";
    }

    render() {
        const {options, onChange, removeOption, addOptions} = this.props;

        return (
            <div>
                <h3>Options</h3>
                <br/>
                {options.map((option, index) => (
                    <Row key={index.toString()}>
                        <Col xs={6}>
                            <Row>
                                <Col xs={6}>
                                    <h4>Option {this.optionName[index]}</h4>
                                </Col>
                                <Col xs={6}>
                                    <FlatButton secondary={true} label="Remove" onTouchTap={removeOption.bind(this, index)}/>
                                </Col>
                            </Row>
                            <Editor content={option.raw} placeHolder="option" onChange={onChange.bind(this, index)}
                                    modules="optionsModules"/>
                        </Col>
                        <Col xs={6}>
                            <h4>Preview</h4>
                            <LivePreview content={option.parsed}/>
                        </Col>
                        <Col xs={12}>
                            <br/>
                        </Col>
                    </Row>))
                }
                <br/>
                <RaisedButton label="Add Option" onTouchTap={addOptions.bind(this)} primary={true}/>
            </div>
        );
    }
}

OptionsComponent.propTypes = {
    options: PropTypes.array,
    onChange: PropTypes.func,
    removeOption: PropTypes.func,
    addOptions: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        options: state.question.options
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addOptions: () => {
            dispatch(questionAddOption());
        },

        removeOption: (index) => {
            dispatch(questionRemoveOption(index));
        },

        onChange: (index, newValue) => {
            dispatch(questionUpdateOption(index, {
                raw: newValue,
                parsed: parseKatex(newValue)
            }));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionsComponent);

