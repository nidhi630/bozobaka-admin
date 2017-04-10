"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import DropdownDisplay from "./DropdownDisplayComponent";

class L1SelectionComponent extends React.Component {

    static propTypes() {

    }

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const {l1Id, onChange} = this.props;
        if (nextProps.l1s.length) {
            if (!nextProps.l1Id || l1Id !== nextProps.l1Id) {
                setTimeout(() => onChange(null, null, nextProps.l1s[0].id), 0);
            }
        }
    }

    componentWillMount() {

    }

    render() {
        const {l1Id, l1s, onChange, sectionId} = this.props;
        let menuItems = l1s.filter((l1) => (l1.sectionId === sectionId));
        return (
            <DropdownDisplay onChange={onChange.bind(this)} menuItems={menuItems} value={l1Id} width="100%"/>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        l1s: state.l1s,
        sectionId: ownProps.sectionId,
        l1Id: ownProps.l1Id
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (event, index, value) => {
            dispatch(ownProps.updateL1(value));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(L1SelectionComponent);