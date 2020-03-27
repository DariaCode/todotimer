import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {ReactComponent as NormalIcon} from '../../AddTask/Popper/PriorityIcons/normal.svg';
import {ReactComponent as MediumIcon} from '../../AddTask/Popper/PriorityIcons/medium.svg';
import {ReactComponent as LowIcon} from '../../AddTask/Popper/PriorityIcons/low.svg';
import {ReactComponent as HighIcon} from '../../AddTask/Popper/PriorityIcons/high.svg';

import './TaskItem.css';

const TaskItem = props => {
    const [anchorEl,
        setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
let date =props.date;
console.log(date);
var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

    let priority = props.priority;
    let currentIcon;
    switch (priority) {
        case 2:
            currentIcon = <LowIcon/>;
            break;
        case 3:
            currentIcon = <MediumIcon/>;
            break;
        case 4:
            currentIcon = <HighIcon/>;
            break;
        default:
            currentIcon = <NormalIcon/>;
    }

    return (
        <li key={props.taskId} className="task__list-item">
            <div>
                <h1>{props.title} {currentIcon}</h1>
                <h2>{props.date !='1970-01-01T00:00:02.000Z'? new Date(props.date).toLocaleDateString("en-US", options): ''}</h2>
            </div>
            <div>
                {props.userId === props.creatorId
                    ? <div>
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClick}>
                                <MoreVertIcon/>
                            </IconButton>
                            <Menu
                                id="long-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                style: {
                                    maxHeight: 48* 4.5,
                                    width: '20ch'
                                }
                            }}>
                                <MenuItem key="edit"  onClick={props
                                .onEdit
                                .bind(this, props.taskId)}>
                                   <EditOutlinedIcon /> Edit
                                </MenuItem>
                                <MenuItem key="delete"  onClick={props
                                .onDelete
                                .bind(this, props.taskId)}>
                                    <DeleteOutlineIcon /> Delete
                                </MenuItem>
                            </Menu>
                        </div>
                    : <button
                        className="btn"
                        onClick={props
                        .onDetail
                        .bind(this, props.taskId)}>View Details</button>}
            </div>
        </li>
    );
};

export default TaskItem;