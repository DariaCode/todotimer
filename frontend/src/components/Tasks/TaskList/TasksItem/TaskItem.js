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
                    ? <botton
                            className="btn"
                            onClick={props
                            .onDelete
                            .bind(this, props.taskId)}>Cancel</botton>
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