"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import DropdownDisplay from "./DropdownDisplayComponent";
import RaisedButton from "material-ui/RaisedButton";
import {Row, Col} from "react-flexbox-grid";
import {deleteSources, fetchSources} from "./../actions/SourceActions";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from "material-ui/TextField";

class SourceSelectionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            name: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        const {selectedSource, updateSelectedSource} = this.props;
        if (!nextProps.selectedSource && (nextProps.sources.length || selectedSource !== nextProps.selectedSource)) {
            updateSelectedSource(null, null, nextProps.sources[0].id);
        }
    }

    componentWillMount() {
        this.props.fetchSources();
        const {selectedSource, updateSelectedSource, sources} = this.props;
        if (!selectedSource && sources.length) {
            setTimeout(() => updateSelectedSource(null, null, sources[0].id), 0);
        }
    }

    componentWillUnmount() {
        this.props.deleteSources();
    }

    render() {
        const {sources, updateSelectedSource, selectedSource} = this.props;
        return (
            <div>
                {sources.length ?
                    <Col xs={8} sm={6}>
                        <DropdownDisplay menuItems={sources} value={selectedSource}
                                         onChange={updateSelectedSource.bind(this)}/>
                    </Col>
                    :
                    null
                }
            </div>
        );
    }
}

SourceSelectionComponent.propTypes = {
    sources: PropTypes.array,
    actionOnUpdate: PropTypes.func.isRequired,
    source: PropTypes.string,
    fetchSources: PropTypes.func,
    deleteSources: PropTypes.func,
    updateSelectedSource: PropTypes.func,
    selectedSource: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
    const selectedSource = ownProps.source ? ownProps.source : state.theory.sources.length ? state.theory.sources[0] : "";
    return {
        sources: state.sources.sources,
        selectedSource
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchSources: () => {
            dispatch(fetchSources());
        },

        deleteSources: () => {
            dispatch(deleteSources());
        },

        updateSelectedSource: (event, index, value) => {
            dispatch(ownProps.actionOnUpdate(value));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SourceSelectionComponent);
