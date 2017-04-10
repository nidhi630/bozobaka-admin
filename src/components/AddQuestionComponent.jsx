"use strict";

import React from "react";
import {Row, Col} from "react-flexbox-grid";
import SectionSelectionComponent from "./SectionSelectionComponent";
import {questionUpdateSource, questionUpdateL1} from "./../actions/QuestionActions";

export default class AddQuestionComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {difficulty, onDifficultyChange, l1Id, l2Id, l3Id, l4Id, sectionId} = this.props;

        return (
            <div>
                <h2>Add Question</h2>
                <Row>
                    <Col xs={12}>
                        <SectionSelectionComponent updateSource={questionUpdateSource.bind(this)}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={6} md={4}>
                        <L1SelectionComponent sectionId={sectionId} l1Id={l1Id} updateL1={questionUpdateL1.bind(this)}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <TextField title="Difficulty" hintText="Set Difficulty" type="number"
                                   value={difficulty} onChange={onDifficultyChange.bind(this)}/>
                    </Col>
                </Row>
            </div>
        )
    }
}
