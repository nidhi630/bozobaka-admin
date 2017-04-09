"use strict";

import React, {PropTypes} from "react";
import NoAccessErrorComponent from "./NoAccessErrorComponent";
import SectionsDropDownComponent from "./SectionsDropDownComponent";
import {Row, Col} from "react-flexbox-grid";

export default class AddTheoryComponent extends React.Component {

    static propTypes() {

    }

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillMount() {

    }

    render() {
        if (!this.props.hasAccess) {
            return (<NoAccessErrorComponent/>);
        }

        return (
            <div>
                <h2>Add Theory</h2>
                <Row>
                    <Col xs={12}>
                        <SectionsDropDownComponent/>
                    </Col>
                </Row>
                
            </div>
        );
    }
}
