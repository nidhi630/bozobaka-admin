"use strict";

import React, {PropTypes} from "react";
import NoAccessErrorComponent from "./NoAccessErrorComponent";
import SectionSelectionComponent from "./SectionSelectionComponent";
import {Row, Col} from "react-flexbox-grid";
import TextField from "material-ui/TextField";
import HtmlToReactParser from "html-to-react";
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
    theoryUpdateL4
} from "./../actions/TheoryActions";

export default class AddTheoryComponent extends React.Component {

    static propTypes() {

    }

    constructor(props) {
        super(props);
        let html = "<NoAccessErrorComponent/>";
        let htmlToRect = new HtmlToReactParser();
        this.parsedHtml = htmlToRect.parse(html);
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    render() {
        if (!this.props.hasAccess) {
            return (<NoAccessErrorComponent/>);
        }

        const {
            updateHeading, theory, updateTheory, updateSelectedSource,
            l1Id, l2Id, l3Id, l4Id, sectionId
        } = this.props;

        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <h2>Add Theory</h2>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <SectionSelectionComponent updateSection={theoryUpdateSection.bind(this)}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <SourceSelectionComponent updateSource={updateSelectedSource.bind(this)}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <h3>Text</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <TextField title="Heading" type="text" hintText="Enter Heading"
                                   onChange={updateHeading.bind(this)}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={6}>
                        <TextField title="Theory" hintText="Enter Theory" multiLine={true} maxLines={20}
                                   onChange={updateTheory.bind(this)}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <p>{this.parsedHtml}</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={6} md={4}>
                        <L1SelectionComponent sectionId={sectionId} l1Id={l1Id} updateL1={theoryUpdateL1.bind(this)}/>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <L2SelectionComponent l1Id={l1Id} l2Id={l2Id} updateL1={theoryUpdateL2.bind(this)}/>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <L3SelectionComponent l2Id={l2Id} l3Id={l3Id} updateL1={theoryUpdateL3.bind(this)}/>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <L4SelectionComponent l4Id={l4Id} l3Id={l3Id} updateL1={theoryUpdateL4.bind(this)}/>
                    </Col>
                </Row>
            </div>
        );
    }
}
