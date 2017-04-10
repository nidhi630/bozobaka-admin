"use strict";

import React from "react";
import {Row, Col} from "react-flexbox-grid";
import SectionsDropDownComponent from "./SectionsDropDownComponent";
import {updateSource} from "./../actions/QuestionActions";

export default class AddQuestionComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {updateSelectedSource} = this.props;

        return (
            <div>
                <h2>Add Question</h2>
                <Row>
                    <Col xs={12}>
                        <SectionsDropDownComponent updateSource={updateSource.bind(this)}/>
                    </Col>
                </Row>
            </div>
        )
    }
}
