import React from 'react';

import './TaskItem.css';

const taskItem = props => {
    return (
        <li key={props.taskId} className="task__list-item">
            <div>
                <h1>{props.title}</h1>
                <h2>${props.price}
                    - {new Date(props.date).toLocaleDateString()}</h2>
            </div>
            <div>
                {props.userId === props.creatorId
                    ? <div>
                            <button
                                className="btn"
                                onClick={props
                                .onDelete
                                .bind(this, props.taskId)}>Delete</button>
                            <button
                                className="btn"
                                onClick={props
                                .onEdit
                                .bind(this, props.taskId)}>Edit</button>
                        </div>
                    : <button
                        className="btn"
                        onClick={props
                        .onDetail
                        .bind(this, props.taskId)}>View Details</button>}
            </div>
        </li>
    );
};

export default taskItem;