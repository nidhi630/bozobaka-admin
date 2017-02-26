"use strict";

import React from "react";
import Paper from "material-ui/Paper";

export default class SummaryCardComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper zDepth={1} rounded={false}>
                <h4>{this.props.title}</h4>
                <p>{this.props.value}</p>
            </Paper>
        );
    }
}

SummaryCardComponent.propTypes = {
    title: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired
};

SummaryCardComponent.defaultProps = {
    title: "Questions Added",
    value: 0
};

