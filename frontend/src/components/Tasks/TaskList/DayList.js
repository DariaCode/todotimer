/* ----------------------------------------------------
React.js / DayList component

Updated: 04/17/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */
import React from 'react';

import TaskItem from './TasksItem/TaskItem';
import './TaskList.css';

const dayLists = props => {
    const list = props.tasks.map(task => {
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
    
    const today = new Date().toISOString().split('T')[0];
    const draftTomorrow = new Date(today);
    const formatTomorrow = draftTomorrow.setDate(draftTomorrow.getDate() + 1);
    const tomorrow = new Date(formatTomorrow).toISOString().split('T')[0];

    return (
    <ul className="task__list">
        {props.date === today? "Today" : props.date === tomorrow? "Tomorrow": props.date === "null" ? " ": props.date}
        {list}
    </ul>)
};
 
export default dayLists;