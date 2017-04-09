"use strict";

import React, {PropTypes} from "react";
import NoAccessErrorComponent from "./NoAccessErrorComponent";
import SectionsDropDownComponent from "./SectionsDropDownComponent";

export default class AddTheoryComponent extends React.Component {

    static propTypes() {

    }

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillMount() {

    }

    render() {
        if (!this.props.hasAccess) {
            return (<NoAccessErrorComponent/>);
        }

        return (
            <div>
                <h2>Add Theory</h2>
                <SectionsDropDownComponent/>
            </div>
        );
    }
}
