"use strict";

import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';

class SidebarComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.componentOptions = [
            {
                value: 'Dashboard',
                url: '/'
            }, {
                value: 'Add Question',
                url: '/add-question'
            }, {
                value: 'All Questions',
                url: '/all-questions'
            }, {
                value: 'Drafts',
                url: '/drafts'
            }, {
                value: 'Trash',
                url: '/trash'
            }, {
                value: 'Settings',
                url: '/settings'
            }
        ]
    }
    render() {
        return (
            <Drawer
                open={this.props.openNavigationDrawer}
                docked={false}
                onRequestChange={this.props.toggleDrawer}>
                {this.componentOptions.map(
                    (option) => (
                        <Link key={option.url} to={option.url}>
                            <MenuItem>{option.value}</MenuItem>
                        </Link>
                    )
                )}
            </Drawer>
        );
    }
}

export default SidebarComponent;