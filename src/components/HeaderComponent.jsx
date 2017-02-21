"use strict";

import React from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import NavigationMenu from "react-material-icons/icons/navigation/menu";
import {Grid, Row, Col} from "react-flexbox-grid";

require("style-loader!css-loader!./../styles/styles.css");

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if (!this.props.courses || this.props.courses.length <= 0) {
            this.courses = [{
                id: 1,
                value: "Course 1"
            }, {
                id: 2,
                value: "Course 2"
            }]
        } else {
            this.courses = this.props.courses;
        }
    }

    render() {
        return (
            <Row className="header-container">
                <Col xs={4} className="user-role-section">
                    <span>
                        <NavigationMenu onTouchTap={this.props.toggleNavigationDrawer}/>
                    </span>
                    <h2>{this.props.userRole}</h2>
                </Col>
                <Col xs={4}>
                    <SelectField
                        ref="selectedCourse"
                        value={this.props.selectedCourse}
                        onChange={this.props.handleCourseChange}>
                        {this.courses.map(
                            (course) => <MenuItem key={course.id} value={course.id} primaryText={course.value}/>
                        )}
                    </SelectField>
                </Col>
                <Col xs={4} className="header-actions">
                    <Row end="xs">
                        <Col xs={4}>
                            <RaisedButton label="Logout" primary={true} onClick={this.props.logout.bind(this)}/>
                        </Col>
                        <Col xs={4}>
                            <h3>7417485915</h3>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default HeaderComponent;