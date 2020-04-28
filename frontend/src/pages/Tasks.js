/* ----------------------------------------------------
React.js / Tasks page component

Updated: 04/17/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, {Component} from 'react';

import Modal from '../components/Modal/Modal';
import AuthContext from '../context/auth-context';
import Lists from '../components/Tasks/TaskList/Lists'
import Spinner from '../components/Spinner/Spinner';
import AddTask from '../components/Tasks/AddTask/AddTask';
import PriorityPopper from '../components/Tasks/AddTask/Popper/Popper';
import DatePicker from '../components/Tasks/AddTask/Pickers/DatePicker';
import RepeatTask from '../components/Tasks/AddTask/Repeat/Repeat'
import TextField from '@material-ui/core/TextField';

import './Tasks.css';


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
        this.dateRepeatElRef = React.createRef();
        this.completeElRef = React.createRef();
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
        let date = this.dateElRef.current.value;
        let dateRepeat = this.dateRepeatElRef.current.value.split(",");
        let start = null;
        let end = null;
        let intervalK = null;
        let intervalN = null;
        if(dateRepeat.length > 1){
            start = new Date(dateRepeat[0]).toISOString();
            end = new Date(dateRepeat[1]).toISOString();
            intervalK = parseInt(dateRepeat[2]);
            intervalN = dateRepeat[3];
            date = start;
        } 
        console.log(dateRepeat);
        // to check input some data isn't empty.
        // trim()-remove whitespace from both sides of a string.
        if (title.trim().length === 0 || priority <= 0 ) {
            return;
        };
        
        if (date.length === 0) {
            date = null;
        };

        // the task is an object with properties title: title, priority: priority, etc.
        const task = {
            title,
            priority,
            date,
            start,
            end,
            intervalK,
            intervalN
        };
        console.log("check if the task object is rigth: ", task)

        const requestBody = {
            query: `
                mutation CreateTask($title: String!, $priority: Float!, $date: String, $start: String, $end: String, $intervalK: Float, $intervalN: String) {
                    createTask(taskInput: {title: $title, priority: $priority, date: $date, complete: false, start: $start, end: $end, intervalK: $intervalK, intervalN: $intervalN}) {
                        _id
                        title
                        priority
                        date
                        complete
                        start
                        end
                        intervalK
                        intervalN
                    }
                }
            `,
            variables: {
                title: title,
                priority: priority,
                date: date,
                start: start,
                end: end,
                intervalK: intervalK,
                intervalN: intervalN
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
                console.log("resData after save: ", resData.data.createTask);
                updatedTasks.push({
                    _id: resData.data.createTask._id,
                    title: resData.data.createTask.title,
                    priority: resData.data.createTask.priority,
                    date: resData.data.createTask.date === "1970-01-01T00:00:00.000Z"? null:resData.data.createTask.date,
                    complete: resData.data.createTask.complete,
                    creator: {
                        _id: this.context.userId
                    }
                });
                return {tasks: updatedTasks};
            });
            this.titleElRef.current.value = '';
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
                    priority
                    date
                    complete
                    start
                    end
                    intervalK
                    intervalN
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
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.context.token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('it is Failed ');
            }
            return res.json();
        }).then(resData => {
            const tasks = resData.data.tasks.map(task => {
                if(task.date === "1970-01-01T00:00:00.000Z"){
                    task.date = null;
                } else{
                    task.date = new Date(task.date).toISOString();
                }
                return task;

            });
            console.log(tasks);
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

        const requestBody = {
            query: `
                mutation EditTask($id: ID!, $title: String, $priority: Float, $date: String) {
                    updateTask(taskId: $id, taskInput: {title: $title,  priority: $priority, date: $date}) {
                        _id
                        title
                        priority
                        date
                        complete
                    }
                }
            `,
            variables: {
                id: taskId,
                title: title,
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
                updatedTasks[taskIndex].priority = resData.data.updateTask.priority;
                updatedTasks[taskIndex].date = resData.data.updateTask.date;
                return {tasks: updatedTasks, updatedTask: null};
            });

        }).catch(err => {
            console.log(err);
        });
    };

    completeTaskHandler = taskId => {
        const requestBody = {
            query: `
                mutation CompleteTask($id: ID!) {
                    completeTask(taskId: $id) {
                        _id
                        title
                        priority
                        date
                        complete
                    }
                }
            `,
            variables: {
                id: taskId
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
                console.log(updatedTasks);
                const taskIndex = updatedTasks.findIndex((task => task._id === resData.data.completeTask._id));
                updatedTasks[taskIndex].date = new Date(parseInt(resData.data.completeTask.date)).toISOString();
                updatedTasks[taskIndex].complete = resData.data.completeTask.complete;
                return {tasks: updatedTasks};
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
                    </form>
                </Modal>}

                {this.context.token && (
                    <div className="addTask-control">
                        <button className="addTask-button" onClick={this.startCreateTaskHandler}>
                            <div className="formTask-control">
                                <TextField id="outlined-basic" label="Add task" variant="outlined" size="medium" multiline fullWidth inputRef={this.titleElRef} />
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
                        <div className="form-control-button">
                        <PriorityPopper
                        ref={this.priorityElRef} />
                        <DatePicker ref={this.dateElRef} />
                        <RepeatTask ref={this.dateRepeatElRef} />
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
                            - {this.state.selectedTask.date}</h2>
                    </Modal>
                )}

                {this.state.isLoading
                    ? <Spinner/>
                    : <Lists
                    tasks={this.state.tasks}
                    authUserIdMain={this.context.userId}
                    onViewDetailMain={this.showDetailHandler}
                    onDeleteTaskMain={this.deleteTaskHandler}
                    onEditTaskMain={this.startEditTaskHandler}
                    onCompleteTaskMain={this.completeTaskHandler} /> }   
            </React.Fragment>
        );
    }
};

export default TasksPage;