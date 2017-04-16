"use strict";

import React, {PropTypes} from "react";
import {Row, Col} from "react-flexbox-grid";
import ListTableComponent from "./ListTableComponent";

export default class ListTheoryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.headerColumns = [{
            displayName: "ID",
            key: "id"
        }, {
            displayName: "Theory",
            key: "heading"
        }, {
            displayName: "Status",
            key: "status"
        }, {
            displayName: "Section",
            key: "sectionId"
        }, {
            displayName: "L1",
            key: "l1Id"
        }, {
            displayName: "L2",
            key: "l2Id"
        }, {
            displayName: "Source",
            key: "source"
        }, {
            displayName: "Created",
            key: "created"
        }];
    }

    componentWillReceiveProps(nextProps) {
        const {courseId, fetchTheories} = this.props;
        if (courseId !== nextProps.courseId) {
            fetchTheories();
        }
    }

    componentWillMount() {
        this.props.fetchTheories();
    }

    render() {
        const {theories, isLoading, fetchTheories} = this.props;
        return (
            <div>
                <br/>
                <Row>
                    <Col xs={12}>
                        <h1>List Of Theory</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <ListTableComponent headerColumns={this.headerColumns} tableRows={theories}
                                            isLoading={isLoading} onFilterChange={fetchTheories.bind(this)}
                                            usage="theory"/>
                    </Col>
                </Row>
            </div>
        );
    }
}

ListTheoryComponent.propTypes = {
    theories: PropTypes.array.isRequired,
    fetchTheories: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    courseId: PropTypes.string.isRequired
};
