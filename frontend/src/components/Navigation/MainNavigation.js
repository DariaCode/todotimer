/* ----------------------------------------------------
React.js / Navigation component

Updated: 03/13/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';

import './MainNavigation.css';

const mainNavigation = props => {
    return (
        <AuthContext.Consumer>
            {context => {
                return (
                <header className="main-navigation">
                    <div className="main-navigation__logo">
                        <h1>Todo List</h1>
                    </div>
                    <div className="main-navigation__items">
                        <ul> 
                            {!context.token && (
                            <li>
                                <NavLink to="/auth">Authenticate</NavLink>
                            </li>
                            )}
                            <li><NavLink to="/tasks">Tasks</NavLink></li>
                            {context.token && (
                                <React.Fragment>
                                <li>
                                    <NavLink to="/Sendings">Sendings</NavLink>
                                </li>
                                <li>
                                    <button onClick={context.logout}>Logout</button>
                                </li>
                                </React.Fragment>
                            )}
                        </ul>
                    </div>
                </header>
                );
        }}
    </AuthContext.Consumer> )
}
 
export default mainNavigation;