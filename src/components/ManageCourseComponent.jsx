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

export default class ManageCourseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.hasAccess = false;
        this.courseId = props.selectedCourse.id;
        this.sectionToOpen = {};
        this.state = {
            sections: [],
            showLoader: false,
            openSectionDialog: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedCourse.id !== this.courseId) {
            this.courseId = nextProps.selectedCourse.id;
            this.fetchDataFromServer();
        }
    }

    componentWillMount() {
        this.hasAccess = this.props.loggedInUser.role === "admin";
        this.courseId = this.props.selectedCourse.id;
    }

    componentDidMount() {
        this.fetchDataFromServer();
    }

    render() {
        if (!this.hasAccess) {
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
                                                                                titleClick={this.editL1.bind(this)}
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
                                                                      sectionToOpen={this.sectionToOpen}/> : null}
            </div>
        )
    }

    fetchDataFromServer() {
        this.setState({showLoader: true});
        ContentService.fetchSections({courseId: this.courseId}).then((sections) => {
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
        this.sectionToOpen = (typeof rowIndex === "number") ? this.state.sections[rowIndex] : {};
        this.setState({openSectionDialog: true});
    }

    editL1() {
        console.log("editL1");
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
            }
        });
    }
}