"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import DropdownDisplay from "./DropdownDisplayComponent";

class L2SelectionComponent extends React.Component {

    static propTypes() {

    }

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const {l2Id, onChange} = this.props;
        if (nextProps.l2s.length) {
            if (!nextProps.l2Id || l2Id !== nextProps.l2Id) {
                setTimeout(() => onChange(null, null, nextProps.l2s[0].id), 0);
            }
        }
    }

    componentWillMount() {

    }

    render() {
        const {l2Id, l2s, onChange, l1Id} = this.props;
        let menuItems = l2s.filter((l2) => (l2.l1Id === l1Id));
        return (
            <DropdownDisplay onChange={onChange.bind(this)} menuItems={menuItems} value={l2Id} width="100%"/>
        );
    }
}

L2SelectionComponent.defaultProps = {
    l2Id: "",
    l1Id: ""
};

L2SelectionComponent.propTypes = {
    l2Id: PropTypes.string.isRequired,
    l1Id: PropTypes.string.isRequired,
    updateL2: PropTypes.func.isRequired,
    l2s: PropTypes.array,
    onChange: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
    return {
        l2s: state.sections.l2s,
        l1Id: ownProps.l1Id,
        l2Id: ownProps.l2Id
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (event, index, value) => {
            dispatch(ownProps.updateL2(value));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(L2SelectionComponent);