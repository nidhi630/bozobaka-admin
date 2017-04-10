"use strict";

import React from "react";
import {Row, Col} from "react-flexbox-grid";
import SectionSelectionComponent from "./SectionSelectionComponent";
import {
    questionUpdateSource,
    questionUpdateL1,
    questionUpdateL2,
    questionUpdateL3,
    questionUpdateL4,
    questionUpdateStatus
} from "./../actions/QuestionActions";
import L1SelectionComponent from "./L1SelectionComponent";
import L2SelectionComponent from "./L2SelectionComponent";
import L3SelectionComponent from "./L3SelectionComponent";
import L4SelectionComponent from "./L4SelectionComponent";
import StatusSelectionComponent from "./StatusSelectionComponent";
import SourceSelectionComponent from "./SourceSelectionComponent";
import AddSourceComponent from "./AddSourceComponent";

export default class AddQuestionComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {difficulty, onDifficultyChange, l1Id, l2Id, l3Id, l4Id, sectionId, status,
            updateSelectedSource} = this.props;

        return (
            <div>
                <h2>Add Question</h2>
                <Row>
                    <Col xs={12}>
                        <SectionSelectionComponent updateSource={questionUpdateSource.bind(this)}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={6}>
                        <SourceSelectionComponent updateSource={updateSelectedSource.bind(this)}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <AddSourceComponent/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={6} md={4}>
                        <L1SelectionComponent sectionId={sectionId} l1Id={l1Id} updateL1={questionUpdateL1.bind(this)}/>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <L2SelectionComponent l1Id={l1Id} l2Id={l2Id} updateL1={questionUpdateL2.bind(this)}/>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <L3SelectionComponent l2Id={l2Id} l3Id={l3Id} updateL1={questionUpdateL3.bind(this)}/>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <L4SelectionComponent l4Id={l4Id} l3Id={l3Id} updateL1={questionUpdateL4.bind(this)}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <TextField title="Difficulty" hintText="Set Difficulty" type="number"
                                   value={difficulty} onChange={onDifficultyChange.bind(this)}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <StatusSelectionComponent updateStatus={questionUpdateStatus.bind(this)} status={status}/>
                    </Col>
                </Row>
            </div>
        )
    }
}
