/* ----------------------------------------------------
React.js / Tasks page component

Updated: 03/13/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, {Component} from 'react';

import Modal from '../components/Modal/Modal';
import AuthContext from '../context/auth-context';
import './Tasks.css';
import { canNotDefineSchemaWithinExtensionMessage } from 'graphql/validation/rules/LoneSchemaDefinition';


class TasksPage extends Component {
    state = {
        creating: false,
        tasks: []
    };

    static contextType = AuthContext; 

    constructor(props){
        super(props);
        this.titleElRef = React.createRef();
        this.priceElRef = React.createRef();
        this.dateElRef = React.createRef();
        this.descriptionElRef = React.createRef();
    }
    // componentDidMount() executes when the page loads = 
    // is invoked immediately after a component is mounted (inserted into the tree). 

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
        if (title.trim().length === 0 || 
            price <= 0 || 
            date.trim().length === 0 || 
            description.trim().length === 0) {
            return;
        }
        // the task is an object with properties title: title, price: price, etc.
        const task = {title, price, date, description};
       
        const requestBody = {
                query:`
                mutation {
                    createTask(taskInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
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
            
       const token = this.context.token;    

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('it is Failed ');
            }
            return res.json();
        })
        .then(resData => {
            this.fetchTasks();
        })
        .catch(err => {
            console.log(err);
        }); 
    };

        modalCancelHandler = () => {
        this.setState({creating: false});
    };

        fetchTasks() {
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
        
         const token = this.context.token;    

    fetch('http://localhost:8000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (res.status !== 200 && res.status !== 201) {
            throw new Error('it is Failed ');
        }
        return res.json();
    })
    .then(resData => {
        const tasks = resData.data.tasks;
        this.setState({tasks: tasks});
    })
    .catch(err => {
        console.log(err);
    }); 
    };

    render() {
        // to prepare tasks list to render on the page.
       /* const tasksList = this.state.tasks.map(task => {
            return <li key={task._id} className="tasks__list-item">{task.title}</li>
        });
 */
        return (
            <React.Fragment>
                {this.state.creating &&
                <Modal title="add task" canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}> 
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
                {this.context.token &&
                <div className="tasks-control">
                    <button className="btn" onClick={this.startCreateTaskHandler}>create task</button>
                </div>}
                <ul className="tasks__list">
                    {this.state.tasks.map(task => {
                         return <li key={task._id} className="tasks__list-item">{task.title}</li>
                     })}
                </ul>
            </React.Fragment>
        );
    }
};
 
 
export default TasksPage;