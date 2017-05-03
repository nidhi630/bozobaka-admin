"use strict";

import React, {PropTypes} from "react";
import FlatButton from "material-ui/FlatButton";
import NavigationMenu from "react-material-icons/icons/navigation/menu";
import {Row, Col} from "react-flexbox-grid";
import {browserHistory} from "react-router";
import DropdownDisplay from "./DropdownDisplayComponent";

export default class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {courses, toggleNavigationDrawer, logout, selectedCourse} = this.props;
        return (
            <Row className="header-container">
                <Col xs={12} sm={4} className="user-role-section">
                    <span>
                        <NavigationMenu onTouchTap={toggleNavigationDrawer}/>
                    </span>
                    <h2>BrownBoard</h2>
                </Col>
                <Col xs={12} sm={4}>
                    <DropdownDisplay menuItems={courses} value={selectedCourse.id} hideDefault={true}
                                     onChange={this.handleCourseChange.bind(this)}/>
                </Col>
                <Col xs={12} sm={4} className="header-actions">
                    <Row end="xs">
                        <Col xs={12}>
                            <FlatButton label="Logout" onClick={logout}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }

    handleCourseChange(event, index, value) {
        browserHistory.push(window.location.pathname + "?selectedCourse=" + value);
        this.props.handleCourseChange(this.props.courses, value);
    }
}

HeaderComponent.propTypes = {
    logout: PropTypes.func,
    toggleNavigationDrawer: PropTypes.func,
    courses: PropTypes.array,
    handleCourseChange: PropTypes.func,
    selectedCourse: PropTypes.object
};
