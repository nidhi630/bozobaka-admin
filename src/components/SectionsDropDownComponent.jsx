"use strict";

import {connect} from "react-redux";
import React, {PropTypes} from "react";
import DropdownDisplay from "./DropdownDisplayComponent";
import {getSections, deleteSections} from "./../actions/SectionActions";
import {updateSection} from "./../actions/TheoryActions";

class SectionsDropDownComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const {updateSelectedSection, courseId, getSections} = this.props;
        if (courseId !== nextProps.courseId) {
            updateSelectedSection(""); // reset section
            getSections({courseId: nextProps.courseId});
        }

        if (!nextProps.selectedSection && nextProps.sections.length) {
            updateSelectedSection(nextProps.sections[0].id); // select default value as first item
        }
    }

    componentWillMount() {
        const {sections, courseId, getSections} = this.props;
        if (!sections.length) {
            getSections({courseId: courseId});
        }
    }

    componentWillUnmount() {
        this.props.updateSelectedSection("");
        this.props.deleteSections();
    }

    render() {
        const {sections, selectedSection, onChange} = this.props;
        return (
            <div>
                {sections.length ?
                    <DropdownDisplay
                        menuItems={sections}
                        value={selectedSection}
                        onChange={onChange.bind(this)}/>
                    :
                    <h3>No sections</h3>}
            </div>
        )
    }
}

SectionsDropDownComponent.propTypes = {};

const mapStateToProps = (state) => {
    return {
        courseId: state.ContentReducer.selectedCourse.id,
        sections: state.sections,
        selectedSection: state.newTheory.sectionId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (event, index, value) => {
            dispatch(updateSection(value));
        },

        getSections: (params) => {
            dispatch(getSections(params));
        },

        updateSelectedSection: (newValue) => {
            dispatch(updateSection(newValue));
        },

        deleteSections: () => {
            dispatch(deleteSections());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionsDropDownComponent);