/* ----------------------------------------------------
React.js / Main App.js

Updated: 03/17/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import HomePage from './pages/Home';
import AuthPage from './pages/Auth';
import SendingsPage from './pages/Sendings';
import TasksPage from './pages/Tasks';
import MainNavigation from './components/Navigation/MainNavigation';
import Sidebar from './components/Sidebar/Sidebar';
import AuthContext from './context/auth-context';

import './App.css';

class App extends Component {
    state = {
        token: null,
        userId: null
    }

    login = (token, userId) => {
        this.setState({token: token, userId: userId});
    }

    logout = () => {
        this.setState({token: null, userId: null});
    }

    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <AuthContext.Provider
                        value={{
                        token: this.state.token,
                        userId: this.state.userId,
                        login: this.login,
                        logout: this.logout
                    }}>
                        <MainNavigation />
                        <main className="main-content">
                            {this.state.token && <Sidebar />}
                            <Switch>
                                {this.state.token && <Redirect from="/" to="/tasks" exact/>}
                                {this.state.token && <Redirect from="/auth" to="/tasks" exact/>}
                                {!this.state.token && <Route path="/auth" component={AuthPage}/>}
                                <Route path="/tasks" component={TasksPage}/> 
                                {this.state.token && <Route path="/sendings" component={SendingsPage}/>}
                                {!this.state.token && <Redirect to="/auth" exact/>}
                            </Switch>
                        </main>
                    </AuthContext.Provider>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
