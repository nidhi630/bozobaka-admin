"use strict";

import React from "react";
import Paper from "material-ui/Paper";

const SummaryCardComponent = ({value, title}) => {
    const styles = {
        valueStyle: {
            fontSize: "5em",
            fontWeight: 300
        },
        titleStyle: {
            fontSize: "1.2em",
            fontWeight: 500
        },
        paperStyle: {
            textAlign: "center"
        }
    };

    return (
        <div style={styles.paperStyle}>
            <p style={styles.valueStyle}>{value}</p>
            <p style={styles.titleStyle}>{title}</p>
        </div>
    );
};

SummaryCardComponent.propTypes = {
    title: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired
};

export default SummaryCardComponent;

