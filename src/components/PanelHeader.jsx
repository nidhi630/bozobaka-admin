"use strict";

import React from "react";

const PanelHeader = (props) => {
    return (<span onClick={props.titleClick.bind(this, props.index)}><u>{props.title}</u></span>);
};

export default PanelHeader;