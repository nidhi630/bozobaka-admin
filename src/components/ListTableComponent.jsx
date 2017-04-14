"use strict";

import React, {PropTypes} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import Loader from "./LoaderComponent";

const ListTableComponent = ({headerColumns, tableRows, isLoading}) => {
    if (isLoading) {
        return <Loader isLoading={isLoading}/>;
    }
    return (
        <Table fixedHeader={false} fixedFooter={false} selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                <TableRow>
                    {headerColumns.map((col, index) => (
                        <TableHeaderColumn key={index}>{col.displayName}</TableHeaderColumn>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {tableRows.map((row, index) => (
                    <TableRow key={index}>
                        {headerColumns.map((col, colIndex) => (
                            <TableRowColumn key={colIndex}>{row[col.key]}</TableRowColumn>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

ListTableComponent.defaultProps = {
    tableRows: []
};

ListTableComponent.propTypes = {
    headerColumns: PropTypes.array.isRequired,
    tableRows: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default ListTableComponent;

