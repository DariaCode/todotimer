/* ----------------------------------------------------
React.js / Sidebar component

Updated: 05/08/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React from 'react';
import {NavLink} from 'react-router-dom';
import ListsContext from '../../context/lists-context';

// Material-UI components (https://material-ui.com/)
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

// Style for Material-UI components
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

// eslint-disable-next-line require-jsdoc
export default function Sidebar() {
  const classes = useStyles();
  const [selectedIndex,
    setSelectedIndex] = React.useState(0);

  const handleListItemClick = (_event, index) => {
    setSelectedIndex(index);
  };
  return (
    <ListsContext.Consumer>
      {(context) =>
        <div className={classes.root}>
          <CssBaseline />
          <List component="nav">
            <ListItem
              button
              key="All Task"
              component={NavLink} to="/tasks"
              selected={selectedIndex === 0}
              onClick={(event) => {
                context.setListsOption(0);
                handleListItemClick(event, 0);
              }}
            >
              <ListItemIcon>
                <InboxIcon/>
              </ListItemIcon>
              <ListItemText primary="All Tasks"/>
            </ListItem>
            <ListItem
              button
              key="Today"
              component={NavLink} to="/tasks"
              selected={selectedIndex === 1}
              onClick={(event) => {
                context.setListsOption(1);
                handleListItemClick(event, 1);
              }}
            >
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Today" />
            </ListItem>
            <ListItem
              button
              component={NavLink} to="/tasks"
              selected={selectedIndex === 2}
              onClick={(event) => {
                context.setListsOption(2);
                handleListItemClick(event, 2);
              }}
            >
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Next 7 Days" />
            </ListItem>
            <ListItem
              button
              component={NavLink} to="/statistics"
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
            >
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Statistics" />
            </ListItem>
            <ListItem
              button
              component={NavLink} to="/tasks"
              selected={selectedIndex === 4}
              onClick={(event) => {
                context.setListsOption(4);
                handleListItemClick(event, 4);
              }}
            >
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Completed" />
            </ListItem>
          </List>
        </div>}
    </ListsContext.Consumer>
  );
};
