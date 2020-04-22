/* ----------------------------------------------------
React.js / Lists component

Updated: 04/17/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React from 'react';

import DayList from './DayList';
import './TaskList.css';

const lists = props => {
    const lists = props.tasks.reduce((lists,task) => {
        let date = task.date.split('T')[0];
        const today = new Date().toISOString().split('T')[0];
        const withoutDate = new Date("1970-01-01").toISOString().split('T')[0]
        if(date < today && date !== withoutDate){
            date = new Date("2000-01-01").toISOString().split('T')[0];
        } 
        if(!lists[date]) {
            lists[date] = [];
        }
        lists[date].push(task);
        return lists;
    }, {});
    const listsGroups = Object.keys(lists).map((date) => {
        return {
            date,
            tasks: lists[date]
        }
    });
    const sortedLists = listsGroups.sort(function compare(a, b) {
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        return dateA - dateB;
      });
    console.log(listsGroups);
    const listsPerDays = sortedLists.map(task => {
        return (
            <DayList
            date={task.date} 
            tasks={task.tasks}
            authUserId={props.authUserIdMain}
            onViewDetail={props.onViewDetailMain}
            onDeleteTask={props.onDeleteTaskMain}
            onEditTask={props.onEditTaskMain}
            onCompleteTask={props.onCompleteTaskMain} />
            )
    });
    return (<ul className="task__list">
        {listsPerDays}
    </ul>)
};

 
export default lists;