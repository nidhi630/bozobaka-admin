"use strict";

import React, {PropTypes} from "react";

const LivePreviewComponent = ({content}) => {
    return (
        <div dangerouslySetInnerHTML={{__html: content}}>
        </div>
    )
};

LivePreviewComponent.propTypes = {
    content: PropTypes.string.isRequired
};

export default LivePreviewComponent;