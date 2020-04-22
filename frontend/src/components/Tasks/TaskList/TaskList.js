import React from 'react';

import TaskItem from './TasksItem/TaskItem';
import './TaskList.css';

const taskList = props => {
    console.log(props.tasks);
    const tasks = props.tasks.map(task => {
        return (
            <TaskItem key={task._id} 
            taskId={task._id} 
            title={task.title}
            priority={task.priority}
            date={task.date}
            complete={task.complete}
            userId={props.authUserId}
            creatorId={task.creator._id}
            onDetail={props.onViewDetail}
            onDelete={props.onDeleteTask}
            onEdit={props.onEditTask}
            onComplete={props.onCompleteTask} />
        )
    });

    return (<ul className="task__list">
        {tasks}
    </ul>)
};
 
export default taskList;