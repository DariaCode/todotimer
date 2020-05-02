/* ----------------------------------------------------
React.js / Add task component

Updated: 03/19/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */
import React from 'react';

import './AddTask.css';

const addTask = (props) => {
  return (
    <div className="addTask">
      <section className="addTask__actions">
        {props.canConfirm && <button className="btn" onClick={props.onConfirm}>
          {props.confirmText}
        </button>}
        {props.canCancel && <button className="btn" onClick={props.onCancel}>
                    cancel
        </button>}
      </section>
      <section className="addTask__content">
        {props.children}
      </section>
    </div>
  );
};

export default addTask;
