/* ----------------------------------------------------
React.js / Tasks page component

Updated: 03/13/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, {Component} from 'react';

import Modal from '../components/Modal/Modal';
import AuthContext from '../context/auth-context';
import TaskList from '../components/Tasks/TaskList/TaskList';
import Spinner from '../components/Spinner/Spinner';
import './Tasks.css';
import {canNotDefineSchemaWithinExtensionMessage} from 'graphql/validation/rules/LoneSchemaDefinition';

class TasksPage extends Component {
    state = {
        creating: false,
        tasks: [],
        isLoading: false,
        selectedTask: null
    };

    isActive = true;

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.titleElRef = React.createRef();
        this.priceElRef = React.createRef();
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
        const price = +this.priceElRef.current.value;
        const date = this.dateElRef.current.value;
        const description = this.descriptionElRef.current.value;
        // to check input data isn't empty.
        if (title.trim().length === 0 || price <= 0 || date.trim().length === 0 || description.trim().length === 0) {
            return;
        }
        // the task is an object with properties title: title, price: price, etc.
        const task = {
            title,
            price,
            date,
            description
        };

        const requestBody = {
            query: `
                mutation {
                    createTask(taskInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
                        _id
                        title
                        description
                        price
                        date
                    }
                }
            `
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
                    price: resData.data.createTask.price,
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
        this.setState({creating: false, selectedTask: null});
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
                    price
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
            this.setState({ selectedTask: null });
            return ;
        }
        const requestBody = {
            query: `
            mutation {
                sendTask(taskId: "${this.state.selectedTask._id}") {
                    _id
                    createdAt
                    updatedAt
                }
            }
        `
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
            this.setState({ selectedTask: null });
        }).catch(err => {
            console.log(err);
        }); 
    };
    // componentWillUnmount() is invoked immediately before a component 
    // is unmounted and destroyed. Perform any necessary cleanup 
    // in this method, such as invalidating timers, 
    // canceling network requests, or cleaning up any subscriptions 
    // that were created in componentDidMount().
    componentWillUnmount() {
        this.isActive = false;
    };

    render() {
        return (
            <React.Fragment>
                {this.state.creating && <Modal
                    title="add task"
                    canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.modalConfirmHandler}
                    confirmText="confirm">
                    <form>
                        <div className="form-control">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" ref={this.titleElRef}></input>
                        </div>
                        <div className="form-control">
                            <label htmlFor="price">Price</label>
                            <input type="number" id="price" ref={this.priceElRef}></input>
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
                    <div className="tasks-control">
                        <button className="btn" onClick={this.startCreateTaskHandler}>create task</button>
                    </div>
                )}

                {this.state.selectedTask && (
                    <Modal
                        title={this.state.selectedTask.title}
                        canCancel
                        canConfirm
                        onCancel={this.modalCancelHandler}
                        onConfirm={this.sendTaskHandler}
                        confirmText={this.context.token? "send" : "confirm"}>
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
                        onViewDetail={this.showDetailHandler}/>}
            </React.Fragment>
        );
    }
};

export default TasksPage;