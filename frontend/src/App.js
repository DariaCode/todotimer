/* ----------------------------------------------------
React.js

Updated: 03/13/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import AuthPage from './pages/Auth';
import SendingsPage from './pages/Sendings';
import TasksPage from './pages/Tasks';

import './App.css';

class App extends Component {
  render() {
    return (
    <BrowserRouter> 
      <Switch> 
        <Redirect from = "/" to = "/auth" exact /> 
        <Route path = "/auth" component = {AuthPage} />
        <Route path = "/tasks" component = {TasksPage} /> 
        <Route path = "/sendings" component = {SendingsPage} /> 
      </Switch> 
    </BrowserRouter>
    );
 }
}

export default App;


