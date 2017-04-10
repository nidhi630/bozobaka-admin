"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import DropdownDisplay from "./DropdownDisplayComponent";

class L4SelectionComponent extends React.Component {

    static propTypes() {

    }

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const {l4Id, onChange} = this.props;
        if (nextProps.l4s.length) {
            if (!nextProps.l4Id || l4Id !== nextProps.l4Id) {
                setTimeout(() => onChange(null, null, nextProps.l4s[0].id), 0);
            }
        }
    }

    componentWillMount() {

    }

    render() {
        const {l4Id, l4s, onChange, l3Id} = this.props;
        let menuItems = l4s.filter((l4) => (l4.l3Id === l3Id));
        return (
            <DropdownDisplay onChange={onChange.bind(this)} menuItems={menuItems} value={l4Id} width="100%"/>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        l4s: state.l4s,
        l3Id: ownProps.l3Id,
        l4Id: ownProps.l4Id
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (event, index, value) => {
            dispatch(ownProps.updateL4(value));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(L4SelectionComponent);