"use strict";

import {connect} from "react-redux";
import React, {PropTypes} from "react";
import DropdownDisplay from "./DropdownDisplayComponent";
import {getSections as fetchSections, deleteSections} from "./../actions/SectionActions";

class SectionSelectionComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const {updateSelectedSection, courseId, getSections} = this.props;
        if (courseId !== nextProps.courseId) {
            updateSelectedSection(""); // reset section
            getSections({courseId: nextProps.courseId});
        }
    }

    componentDidMount() {
        const {courseId, getSections} = this.props;
        getSections({courseId: courseId});
    }

    componentWillUnmount() {
        this.props.updateSelectedSection("");
        this.props.deleteSections();
    }

    render() {
        const {sections, sectionId, onChange, width} = this.props;
        return (
            <DropdownDisplay menuItems={sections} value={sectionId} onChange={onChange.bind(this)} width={width}/>
        );
    }
}


SectionSelectionComponent.propTypes = {
    sections: PropTypes.array,
    sectionId: PropTypes.string.isRequired,
    updateSelectedSection: PropTypes.func,
    deleteSections: PropTypes.func,
    getSections: PropTypes.func,
    onChange: PropTypes.func,
    courseId: PropTypes.string,
    actionOnUpdate: PropTypes.func.isRequired,
    width: PropTypes.string || PropTypes.number
};

const mapStateToProps = (state, ownProps) => {
    return {
        courseId: state.ContentReducer.selectedCourse.id,
        sections: state.sections.sections,
        sectionId: ownProps.sectionId,
        width: ownProps.width
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (event, index, value) => {
            dispatch(ownProps.actionOnUpdate(value));
        },

        getSections: (params) => {
            dispatch(fetchSections(params));
        },

        updateSelectedSection: (newValue) => {
            dispatch(ownProps.actionOnUpdate(newValue));
        },

        deleteSections: () => {
            dispatch(deleteSections());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionSelectionComponent);
