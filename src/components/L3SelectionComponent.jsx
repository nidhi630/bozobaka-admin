"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import DropdownDisplay from "./DropdownDisplayComponent";

class L3SelectionComponent extends React.Component {

    static propTypes() {

    }

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const {l3Id, onChange} = this.props;
        if (nextProps.l3s.length) {
            if (!nextProps.l3Id || l3Id !== nextProps.l3Id) {
                setTimeout(() => onChange(null, null, nextProps.l3s[0].id), 0);
            }
        }
    }

    componentWillMount() {

    }

    render() {
        const {l3Id, l3s, onChange, l2Id} = this.props;
        let menuItems = l3s.filter((l3) => (l3.l2Id === l2Id));
        return (
            <DropdownDisplay onChange={onChange.bind(this)} menuItems={menuItems} value={l3Id} width="100%"/>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        l3s: state.l3s,
        l2Id: ownProps.l2Id,
        l3Id: ownProps.l3Id
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (event, index, value) => {
            dispatch(ownProps.updateL3(value));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(L3SelectionComponent);