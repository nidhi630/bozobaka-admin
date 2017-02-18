"use strict";

import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import SectionTitle from './SectionTitle';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationMenu from 'react-material-icons/icons/navigation/menu';

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if (!this.props.courses || this.props.courses.length <= 0) {
            this.courses = [{
                id: 1,
                value: 'Course 1'
            }, {
                id: 2,
                value: 'Course 2'
            }]
        } else {
            this.courses = this.props.courses;
        }
    }

    render() {
        return (
            <div>
                <div>
                    <NavigationMenu onTouchTap={this.props.toggleNavigationDrawer}/>
                    <SectionTitle title={this.props.userRole}/>
                </div>
                <div>
                    <SelectField
                        ref="selectedCourse"
                        value={this.props.selectedCourse}
                        onChange={this.props.handleCourseChange}>
                        {this.courses.map(
                            (course) => <MenuItem key={course.id} value={course.id} primaryText={course.value}/>
                        )}
                    </SelectField>
                </div>
                <div>
                    <RaisedButton label="Logout" primary={true} onClick={this.props.logout.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default HeaderComponent;