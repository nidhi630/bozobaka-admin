"use strict";

import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import {Link} from "react-router";
import URLs from "../models/Urls";

class SidebarComponent extends React.Component {
    constructor(props) {
        super(props);

        this.urlConfig = {
            "Dashboard": URLs.DASHBOARD,
            "Add Question": URLs.ADD_QUESTION,
            "List Of Questions": URLs.LIST_QUESTIONS,
            "Drafts": URLs.DRAFTS,
            "Manage": URLs.MANAGE,
            "List Of Theory": URLs.LIST_THEORY,
            "Add Theory": URLs.ADD_THEORY,
            "Publish": URLs.PUBLISH,
            "Manage Course": URLs.MANAGE_COURSE,
            "Trash": URLs.TRASH,
            "Review Of Questions": URLs.REVIEW_QUESTION,
            "Marked For Later": URLs.MARKED_LATER
        };

        this.roleOptionsMap = {
            superAdmin: ["Dashboard", "Manage", "List Of Questions", "List Of Theory"],
            admin: ["Dashboard", "Add Theory", "List Of Questions", "Publish", "Manage Course", "List Of Questions", "Trash"],
            reviewer: ["Dashboard", "Review Of Questions", "Marked For Later", "Trash"],
            contentWriter: ["Dashboard", "Add Question", "List Of Questions", "Drafts", "Trash"]
        }
    }

    componentWillMount() {
        this.componentOptions = this.roleOptionsMap[this.props.loggedInUser.role];
    }

    render() {
        return (
            <Drawer
                open={this.props.openNavigationDrawer}
                docked={false}
                onRequestChange={this.props.toggleDrawer}>
                {this.componentOptions.map(
                    (option, index) => (
                        <Link key={index} to={this.urlConfig[option]}>
                            <MenuItem>{option}</MenuItem>
                        </Link>
                    )
                )}
            </Drawer>
        );
    }
}

export default SidebarComponent;