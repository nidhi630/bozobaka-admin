/*
    created by aditya on 13-02-2017
 */

import React, {PropTypes} from 'react';

const SectionTitle = (props) => {
    let title = "Content Writer";
    if (props.title) {
        title = props.title;
    }
    return (<h1>{title}</h1>);
};

SectionTitle.PropTypes = {
    title: PropTypes.string.isRequired
};

export default SectionTitle;
