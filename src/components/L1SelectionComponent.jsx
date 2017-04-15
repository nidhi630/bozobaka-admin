"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import DropdownDisplay from "./DropdownDisplayComponent";

class L1SelectionComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const {sectionId, onChange} = this.props;
        if (nextProps.l1s.length) {
            if (!nextProps.l1Id || sectionId !== nextProps.sectionId) {
                onChange(null, null, nextProps.l1s[0].id);
            }
        }
    }

    componentWillMount() {
        const {l1Id, sectionId, onChange, l1s} = this.props;
        if (!l1Id && sectionId && l1s.length) {
            onChange(null, null, l1s[0].id);
        }
    }

    render() {
        const {l1Id, l1s, onChange, sectionId} = this.props;
        let menuItems = l1s.filter((l1) => (l1.sectionId === sectionId));

        if (!menuItems.length) {
            return null;
        }
        return (
            <DropdownDisplay onChange={onChange.bind(this)} menuItems={menuItems} value={l1Id} width="100%"/>
        );
    }
}

L1SelectionComponent.propTypes = {
    l1Id: PropTypes.string.isRequired,
    l1s: PropTypes.array,
    onChange: PropTypes.func,
    sectionId: PropTypes.string.isRequired,
    actionOnUpdate: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        l1s: state.sections.l1s,
        sectionId: ownProps.sectionId,
        l1Id: ownProps.l1Id
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (event, index, value) => {
            dispatch(ownProps.actionOnUpdate(value));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(L1SelectionComponent);