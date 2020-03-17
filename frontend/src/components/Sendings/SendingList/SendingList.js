import React from 'react';

import './SendingList.css';

const sendingList = props => {
    return (
        <ul className="sendings__list">
            {props
                .sendings
                .map(sending => {
                    return (
                        <li className="sendings__item" key={sending._id}>
                            <div className="sendings__item-date">
                                {sending.task.title}
                                - {new Date(sending.createdAt).toLocaleDateString()}
                            </div>
                            <div className="sendings__item-actions">
                                <button
                                    className="btn"
                                    onClick={props
                                    .onDelete
                                    .bind(this, sending._id)}>cancel</button>
                            </div>
                        </li>
                    );
                })}
        </ul>
    );
}

export default sendingList;