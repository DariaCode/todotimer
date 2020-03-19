/* ----------------------------------------------------
React.js / Add task component

Updated: 03/19/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */
import React, {Component} from 'react';

import Modal from '../../Modal/Modal';
import AuthContext from '../../../context/auth-context';
import './AddTask.css';

class addTask extends Component {
    state = {
        reating: false
    }
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.titleElRef = React.createRef();
        this.priceElRef = React.createRef();
        this.dateElRef = React.createRef();
        this.descriptionElRef = React.createRef();
    }

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

        const requestBody = {
            query: `
                mutation CreateTask($title: String!, $desc: String!, $price: Float!, $date: String!) {
                    createTask(taskInput: {title: $title, description: $desc, price: $price, date: $date}) {
                        _id
                        title
                        description
                        price
                        date
                    }
                }
            `,
            variables: {
                title: title,
                desc: description,
                price: price,
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
            console.log(resData);
        }).catch(err => {
            console.log(err);
        });
    };

    modalCancelHandler = () => {
        this.setState({creating: false});
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
                    <div className="tasks-control-navigation">
                        <button className="btn_logout" onClick={this.startCreateTaskHandler}>+Add task</button>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default addTask;