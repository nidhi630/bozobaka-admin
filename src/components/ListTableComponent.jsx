"use strict";

import React, {PropTypes} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import Loader from "./LoaderComponent";
import FilterComponent from "./FilterComponent";

const ListTableComponent = ({headerColumns, tableRows, isLoading, onFilterChange, usage, onCellClick}) => {
    return (
        <Table fixedHeader={false} fixedFooter={false} onCellClick={onCellClick.bind(this)}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                <TableRow>
                    {headerColumns.map((col, index) => (
                        <TableHeaderColumn key={index}>{col.displayName}</TableHeaderColumn>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                <FilterComponent onChangeAction={onFilterChange} usage={usage}/>
                {isLoading ?
                    <Loader isLoading={isLoading}/>
                    :
                    tableRows.map((row, index) => (
                        <TableRow key={index}>
                            {headerColumns.map((col, colIndex) => {
                                switch (col.key) {
                                    case "l1Id":
                                        return <TableRowColumn key={colIndex}>{row.l1.name}</TableRowColumn>;
                                    case "l2Id":
                                        return <TableRowColumn key={colIndex}>{row.l2.name}</TableRowColumn>;
                                    default:
                                        return <TableRowColumn key={colIndex}>{row[col.key]}</TableRowColumn>;
                                }
                            })}
                        </TableRow>
                    ))
                }
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
    isLoading: PropTypes.bool.isRequired,
    onFilterChange: PropTypes.func,
    usage: PropTypes.string,
    onCellClick: PropTypes.func
};

export default ListTableComponent;

