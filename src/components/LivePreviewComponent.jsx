"use strict";

import React, {PropTypes} from "react";

const LivePreviewComponent = ({content}) => {
    return (
        <div>
            {content}
        </div>
    );
};

LivePreviewComponent.propTypes = {
    content: PropTypes.node
};

export default LivePreviewComponent;