"use strict";

import React from "react";
import NoAccessErrorComponent from "./NoAccessErrorComponent";
import {Row, Col} from "react-flexbox-grid";
import RaisedButton from "material-ui/RaisedButton";
import ContentService from "./../services/ContentService";
import Collapse, {Panel} from "rc-collapse";
import 'style-loader!css-loader!rc-collapse/assets/index.css';
import PanelHeader from "./PanelHeader";
import EditSectionComponent from "./EditSectionComponent";
import EditL1Component from "./EditL1Component";

export default class ManageCourseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.scope = {
            hasAccess: false,
            courseId: props.selectedCourse.id,
            sectionToOpen: {},
            l1ToOpen: {}
        };
        this.state = {
            sections: [],
            showLoader: false,
            openSectionDialog: false,
            openL1Dialog: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedCourse.id !== this.scope.courseId) {
            this.scope.courseId = nextProps.selectedCourse.id;
            this.fetchDataFromServer();
        }
    }

    componentWillMount() {
        this.scope.hasAccess = this.props.loggedInUser.role === "admin";
        this.scope.courseId = this.props.selectedCourse.id;
    }

    componentDidMount() {
        this.fetchDataFromServer();
    }

    render() {
        if (!this.scope.hasAccess) {
            return <NoAccessErrorComponent/>
        }

        return (
            <div>
                <br/>
                <h2>Manage Course</h2>
                <br/>
                <Row>
                    <Col xs={6} sm={2}>
                        <RaisedButton label="Add Section" onClick={this.editSection.bind(this)} primary={true}/>
                    </Col>
                    <Col xs={6} sm={2}>
                        <RaisedButton label="Add L1" onClick={this.editL1.bind(this)} primary={true}/>
                    </Col>
                    <Col xs={6} sm={2}>
                        <RaisedButton label="Add L2" onClick={this.editL2.bind(this)} primary={true}/>
                    </Col>
                    <Col xs={6} sm={2}>
                        <RaisedButton label="Add L3" onClick={this.editL3.bind(this)} primary={true}/>
                    </Col>
                    <Col xs={6} sm={2}>
                        <RaisedButton label="Add L4" onClick={this.editL4.bind(this)} primary={true}/>
                    </Col>
                </Row>
                <br/>
                {this.state.sections.length === 0 ? <h2>No Sections</h2> :
                    <Row>
                        <Col xs={12}>
                            <Collapse accordion={true}>
                                {this.state.sections.map((section, sectionIndex) => (
                                    <Panel header={<PanelHeader title={section.name}
                                                                titleClick={this.editSection.bind(this)}
                                                                index={sectionIndex}/>} key={sectionIndex}>
                                        {section.l1s.length === 0 ? <h3>No L1s</h3> :
                                            <Collapse accordion={true}>
                                                {section.l1s.map((l1, l1Index) => (
                                                    <Panel header={<PanelHeader title={l1.name}
                                                                                titleClick={this.editL1.bind(this, sectionIndex)}
                                                                                index={l1Index}/>} key={l1Index}>
                                                        {l1.l2s.length === 0 ? <h3>No L2s</h3> :
                                                            <Collapse accordion={true}>
                                                                {l1.l2s.map((l2, l2Index) => (
                                                                    <Panel header={<PanelHeader title={l2.name}
                                                                                                titleClick={this.editL2.bind(this)}
                                                                                                index={l2Index}/>}
                                                                           key={l2Index}>
                                                                        {l2.l3s.length === 0 ? <h3>No L3s</h3> :
                                                                            <Collapse accordion={true}>
                                                                                {l2.l3s.map((l3, l3Index) => (
                                                                                    <Panel header={<PanelHeader
                                                                                        title={l3.name}
                                                                                        titleClick={this.editL3.bind(this)}
                                                                                        index={l3Index}/>}
                                                                                           key={l3Index}>
                                                                                        {l3.l4s.length === 0 ?
                                                                                            <h3>No L4s</h3> :
                                                                                            <ul>
                                                                                                {l3.l4s.map((l4, l4Index) => (
                                                                                                    <li key={l4Index}>{l4.name}</li>
                                                                                                ))}
                                                                                            </ul>
                                                                                        }
                                                                                    </Panel>
                                                                                ))}
                                                                            </Collapse>
                                                                        }
                                                                    </Panel>
                                                                ))}
                                                            </Collapse>
                                                        }
                                                    </Panel>
                                                ))}
                                            </Collapse>
                                        }
                                    </Panel>
                                ))}
                            </Collapse>
                        </Col>
                    </Row>
                }
                {this.state.openSectionDialog ? <EditSectionComponent showDialog={this.state.openSectionDialog}
                                                                      onDialogClose={this.handleDialogClose.bind(this)}
                                                                      courseId={this.scope.courseId}
                                                                      sectionToOpen={this.scope.sectionToOpen}/> : null}
                {this.state.openL1Dialog ? <EditL1Component showDialog={this.state.openL1Dialog}
                                                            onDialogClose={this.handleDialogClose.bind(this)}
                                                            sections={this.state.sections}
                                                            courseId={this.scope.courseId}
                                                            l1ToOpen={this.scope.l1ToOpen}/> : null}
            </div>
        )
    }

    fetchDataFromServer() {
        this.setState({showLoader: true});
        ContentService.fetchSections({courseId: this.scope.courseId}).then((sections) => {
            console.log(sections);
            this.setState({
                sections: sections,
                showLoader: false
            });
        }).catch((err) => {
            console.log(err);
            this.setState({showLoader: false});
        });
    }

    editSection(rowIndex) {
        this.scope.sectionToOpen = (typeof rowIndex === "number") ? this.state.sections[rowIndex] : {};
        this.setState({openSectionDialog: true});
    }

    editL1(sectionIndex, l1Index) {
        this.scope.l1ToOpen = (typeof sectionIndex === "number" && typeof l1Index === "number") ? this.state.sections[sectionIndex].l1s[l1Index] : {};
        this.setState({openL1Dialog: true});
    }

    editL2() {
        console.log("editL2");
    }

    editL3() {
        console.log("editL3");
    }

    editL4() {
        console.log("editL4");
    }

    handleDialogClose(update = false) {
        this.setState((prevState, props) => {
            if (prevState.openSectionDialog) {
                update ? this.fetchDataFromServer() : null;
                return {openSectionDialog: false};
            } else if (prevState.openL1Dialog) {
                update ? this.fetchDataFromServer() : null;
                return {openL1Dialog: false};
            }
        });
    }
}