"use strict";

import React from 'react';

import SectionTitle from './SectionTitle';

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <SectionTitle title={this.props.userRole}/>
            </div>
        );
    }
}

export default HeaderComponent;