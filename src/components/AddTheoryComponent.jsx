"use strict";

import React, {PropTypes} from "react";
import NoAccessErrorComponent from "./NoAccessErrorComponent";
import SectionsDropDownComponent from "./SectionsDropDownComponent";
import {Row, Col} from "react-flexbox-grid";
import TextField from "material-ui/TextField";
import HtmlToReactParser from "html-to-react";
import SourceSelectionComponent from "./SourceSelectionComponent";
import {updateSection} from "./../actions/TheoryActions";

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

        const {updateHeading, theoryContent, updateTheory, updateSelectedSource} = this.props;

        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <h2>Add Theory</h2>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <SectionsDropDownComponent updateSection={updateSection.bind(this)}/>
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
                        <TextField
                            title="Heading"
                            type="text"
                            hintText="Enter Heading"
                            onChange={updateHeading.bind(this)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={6}>
                        <TextField
                            title="Theory"
                            hintText="Enter Theory"
                            multiLine={true}
                            maxLines={20}
                            onChange={updateTheory.bind(this)}
                        />
                    </Col>
                    <Col xs={12} sm={6}>
                        <p>{this.parsedHtml}</p>
                    </Col>
                </Row>
            </div>
        );
    }
}
