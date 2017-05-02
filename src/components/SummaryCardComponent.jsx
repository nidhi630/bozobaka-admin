"use strict";

import React from "react";
import Paper from "material-ui/Paper";

const SummaryCardComponent = ({value, title}) => {
    const styles = {
        valueStyle: {
            fontSize: "5em",
            fontWeight: 400
        },
        titleStyle: {
            fontSize: "1.3em",
            fontWeight: 300
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

