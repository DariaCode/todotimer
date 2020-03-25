import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import {ReactComponent as NormalIcon} from './PriorityIcons/normal.svg';
import {ReactComponent as MediumIcon} from './PriorityIcons/medium.svg';
import {ReactComponent as LowIcon} from './PriorityIcons/low.svg';
import {ReactComponent as HighIcon} from './PriorityIcons/high.svg';

const PriorityPopper = React.forwardRef((props, ref) => {
    const [priority,
        setPriority] = React.useState('0');
    const [anchorEl,
        setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(anchorEl
            ? null
            : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open
        ? 'simple-popper'
        : undefined;

    const handleChange = event => {
        setPriority(event.target.value);
        setAnchorEl(anchorEl
            ? null
            : event.currentTarget);
    };

    let currentIcon;
    switch (priority) {
        case 1:
            currentIcon = <LowIcon/>;
            break;
        case 2:
            currentIcon = <MediumIcon/>;
            break;
        case 3:
            currentIcon = <HighIcon/>;
            break;
        default:
            currentIcon = <NormalIcon/>;
    }
    return (
        <div className="form-control">
            <input
                style={{
                display: "none"
            }}
                ref={ref}
                {...props}
                value={priority}></input>

            <IconButton aria-describedby={id} onClick={handleClick} value={priority}>{currentIcon}</IconButton>
            <Popper id={id} open={open} anchorEl={anchorEl}>
                <MenuItem value={0} onClick={handleChange}><NormalIcon/>Normal
                </MenuItem>
                <MenuItem value={1} onClick={handleChange}><LowIcon/>Low</MenuItem>
                <MenuItem value={2} onClick={handleChange}><MediumIcon/>Medium</MenuItem>
                <MenuItem value={3} onClick={handleChange}><HighIcon/>High</MenuItem>
            </Popper>
        </div>
    );
});

export default PriorityPopper;