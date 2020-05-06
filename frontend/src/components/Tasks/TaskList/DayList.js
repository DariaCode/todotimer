/* ----------------------------------------------------
React.js / Day List component

Updated: 05/06/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */
import React from 'react';

// Material-UI components (https://material-ui.com/)
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import TaskItem from './TaskItem';

// Style for Material-UI components
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  title: {
    padding: theme.spacing(2, 1, 1, 1),
    color: 'action',
  },
}));

// eslint-disable-next-line require-jsdoc
export default function DayLists(props) {
  const classes = useStyles();
  const list = props.tasks.map((task) => {
    return (
      <TaskItem key={task._id}
        taskId={task._id}
        title={task.title}
        priority={task.priority}
        date={task.date}
        complete={task.complete}
        repeat={task.end}
        userId={props.authUserId}
        creatorId={task.creator._id}
        onDetail={props.onViewDetail}
        onDelete={props.onDeleteTask}
        onEdit={props.onEditTask}
        onComplete={props.onCompleteTask} />
    );
  });

  const today = new Date().toLocaleDateString();// toISOString().split('T')[0];
  const draftTomorrow = new Date(today);
  const formatTomorrow = draftTomorrow.setDate(draftTomorrow.getDate() + 1);
  const tomorrow = new Date(formatTomorrow).toLocaleDateString();// toISOString().split('T')[0];

  const options = {
    weekday: 'short',
    // year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const formatedDate = new Date(props.date).toLocaleDateString('en', options);

  let listTitle;

  switch (props.date) {
    case 'Overdue':
      listTitle = 'Overdue';
      break;
    case 'Complete':
      listTitle = 'Complete';
      break;
    case today:
      listTitle = 'Today';
      break;
    case tomorrow:
      listTitle = 'Tomorrow';
      break;
    case 'null':
      listTitle = ' ';
      break;
    default:
      listTitle = formatedDate;
  };

  return (
    <div>
      <List className={classes.root}>
        <Typography className={classes.title}>
          {listTitle}
        </Typography>
        {list}
      </List>
      <Divider />
    </div>);
};
