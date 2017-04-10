"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import DropdownDisplay from "./DropdownDisplayComponent";
import RaisedButton from "material-ui/RaisedButton";
import {Row, Col} from "react-flexbox-grid";
import {deleteSources, fetchSources} from "./../actions/SourceActions";

class SourceSelectionComponent extends React.Component {

    static propTypes() {

    }

    constructor(props) {
        super(props);
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
            <Row>
                {sources.length ?
                    <Col xs={8} sm={6}>
                        <DropdownDisplay menuItems={sources} value={selectedSource}
                                         onChange={updateSelectedSource.bind(this)}/>
                    </Col>
                    :
                    null
                }
                <Col xs={4} sm={6}>
                    <RaisedButton label="Add Source" primary={true}/>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    const selectedSource = state.newTheory.sources.length ? state.newTheory.sources[0] : "";
    return {
        sources: state.sources.sources,
        selectedSource
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    if (!ownProps.updateSource) {
        throw new Error("update source function as prop is required");
    }
    return {
        fetchSources: () => {
            dispatch(fetchSources());
        },

        deleteSources: () => {
            dispatch(deleteSources());
        },

        updateSelectedSource: (event, index, value) => {
            dispatch(ownProps.updateSource(value));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (SourceSelectionComponent);
