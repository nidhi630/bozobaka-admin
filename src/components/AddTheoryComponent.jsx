"use strict";

import React, {PropTypes} from "react";
import NoAccessErrorComponent from "./NoAccessErrorComponent";
import SectionSelectionComponent from "./SectionSelectionComponent";
import {Row, Col} from "react-flexbox-grid";
import TextField from "material-ui/TextField";
import SourceSelectionComponent from "./SourceSelectionComponent";
import {theoryUpdateSection} from "./../actions/TheoryActions";
import L1SelectionComponent from "./L1SelectionComponent";
import L2SelectionComponent from "./L2SelectionComponent";
import L3SelectionComponent from "./L3SelectionComponent";
import L4SelectionComponent from "./L4SelectionComponent";
import {
    theoryUpdateL1,
    theoryUpdateL2,
    theoryUpdateL3,
    theoryUpdateL4,
    theoryUpdateStatus
} from "./../actions/TheoryActions";
import StatusSelectionComponent from "./StatusSelectionComponent";
import AddSourceComponent from "./AddSourceComponent";
import LivePreviewComponent from "./LivePreviewComponent";
import {resetVariables} from "./../services/KatexParser";
import EditorComponent from "./EditorComponent";

export default class AddTheoryComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillMount() {

    }

    componentWillUnmount() {
        setTimeout(() => {
            resetVariables();
        }, 0);
    }

    render() {
        if (!this.props.hasAccess) {
            return (<NoAccessErrorComponent/>);
        }

        const {
            updateHeading, theory, updateTheory, updateSelectedSource,
            l1Id, l2Id, l3Id, l4Id, sectionId, status, parsedTheory, heading
        } = this.props;

        return (
            <div>
                <br/>
                <Row>
                    <Col xs={12}>
                        <h2>Add Theory</h2>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={12}>
                        <SectionSelectionComponent updateSection={theoryUpdateSection.bind(this)}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={12} sm={6}>
                        <SourceSelectionComponent updateSource={updateSelectedSource.bind(this)}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <AddSourceComponent/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={12}>
                        <h3>Text</h3>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={12}>
                        <TextField title="Heading" type="text" hintText="Enter Heading"
                                   onChange={updateHeading.bind(this)} defaultValue={heading}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={12} sm={6} md={7}>
                        <h3>Theory</h3>
                        <EditorComponent
                            content={theory}
                            onChange={updateTheory.bind(this)}
                            placeHolder="Enter Theory"
                        />
                    </Col>
                    <Col xs={12} sm={6} md={5}>
                        <LivePreviewComponent content={parsedTheory}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={6} md={4}>
                        <L1SelectionComponent sectionId={sectionId} l1Id={l1Id} updateL1={theoryUpdateL1.bind(this)}/>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <L2SelectionComponent l1Id={l1Id} l2Id={l2Id} updateL2={theoryUpdateL2.bind(this)}/>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <L3SelectionComponent l2Id={l2Id} l3Id={l3Id} updateL3={theoryUpdateL3.bind(this)}/>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <L4SelectionComponent l4Id={l4Id} l3Id={l3Id} updateL4={theoryUpdateL4.bind(this)}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <StatusSelectionComponent updateStatus={theoryUpdateStatus.bind(this)} status={status}/>
                    </Col>
                </Row>
            </div>
        );
    }
}
