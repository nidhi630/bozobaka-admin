"use strict";

import React from "react";
import NoAccessErrorComponent from "./NoAccessErrorComponent";

export default class ManageCourseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.hasAccess = false;
        this.state = {};
    }

    componentWillMount() {
        this.hasAccess = this.props.loggedInUser.role === "admin";
    }

    render() {
        if (!this.hasAccess) {
            return <NoAccessErrorComponent/>
        }

        return (
            <h2>{this.toString()}</h2>
        )
    }
}