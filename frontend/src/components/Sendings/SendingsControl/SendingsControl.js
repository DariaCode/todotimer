import React from 'react';

import './SendingsControl.css';

const sendingsControl = props => {
    return (
        <div className="sendings-control">
            <button
                className={props.activeOutputType === 'list'
                ? 'active'
                : ''}
                onClick={props
                .onChange
                .bind(this, 'list')}>list</button>
            <button
                className={props.activeOutputType === 'chart'
                ? 'active'
                : ''}
                onClick={props
                .onChange
                .bind(this, 'chart')}>chart</button>
        </div>
    );
}

export default sendingsControl;