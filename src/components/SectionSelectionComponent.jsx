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
        const {updateSelectedSection, courseId, getSections, filterString} = this.props;
        if (courseId !== nextProps.courseId) {
            updateSelectedSection(""); // reset section
            getSections({courseId: nextProps.courseId});
        }

        // if (!nextProps.sectionId && nextProps.sections.length) {
        //     updateSelectedSection(nextProps.sections[0].id); // select default value as first item
        // }
    }

    componentDidMount() {
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
        const {sections, sectionId, onChange} = this.props;
        return (
            <div>
                {sections.length ?
                    <DropdownDisplay
                        menuItems={sections}
                        value={sectionId}
                        onChange={onChange.bind(this)}/>
                    :
                    <h3>No sections</h3>}
            </div>
        );
    }
}

SectionSelectionComponent.defaultProps = {

};

SectionSelectionComponent.propTypes = {
    sections: PropTypes.array,
    sectionId: PropTypes.string.isRequired,
    updateSelectedSection: PropTypes.func,
    deleteSections: PropTypes.func,
    getSections: PropTypes.func,
    onChange: PropTypes.func,
    courseId: PropTypes.string,
    actionOnUpdate: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        courseId: state.ContentReducer.selectedCourse.id,
        sections: state.sections.sections,
        sectionId: ownProps.sectionId
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
