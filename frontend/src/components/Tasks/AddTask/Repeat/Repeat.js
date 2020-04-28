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
    const [selectedEndDate,
        setSelectedEndDate] = React.useState(new Date().toISOString());
    const [anchorEl,
        setAnchorEl] = React.useState(null);
    const [dateArray,
        setDateArray] = React.useState();
    console.log(dateArray);
    const [frequencyK,
        setFrequencyK] = React.useState(1);
    const [frequencyN,
        setFrequencyN] = React.useState();

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
        var dateArr = [selectedStartDate, selectedEndDate, 1, "day"];
        setDateArray(dateArr);
        setAnchorEl(anchorEl
            ? null
            : date.currentTarget);
    };

    const handleWeekly = date => {
        var dateArr = [selectedStartDate, selectedEndDate, 1, "week"];
        setDateArray(dateArr);
        setAnchorEl(anchorEl
            ? null
            : date.currentTarget);
    };

    const handleMonthly = date => {
        var dateArr = [selectedStartDate, selectedEndDate, 1, "month"];
        setDateArray(dateArr);
        setAnchorEl(anchorEl
            ? null
            : date.currentTarget);
    };

    const handleYearly = date => {
        var dateArr = [selectedStartDate, selectedEndDate, 1, "year"];
        setDateArray(dateArr);
        setAnchorEl(anchorEl
            ? null
            : date.currentTarget);
    };

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
        dateArr= new Array(selectedStartDate, selectedEndDate, frequencyK, frequencyN);
        console.log("new dateArray:", dateArr)
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
                            <MenuItem value={"day"}>Day</MenuItem>
                            <MenuItem value={"week"}>Week</MenuItem>
                            <MenuItem value={"month"}>Month</MenuItem>
                            <MenuItem value={"year"}>Year</MenuItem>
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