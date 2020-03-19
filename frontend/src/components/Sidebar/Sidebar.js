/* ----------------------------------------------------
React.js / Sidebar component

Updated: 03/17/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React from 'react';
import {NavLink} from 'react-router-dom';
import AuthContext from '../../context/auth-context';

import './Sidebar.css';

const sidebar = props => {
    return (
        <AuthContext.Consumer>
            {context => {
                return (
                    <div className="main-sidebar">
                            <ul className="main-bar__items">
                                <li>
                                    <NavLink to="/tasks">All tasks</NavLink>
                                </li>
                                <li>Today</li>
                                <li>This week</li>
                                <li>
                                    <NavLink to="/sendings">Sendings</NavLink>
                                </li>
                                <li>Progress</li>
                                <li>Completed</li>
                            </ul>
                    </div>
                );
            }}
        </AuthContext.Consumer>
    )
}

export default sidebar;