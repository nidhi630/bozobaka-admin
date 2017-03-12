"use strict";

import React from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import NavigationMenu from "react-material-icons/icons/navigation/menu";
import {Row, Col} from "react-flexbox-grid";
import ContentService from "./../services/ContentService";
import {browserHistory} from "react-router";

export default class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let toRender = (
            <Row className="header-container">
                <Col xs={12} sm={4} className="user-role-section">
                    <span>
                        <NavigationMenu onTouchTap={this.props.toggleNavigationDrawer}/>
                    </span>
                    <h2>BrownBoard</h2>
                </Col>
                <Col xs={12} sm={4}>
                    <SelectField
                        ref="selectedCourse"
                        value={this.props.selectedCourse.id}
                        onChange={this.handleCourseChange.bind(this)}>
                        {this.props.courses.map(
                            (course, index) => <MenuItem key={index} value={course.id} primaryText={course.displayName}/>
                        )}
                    </SelectField>
                </Col>
                <Col xs={12} sm={4} className="header-actions">
                    <Row end="xs">
                        <Col xs={12}>
                            <FlatButton label="Logout" onClick={this.props.logout.bind(this)}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
        return (toRender);
    }

    handleCourseChange(event, index, value) {
        browserHistory.push(window.location.pathname + "?selectedCourse=" + value);
        this.props.handleCourseChange(this.props.courses, value);
    }
}

HeaderComponent.defaultProps = {
    selectedCourse: 1
};