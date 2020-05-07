/* ----------------------------------------------------
React.js / Lists component

Updated: 05/06/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React from 'react';

import {formatISO, startOfToday} from 'date-fns';
import DayList from './DayList';

const lists = (props) => {
  const lists = props.tasks.reduce((lists, task) => {
    let date = task.date;
    const today = formatISO(new Date(startOfToday()), {representation: 'date'});
    if (task.complete) {
      date = 'Complete';
    }
    if (task.date < today && date !== null && date !== 'Complete') {
      date = 'Overdue';
    }
    if ( date !== null && date !== 'Overdue' && date !== 'Complete') {
      // To change dates to local time zone.
      const formatedDate = new Date(task.date).toLocaleDateString();
      date = formatedDate;// task.date.split('T')[0];
    }
    if (!lists[date]) {
      lists[date] = [];
    }
    lists[date].push(task);
    return lists;
  }, {});
  const listsGroups = Object.keys(lists).map((date) => {
    return {
      date,
      tasks: lists[date],
    };
  });

  let sortedLists =[];
  const withoutDate = listsGroups.find((list) => list.date === 'null');
  if (withoutDate) {
    sortedLists.push(withoutDate)
    ;
  };
  const overdueDate = listsGroups.find((list) => list.date === 'Overdue');
  if (overdueDate) {
    sortedLists.push(overdueDate)
    ;
  };
  const otherDate = listsGroups.filter((list) => list.date !== 'null' && list.date !== 'Overdue' && list.date !== 'Complete');
  otherDate.sort(function(a, b) {
    return new Date(a.date) - new Date(b.date);
  });
  if (otherDate) {
    sortedLists = sortedLists.concat(otherDate)
    ;
  };
  const completeDate = listsGroups.find((list) => list.date === 'Complete');
  if (completeDate) {
    sortedLists = sortedLists.concat(completeDate);
  };
  console.log(sortedLists);

  const listsPerDays = sortedLists.map((task) => {
    return (
      <DayList
        key={task._id}
        date={task.date}
        tasks={task.tasks}
        authUserId={props.authUserIdMain}
        onViewDetail={props.onViewDetailMain}
        onDeleteTask={props.onDeleteTaskMain}
        onEditTask={props.onEditTaskMain}
        onCompleteTask={props.onCompleteTaskMain} />
    );
  });
  return (<div>
    {listsPerDays}
  </div>);
};


export default lists;
