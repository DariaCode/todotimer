/* ----------------------------------------------------
React.js / Repeat Task component

Updated: 04/22/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import 'date-fns';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {ReactComponent as RepeatIcon} from './repeat.svg';

import './Repeat.css';

const repeatTask = React.forwardRef((props, ref) => {

    const [selectedStartDate,
        setSelectedStartDate] = React.useState(new Date().toISOString());
    console.log(selectedStartDate);
    const [selectedEndDate,
        setSelectedEndDate] = React.useState(new Date().toISOString());
    console.log(selectedEndDate);
    const [anchorEl,
        setAnchorEl] = React.useState(null);
    const [dateArray,
        setDateArray] = React.useState();
    console.log(dateArray);
    const [frequencyK,
        setFrequencyK] = React.useState(1);
    console.log(frequencyK);
    const [frequencyN,
        setFrequencyN] = React.useState();
    console.log(frequencyN);

    const handleClick = event => {
        setAnchorEl(anchorEl
            ? null
            : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open
        ? 'repeat-popper'
        : undefined;

    const handleStartDateChange = date => {
        let formatDate = new Date(date).toISOString();
        setSelectedStartDate(formatDate);
    }

    const handleEndDateChange = date => {
        let formatDate = new Date(date).toISOString();
        setSelectedEndDate(formatDate);
    }

    const handleDaily = date => {
        var dateArr = getDayArray(selectedStartDate, selectedEndDate, 1, 1);
        setDateArray(dateArr);
        setAnchorEl(anchorEl
            ? null
            : date.currentTarget);
    };

    const handleWeekly = date => {
        var dateArr = getDayArray(selectedStartDate, selectedEndDate, 1, 7);
        setDateArray(dateArr);
        setAnchorEl(anchorEl
            ? null
            : date.currentTarget);
    };

    const handleMonthly = date => {
        var dateArr = getMonthArray(selectedStartDate, selectedEndDate, 1);
        setDateArray(dateArr);
        setAnchorEl(anchorEl
            ? null
            : date.currentTarget);
    };

    const handleYearly = date => {
        var dateArr = getYearArray(selectedStartDate, selectedEndDate, 1);
        setDateArray(dateArr);
        setAnchorEl(anchorEl
            ? null
            : date.currentTarget);
    };

    var getDayArray = function (start, end, k, n) {
        var arr = [];
        var dt = new Date(start);
        var ed = new Date(end);
        while (dt <= ed) {
            arr.push(new Date(dt).toISOString());
            dt.setDate(dt.getDate() + (k * n));
        }
        return arr;
    }

    var getMonthArray = function (start, end, k) {
        var arr = new Array();
        var dt = new Date(start);
        var ed = new Date(end);
        while (dt <= ed) {
            arr.push(new Date(dt).toISOString());
            dt.setMonth(dt.getMonth() + k);
        }
        return arr;
    }

    var getYearArray = function (start, end, k) {
        var arr = new Array();
        var dt = new Date(start);
        var ed = new Date(end);
        while (dt <= ed) {
            arr.push(new Date(dt).toISOString());
            dt.setFullYear(dt.getFullYear() + k);
        }
        return arr;
    }

    const handleFrequencyK = event => {
        setDateArray([]);
        setFrequencyK( parseInt(event.target.value));
    }

    const handleFrequencyN = event => {
        setDateArray([]);
        setFrequencyN(event.target.value);
    }

    const handleClear = date => {
        setSelectedStartDate(undefined);
        setSelectedEndDate(undefined);
        setDateArray([]);
        setFrequencyK(1);
        setFrequencyN(undefined);
        setAnchorEl(anchorEl
            ? null
            : date.currentTarget);
    };
    const handleOk = date => {
        let dateArr;
        switch(frequencyN){
            case 30:
                dateArr = getMonthArray(selectedStartDate, selectedEndDate, frequencyK);
                break;
            case 360:
                dateArr = getYearArray(selectedStartDate, selectedEndDate, frequencyK);
                break;
            default:
                dateArr = getDayArray(selectedStartDate, selectedEndDate, frequencyK, frequencyN);    
        };

        setDateArray(dateArr);
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
                value={dateArray}></input>

            <IconButton
                aria-describedby={id}
                onClick={handleClick}
                value={selectedStartDate}><RepeatIcon/></IconButton>
            <Popper id={id} open={open} anchorEl={anchorEl} className="repeat-popper">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="Start"
                        format="MM/dd/yyyy"
                        margin="normal"
                        value={selectedStartDate}
                        InputAdornmentProps={{
                        position: "start"
                    }}
                        KeyboardButtonProps={{
                        'aria-label': 'change date'
                    }}
                        onChange={date => handleStartDateChange(date)}/>
                    <KeyboardDatePicker
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="End by"
                        format="MM/dd/yyyy"
                        value={selectedEndDate}
                        InputAdornmentProps={{
                        position: "start"
                    }}
                        onChange={date => handleEndDateChange(date)}/>

                    <Button variant="outlined" onClick={handleDaily} color="primary">Daily</Button>
                    <Button variant="outlined" onClick={handleWeekly} color="primary">Weekly</Button>
                    <Button variant="outlined" onClick={handleMonthly} color="primary">Monthly</Button>
                    <Button variant="outlined" onClick={handleYearly} color="primary">Yearly</Button>
                    <h5>Custom</h5>
                    <div>
                        <TextField
                            id="outlined-number"
                            label="Every"
                            type="number"
                            InputLabelProps={{
                            shrink: true
                        }}
                            defaultValue={frequencyK}
                            onClick
                            ={handleFrequencyK}
                            variant="outlined"/>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={frequencyN}
                            onChange={handleFrequencyN}
                            label="Set Repeat">
                            <MenuItem value={1}>Day</MenuItem>
                            <MenuItem value={7}>Week</MenuItem>
                            <MenuItem value={30}>Month</MenuItem>
                            <MenuItem value={360}>Year</MenuItem>
                        </Select>
                    </div>
                    <Button onClick={handleClear} variant="outlined" color="primary">Clear</Button>
                    <Button onClick={handleOk} variant="outlined" color="primary">Ok</Button>
                </MuiPickersUtilsProvider>
            </Popper>
        </div>
    );
});

export default repeatTask;