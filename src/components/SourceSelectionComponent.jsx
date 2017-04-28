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

    componentDidMount() {
        this.props.fetchSources();
    }

    render() {
        const {sources, updateSelectedSource, selectedSource} = this.props;
        console.log("source selectection component", sources);
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
    return {
        sources: state.sources.sources,
        selectedSource: ownProps.source
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
