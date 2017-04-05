"use strict";

import React from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import {Row, Col} from "react-flexbox-grid";

export default class AddQuestionComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    addSection() {
        alert("add section");
    }

    render() {
        return (
            <div>
                <h2>Add Question</h2>
                <Row>
                    <Col xs={12}>
                        <SelectField
                            ref="selectedSection"
                            value={this.props.selectedSection}
                            onChange={this.props.handleL1Change}>
                            {
                                this.props.sections.map(
                                    (section) => <MenuItem key={section.id} value={section.id} primaryText={section.value} />
                                )
                            }
                            <MenuItem key="new_section" primaryText="+ Add New" onClick={this.addSection.bind(this)} />
                        </SelectField>
                    </Col>
                </Row>
            </div>
        )
    }
}

AddQuestionComponent.defaultProps = {
    selectedSection: 1,
    sections: [{
        id: 1,
        value: "Quant"
    }, {
        id: 2,
        value: "Verbal"
    }]
};