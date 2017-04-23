"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import DropdownDisplay from "./DropdownDisplayComponent";

class L4SelectionComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {l4Id, l4s, onChange, l3Id} = this.props;
        let menuItems = l4s.filter((l4) => (l4.l3Id === l3Id));
        return (
            <DropdownDisplay onChange={onChange.bind(this)} menuItems={menuItems} value={l4Id} width="100%"/>
        );
    }
}

L4SelectionComponent.propTypes = {
    l3Id: PropTypes.string,
    l4s: PropTypes.array,
    l4Id: PropTypes.string,
    onChange: PropTypes.func,
    actionOnUpdate: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
    return {
        l4s: state.sections.l4s,
        l3Id: ownProps.l3Id,
        l4Id: ownProps.l4Id
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (event, index, value) => {
            dispatch(ownProps.actionOnUpdate(value));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(L4SelectionComponent);