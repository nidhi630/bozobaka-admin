"use strict";

import React, {PropTypes} from "react";
import DropdownDisplay from "./DropdownDisplayComponent";
import {connect} from "react-redux";

class StatusSelectionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.allStatus = ["Draft", "Added", "Accepted", "Published", "Deleted"];
    }

    render() {
        const {onChange, status} = this.props;
        return (
            <DropdownDisplay menuItems={this.allStatus} onChange={onChange.bind(this)} value={status}/>
        );
    }
}

StatusSelectionComponent.propTypes = {
    onChange: PropTypes.func,
    status: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
    return {
        status: ownProps.status
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (event, index, value) => {
            dispatch(ownProps.updateStatus(value, "status"));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusSelectionComponent);
