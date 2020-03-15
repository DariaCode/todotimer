/* ----------------------------------------------------
React.js / Tasks page component

Updated: 03/13/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, {Component} from 'react';

import Modal from '../components/Modal/Modal';
import './Tasks.css';

class TasksPage extends Component {
    state = {
        creating: false
    };

    startCreateTaskHandler = () => {
        this.setState({creating: true});
    };

    modalConfirmHandler = () => {
        this.setState({creating: false}); 
    };

    modalCancelHandler = () => {
        this.setState({creating: false});
    };

    render() {
        return (
            <React.Fragment>
                {this.state.creating &&
                <Modal title="add task" canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}> 
                    <p> Modal Content </p>
                </Modal>}
                <div className="tasks-control">
                    <button className="btn" onClick={this.startCreateTaskHandler}>create task</button>
                </div>
            </React.Fragment>
        );
    }
};
 
export default TasksPage;