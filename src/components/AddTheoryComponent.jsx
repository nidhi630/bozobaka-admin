"use strict";

import React, {PropTypes} from "react";
import NoAccessErrorComponent from "./NoAccessErrorComponent";
import SectionsDropDownComponent from "./SectionsDropDownComponent";
import {Row, Col} from "react-flexbox-grid";
import DropdownDisplay from "./DropdownDisplayComponent";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

export default class AddTheoryComponent extends React.Component {

    static propTypes() {

    }

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillMount() {
        this.props.fetchSources();
    }

    componentWillUnmount() {
        this.props.deleteSources();
    }

    render() {
        if (!this.props.hasAccess) {
            return (<NoAccessErrorComponent/>);
        }

        const {sources, selectedSource, updateSelectedSource, updateHeading, theoryContent} = this.props;
        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <h2>Add Theory</h2>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <SectionsDropDownComponent/>
                    </Col>
                </Row>
                <Row>
                    {sources.length ?
                        <Col xs={8} sm={6}>
                            <DropdownDisplay menuItems={sources} value={selectedSource}
                                             onChange={updateSelectedSource.bind(this)}/>
                        </Col>
                        :
                        null
                    }
                    <Col xs={4} sm={6}>
                        <RaisedButton label="Add Source" primary={true}/>
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
                            hineText="Enter Theory"
                            onChange={updateTheory.bind(this)}
                        />
                    </Col>
                    <Col xs={12} sm={6}>
                        <p>{}</p>
                    </Col>
                </Row>
            </div>
        );
    }
}
