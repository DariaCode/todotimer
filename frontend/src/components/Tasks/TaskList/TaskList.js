import React from 'react';

import TaskItem from './TasksItem/TaskItem';
import './TaskList.css';

const taskList = props => {
    const tasks = props.tasks.map(task => {
        return (
            <TaskItem key={task._id} 
            taskId={task._id} 
            title={task.title}
            price={task.price}
            date={task.date}
            userId={props.authUserId}
            creatorId={task.creator._id}
            onDetail={props.onViewDetail} />
        )
    });

    return (<ul className="task__list">
        {tasks}
    </ul>)
};
 
export default taskList;