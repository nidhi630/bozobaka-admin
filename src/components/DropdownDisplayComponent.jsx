"use strict";

import React, {PropTypes} from "react";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from 'material-ui/MenuItem';

const DropDownDisplayComponent = ({menuItems, value, onChange, disabled, width}) => {
    const style = {
        width: width ? width : 300
    };
    return (
        <DropDownMenu
            value={value}
            onChange={onChange.bind(this)}
            disabled={disabled}
            style={style}
            autoWidth={true}>
            {menuItems.map((item, index) => (
                <MenuItem value={item.id} primaryText={item.name} key={index}/>
            ))}
        </DropDownMenu>
    )
};

DropDownDisplayComponent.defaultProps = {
    disabled: false,
    value: ""
};

DropDownDisplayComponent.propTypes = {
    menuItems: PropTypes.array.isRequired,
    value: PropTypes.string || PropTypes.number,
    onChange: PropTypes.func.isRequired
};

export default DropDownDisplayComponent;