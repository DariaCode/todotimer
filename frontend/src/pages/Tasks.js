/* ----------------------------------------------------
React.js / Tasks page component

Updated: 03/13/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, {Component, useState} from 'react';

import Modal from '../components/Modal/Modal';
import AuthContext from '../context/auth-context';
import TaskList from '../components/Tasks/TaskList/TaskList';
import Spinner from '../components/Spinner/Spinner';
import AddTask from '../components/Tasks/AddTask/AddTask';
import SimplePopover from '../components/Popover/Popover';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import './Tasks.css';
import {timingSafeEqual} from 'crypto';

class TasksPage extends Component {
    state = {
        creating: false,
        updating: false,
        tasks: [],
        isLoading: false,
        selectedTask: null,
        updatedTask: null
    };

    isActive = true;

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.titleElRef = React.createRef();
        this.priorityElRef = React.createRef();
        this.dateElRef = React.createRef();
        this.descriptionElRef = React.createRef();
    }

    // componentDidMount() executes when the page loads = is invoked immediately
    // after a component is mounted (inserted into the tree).
    componentDidMount() {
        this.fetchTasks();
    };

    startCreateTaskHandler = () => {
        this.setState({creating: true});
    };

    modalConfirmHandler = () => {
        this.setState({creating: false});
        const title = this.titleElRef.current.value;
        const priority = +this.priorityElRef.current.value;
        const date = this.dateElRef.current.value;
        const description = this.descriptionElRef.current.value;
        // to check input data isn't empty.
        if (title.trim().length === 0 || priority <= 0 || date.trim().length === 0 || description.trim().length === 0) {
            return;
        }
        // the task is an object with properties title: title, priority: priority, etc.
        const task = {
            title,
            priority,
            date,
            description
        };

        const requestBody = {
            query: `
                mutation CreateTask($title: String!, $desc: String!, $priority: Float!, $date: String!) {
                    createTask(taskInput: {title: $title, description: $desc, priority: $priority, date: $date}) {
                        _id
                        title
                        description
                        priority
                        date
                    }
                }
            `,
            variables: {
                title: title,
                desc: description,
                priority: priority,
                date: date
            }
        };

        const token = this.context.token;

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('it is Failed ');
            }
            return res.json();
        }).then(resData => {
            this.setState(prevState => {
                const updatedTasks = [...prevState.tasks];
                updatedTasks.push({
                    _id: resData.data.createTask._id,
                    title: resData.data.createTask.title,
                    description: resData.data.createTask.description,
                    priority: resData.data.createTask.priority,
                    date: resData.data.createTask.date,
                    creator: {
                        _id: this.context.userId
                    }
                });
                return {tasks: updatedTasks};
            });
        }).catch(err => {
            console.log(err);
        });
    };

    modalCancelHandler = () => {
        this.setState({creating: false, updating: false, selectedTask: null});
    };

    fetchTasks() {
        this.setState({isLoading: true});
        const requestBody = {
            query: `
            query {
                tasks {
                    _id
                    title
                    description
                    priority
                    date
                    creator {
                        _id
                        email
                    }
                }
            }
        `
        };

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('it is Failed ');
            }
            return res.json();
        }).then(resData => {
            const tasks = resData.data.tasks;
            if (this.isActive) {
                this.setState({tasks: tasks, isLoading: false});
            }
        }).catch(err => {
            console.log(err);
            this.setState({isLoading: false});
        });
    };

    showDetailHandler = taskId => {
        this.setState(prevState => {
            const selectedTask = prevState
                .tasks
                .find(e => e._id === taskId);
            return {selectedTask: selectedTask};
        })
    };

    sendTaskHandler = () => {
        if (!this.context.token) {
            this.setState({selectedTask: null});
            return;
        }
        const requestBody = {
            query: `
            mutation SendTask($id: ID!) {
                sendTask(taskId: $id) {
                    _id
                    createdAt
                    updatedAt
                }
            }
        `,
            variables: {
                id: this.state.selectedTask._id
            }
        };

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.context.token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('it is Failed ');
            }
            return res.json();
        }).then(resData => {
            console.log(resData);
            this.setState({selectedTask: null});
        }).catch(err => {
            console.log(err);
        });
    };

    startEditTaskHandler = taskId => {
        this.setState({updating: true, updatedTask: taskId});
    };

    editTaskHandler = () => {
        this.setState({updating: false});
        const taskId = this.state.updatedTask;
        const title = this.titleElRef.current.value;
        const priority = +this.priorityElRef.current.value;
        const date = this.dateElRef.current.value;
        const description = this.descriptionElRef.current.value;

        const requestBody = {
            query: `
                mutation EditTask($id: ID!, $title: String, $desc: String, $priority: Float, $date: String) {
                    updateTask(taskId: $id, taskInput: {title: $title, description: $desc, priority: $priority, date: $date}) {
                        _id
                        title
                        description
                        priority
                        date
                    }
                }
            `,
            variables: {
                id: taskId,
                title: title,
                desc: description,
                priority: priority,
                date: date
            }
        };

        const token = this.context.token;

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed ');
            }
            return res.json();
        }).then(resData => {
            this.setState(prevState => {
                const updatedTasks = [...prevState.tasks];
                const taskIndex = updatedTasks.findIndex((task => task._id === resData.data.updateTask._id));
                updatedTasks[taskIndex].title = resData.data.updateTask.title;
                updatedTasks[taskIndex].description = resData.data.updateTask.description;
                updatedTasks[taskIndex].priority = resData.data.updateTask.priority;
                updatedTasks[taskIndex].date = new Date(parseInt(resData.data.updateTask.date)).toISOString();
                return {tasks: updatedTasks, updatedTask: null};
            });
        }).catch(err => {
            console.log(err);
        });
    };

    deleteTaskHandler = taskId => {
        const requestBody = {
            query: `
            mutation DeleteTask($id: ID!) {
                deleteTask(taskId: $id) {
                    _id
                    title
                }
            }
        `,
            variables: {
                id: taskId
            }
        };

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.context.token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed ');
            }
            return res.json();
        }).then(resData => {
            this.setState(prevState => {
                const updatedTasks = prevState
                    .tasks
                    .filter(task => {
                        return task._id !== taskId;
                    });
                return {tasks: updatedTasks};
            });
        }).catch(err => {
            console.log(err);
            this.setState({isLoading: false});
        });
    };
    // componentWillUnmount() is invoked immediately before a component is unmounted
    // and destroyed. Perform any necessary cleanup in this method, such as
    // invalidating timers, canceling network requests, or cleaning up any
    // subscriptions that were created in componentDidMount().
    componentWillUnmount() {
        this.isActive = false;
    };

    render() {
        return (
            <React.Fragment>
                {this.state.updating && <Modal
                    title="add task"
                    canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.editTaskHandler}
                    confirmText="confirm">
                    <form>
                        <div className="form-control">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" ref={this.titleElRef}></input>
                        </div>
                        <div className="form-control">
                            <label htmlFor="priority">Price</label>
                            <select type="number" id="priority" ref={this.priorityElRef}>
                                <option value="0">Normal</option>
                                <option value="1">Low</option>
                                <option value="2">Medium</option>
                                <option value="3">High</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label htmlFor="date">Date</label>
                            <input type="datetime-local" id="date" ref={this.dateElRef}></input>
                        </div>
                        <div className="form-control">
                            <label htmlFor="description">Description</label>
                            <textarea rows="4" id="description" ref={this.descriptionElRef}></textarea>
                        </div>
                    </form>
                </Modal>}

                {this.context.token && (
                    <div className="addTask-control">
                        <button className="addTask-button" onClick={this.startCreateTaskHandler}>
                            <div className="formTask-control">
                                <label htmlFor="title">+</label>
                                <input type="text" id="title" ref={this.titleElRef} placeholder="Add task"></input>
                            </div>
                        </button>
                    </div>
                )}
                {this.state.creating && <AddTask
                    canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.modalConfirmHandler}
                    confirmText="confirm">
                    <form>
                        <SimplePopover
                        ref={this.priorityElRef} />
                        <div className="formTask-control">
                            <label htmlFor="date">Date</label>
                            <input type="datetime-local" id="date" ref={this.dateElRef}></input>
                        </div>
                        <div className="formTask-control">
                            <label htmlFor="description">Description</label>
                            <textarea rows="4" id="description" ref={this.descriptionElRef}></textarea>
                        </div>
                    </form>
                </AddTask>}

                {this.state.selectedTask && (
                    <Modal
                        title={this.state.selectedTask.title}
                        canCancel
                        canConfirm
                        onCancel={this.modalCancelHandler}
                        onConfirm={this.sendTaskHandler}
                        confirmText={this.context.token
                        ? "send"
                        : "confirm"}>
                        <h1>{this.state.selectedTask.title}</h1>
                        <h2>{this.state.selectedTask.price}
                            - {new Date(this.state.selectedTask.date).toLocaleDateString()}</h2>
                        <p>{this.state.selectedTask.description}</p>
                    </Modal>
                )}

                {this.state.isLoading
                    ? <Spinner/>
                    : <TaskList
                        tasks={this.state.tasks}
                        authUserId={this.context.userId}
                        onViewDetail={this.showDetailHandler}
                        onDeleteTask={this.deleteTaskHandler}
                        onEditTask={this.startEditTaskHandler}/>}
            </React.Fragment>
        );
    }
};

export default TasksPage;