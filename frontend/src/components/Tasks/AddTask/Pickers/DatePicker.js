/* ----------------------------------------------------
React.js / Date Picker component

Updated: 04/17/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */
import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import DateFnsUtils from '@date-io/date-fns';
import {DatePicker} from "@material-ui/pickers";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {ReactComponent as CalendarIcon} from './calendar.svg';

import './DatePicker.css'

const datePicker = React.forwardRef((props, ref) => {
    const [selectedDate,
        setSelectedDate] = React.useState();
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

    const handleDateChange = date => {
        let formatDate = new Date(date).toISOString();
        setSelectedDate(formatDate);
    };

    const today = new Date().toISOString();
    const handleToday = () => {
        setSelectedDate(today);
    };

    const tomorrow = new Date(today);
    const formatTomorrow = tomorrow.setDate(tomorrow.getDate() + 1);
    const handleTomorrow = () => {
        setSelectedDate(new Date(formatTomorrow).toISOString());
    };


    const handleClear = date => {
        setSelectedDate(undefined);
        setAnchorEl(anchorEl
            ? null
            : date.currentTarget);
    };

    const handleOk = date => {
        setAnchorEl(anchorEl
            ? null
            : date.currentTarget);
    };

    return (
        <div className="form-control">
            <input
                style={{
                display: "none"
            }}
                ref={ref}
                {...props}
                value={selectedDate}></input>

            <IconButton aria-describedby={id} onClick={handleClick} value={selectedDate}><CalendarIcon/></IconButton>
            <Popper id={id} open={open} anchorEl={anchorEl} className="date-time-popper">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Button variant="outlined" onClick={handleToday} color="primary">Today</Button>
                    <Button variant="outlined" onClick={handleTomorrow} color="primary">Tomorrow</Button>
                    <DatePicker
                        disableToolbar
                        disablePast
                        variant="static"
                        orientation="portrait"
                        value={selectedDate}
                        onChange={handleDateChange}/>
                    <Button onClick={handleClear} variant="outlined" color="primary">Clear</Button>
                    <Button onClick={handleOk} variant="outlined" color="primary">Ok</Button>
                </MuiPickersUtilsProvider>
            </Popper>
        </div>
    );
});

export default datePicker;
