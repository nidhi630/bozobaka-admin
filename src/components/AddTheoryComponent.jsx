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
    theoryUpdateStatus,
    theoryUpdateSource
} from "./../actions/TheoryActions";
import StatusSelectionComponent from "./StatusSelectionComponent";
import AddSourceComponent from "./AddSourceComponent";
import LivePreviewComponent from "./LivePreviewComponent";
import {resetVariables} from "./../services/KatexParser";
import EditorComponent from "./EditorComponent";
import DropdownDisplay from "./DropdownDisplayComponent";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Snackbar from "material-ui/Snackbar";

export default class AddTheoryComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {id} = this.props.location.query;
        if (id) {
            this.props.fetchTheory(id);
        }
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
            updateHeading, theory, updateTheory, l1Id, l2Id, l3Id, l4Id, sectionId, status, parsedTheory, heading,
            resetState, postTheory, hasErrored, errorMessage, isLoading, id, sources
        } = this.props;

        return (
            <div>
                <br/>
                <Row>
                    <Col xs={12}>
                        <h1>Add Theory</h1>
                        <b>{id}</b>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={12}>
                        <h3>Section</h3>
                        <SectionSelectionComponent sectionId={sectionId}
                                                   actionOnUpdate={theoryUpdateSection.bind(this)}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={12} sm={5}>
                        <h3>Source</h3>
                        <SourceSelectionComponent actionOnUpdate={theoryUpdateSource.bind(this)} source={sources[0]}/>
                    </Col>
                    <Col xs={12} sm={5}>
                        <AddSourceComponent/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={12}>
                        <h3>Type</h3>
                        <DropdownDisplay menuItems={["Text"]} onChange={() => (true)} value={"Text"}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={12}>
                        <h3>Heading</h3>
                        <TextField title="Heading" type="text" hintText="Enter Heading" fullWidth={true}
                                   multiLine={true} onChange={updateHeading.bind(this)} value={heading}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={12} sm={6} md={7}>
                        <h3>Theory</h3>
                        <EditorComponent content={theory} onChange={updateTheory.bind(this)}
                                         placeHolder="Enter Theory"/>
                    </Col>
                    <Col xs={12} sm={6} md={5}>
                        <h3>Theory Preview</h3>
                        <LivePreviewComponent content={parsedTheory}/>
                    </Col>
                </Row>
                <br/><br/>
                <Row>
                    <Col xs={12} sm={6} md={3}>
                        <h3>L1</h3>
                        <L1SelectionComponent sectionId={sectionId} l1Id={l1Id}
                                              actionOnUpdate={theoryUpdateL1.bind(this)}/>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <h3>L2</h3>
                        <L2SelectionComponent l1Id={l1Id} l2Id={l2Id} actionOnUpdate={theoryUpdateL2.bind(this)}/>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <h3>L3</h3>
                        <L3SelectionComponent l2Id={l2Id} l3Id={l3Id} actionOnUpdate={theoryUpdateL3.bind(this)}/>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <h3>L4</h3>
                        <L4SelectionComponent l4Id={l4Id} l3Id={l3Id} actionOnUpdate={theoryUpdateL4.bind(this)}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={12}>
                        <h3>Status</h3>
                        <StatusSelectionComponent actionOnUpdate={theoryUpdateStatus.bind(this)} status={status}/>
                    </Col>
                </Row>
                <br/><br/>
                <Row>
                    <Col sm={3}>
                        <FlatButton disabled={isLoading} secondary={true} label="Discard"
                                    onClick={resetState.bind(this)}/>
                    </Col>
                    <Col sm={3} smOffset={3}>
                        <FlatButton disabled={isLoading} primary={true} label="Save To Draft"
                                    onClick={postTheory.bind(this, "draft")}/>
                    </Col>
                    <Col sm={3}>
                        <RaisedButton disabled={isLoading} primary={true} label="Save"
                                      onClick={postTheory.bind(this, "")}/>
                    </Col>
                </Row>
                <br/><br/><br/>
                <Snackbar open={hasErrored} message={errorMessage} autoHideDuration={20000}/>
            </div>
        );
    }
}

AddTheoryComponent.propTypes = {
    hasErrored: PropTypes.bool,
    errorMessage: PropTypes.string,
    isLoading: PropTypes.bool,
    postTheory: PropTypes.func,
    resetState: PropTypes.func,
    status: PropTypes.string,
    sectionId: PropTypes.string,
    l1Id: PropTypes.string,
    l2Id: PropTypes.string,
    l3Id: PropTypes.string,
    l4Id: PropTypes.string,
    parsedTheory: PropTypes.node,
    theory: PropTypes.string,
    updateQuestion: PropTypes.func,
    sources: PropTypes.array,
    onDifficultyChange: PropTypes.func,
    id: PropTypes.string,
    fetchQuestion: PropTypes.func,
    location: PropTypes.object,
    updateHeading: PropTypes.func,
    updateTheory: PropTypes.func,
    heading: PropTypes.string,
    fetchTheory: PropTypes.func,
    hasAccess: PropTypes.bool
};
