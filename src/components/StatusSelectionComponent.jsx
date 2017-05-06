"use strict";

import React, {PropTypes} from "react";
import DropdownDisplay from "./DropdownDisplayComponent";
import {connect} from "react-redux";

class StatusSelectionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.allStatus = [{
            id: "draft",
            displayName: "Draft"
        }, {
            id: "added",
            displayName: "Added"
        }, {
            id: "accept",
            displayName: "Accepted"
        }, {
            id: "publish",
            displayName: "Published"
        }, {
            id: "trash",
            displayName: "Trash"
        }, {
            id: "later",
            displayName: "Marked For Later"
        }];
    }

    render() {
        const {onChange, status, width} = this.props;
        return (
            <DropdownDisplay menuItems={this.allStatus} onChange={onChange.bind(this)} value={status} width={width}/>
        );
    }
}

StatusSelectionComponent.propTypes = {
    onChange: PropTypes.func,
    status: PropTypes.string,
    width: PropTypes.string || PropTypes.number
};

const mapStateToProps = (state, ownProps) => {
    return {
        status: ownProps.status
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (event, index, value) => {
            dispatch(ownProps.actionOnUpdate(value));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusSelectionComponent);

