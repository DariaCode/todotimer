/* ----------------------------------------------------
React.js / Statistics page component

Updated: 05/08/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, {Component} from 'react';
import AuthContext from '../context/auth-context';

// (http://recharts.org/).
import {
    PieChart,
    Pie,
    LabelList,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    AreaChart,
    Area,
    ResponsiveContainer
} from 'recharts';

// Material-UI components (https://material-ui.com/)
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// Style for Material-UI components
const styles = theme => ({
    root: {
        display: 'flex',
        paddingTop: '84px',
        paddingLeft: '220px',
        flexDirection: 'column',
        [
            theme
                .breakpoints
                .down('md')
        ]: {
            paddingTop: '1px',
            paddingLeft: '1px'
        }
    },
    paper: {
        padding: theme.spacing(1.5)
    },
    overview: {
      padding: theme.spacing(0.5, 0)
    }
});

const pieData = [
    {
        name: "completed",
        value: 16
    }, {
        name: "incompleted",
        value: 5
    }
];
const COLORS = ['#82b5f2', '#fd76a2'];

const barData = [
    {
        date: "01-04",
        comp: 4,
        incomp: 1,
        overdue: 0
    }, {
        date: "02-04",
        comp: 1,
        incomp: 4,
        overdue: 3
    }, {
        date: "03-04",
        comp: 4,
        incomp: 3,
        overdue: 4
    }, {
        date: "04-04",
        comp: 4,
        incomp: 2,
        overdue: 0
    }, {
        date: "05-04",
        comp: 4,
        incomp: 0,
        overdue: 1
    }, {
        date: "06-04",
        comp: 0,
        incomp: 4,
        overdue: 2
    }, {
        date: "07-04",
        comp: 7,
        incomp: 0,
        overdue: 4
    }
];
class StatisticsPage extends Component {
    state = {
        tasks: [],
        isLoading: false
    };

    static contextType = AuthContext;

    // componentDidMount() executes when the page loads = is invoked immediately
    // after a component is mounted (inserted into the tree).
    componentDidMount() {
        this.fetchTasks();
    };

    fetchTasks() {
        this.setState({isLoading: true});
        const requestBody = {
            query: `
        query {
            tasks {
                _id
                title
                priority
                date
                complete
                start
                end
                intervalK
                intervalN
                creator {
                    _id
                    email
                }
            }
        }
    `
        };

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.context.token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('it is Failed ');
            }
            return res.json();
        }).then(resData => {
            const tasks = resData
                .data
                .tasks
                .map(task => {
                    if (task.date === "1970-01-01T00:00:00.000Z") {
                        task.date = null;
                    } else {
                        task.date = new Date(task.date).toISOString();
                    }
                    return task;

                });

            console.log(tasks);
            if (this.isActive) {
                this.setState({tasks: tasks, isLoading: false});
            }
        }).catch(err => {
            console.log(err);
            this.setState({isLoading: false});
        });
    };
    // componentWillUnmount() is invoked immediately before a component is unmounted
    // and destroyed. Perform any necessary cleanup in this method, such as
    // invalidating timers, canceling network requests, or cleaning up any
    // subscriptions that were created in componentDidMount().
    componentWillUnmount() {
        this.isActive = false;
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline/>
                <Container maxWidth="md">
                    <Typography component="h1" variant="h4" color="primary" gutterBottom>
                        Statistics
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Overview
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid md={6} item xs={12} lg={6}>
                                        <Grid container>
                                            <Grid item sm={6} md={6} lg={6} className={classes.overview}>
                                                <Typography
                                                    component="h2"
                                                    variant="h4"
                                                    color="primary"
                                                    align="center"
                                                    gutterBottom>
                                                    20
                                                </Typography>
                                                <Typography
                                                    component="h2"
                                                    variant="h6"
                                                    color="disabled"
                                                    align="center"
                                                    gutterBottom>
                                                    Complete
                                                </Typography>
                                                <Divider variant="middle"/>
                                            </Grid>
                                            <Grid item sm={6} md={6} lg={6} className={classes.overview}>
                                                <Typography
                                                    component="h2"
                                                    variant="h4"
                                                    color="secondary"
                                                    align="center"
                                                    gutterBottom>
                                                    5
                                                </Typography>
                                                <Typography
                                                    component="h2"
                                                    variant="h6"
                                                    color="disabled"
                                                    align="center"
                                                    gutterBottom>
                                                    Incomplete
                                                </Typography>
                                                <Divider variant="middle"/>
                                            </Grid>
                                            <Grid item sm={6} md={6} lg={6} className={classes.overview}>
                                                <Typography
                                                    component="h2"
                                                    variant="h4"
                                                    color="secondary"
                                                    align="center"
                                                    gutterBottom>
                                                    4
                                                </Typography>
                                                <Typography
                                                    component="h2"
                                                    variant="h6"
                                                    color="disabled"
                                                    align="center"
                                                    gutterBottom>
                                                    Overdue
                                                </Typography>
                                            </Grid>
                                            <Grid item sm={6} md={6} lg={6} className={classes.overview}>
                                                <Typography
                                                    component="h2"
                                                    variant="h4"
                                                    color="primary"
                                                    align="center"
                                                    gutterBottom>
                                                    36
                                                </Typography>
                                                <Typography
                                                    component="h2"
                                                    variant="h6"
                                                    color="disabled"
                                                    align="center"
                                                    gutterBottom>
                                                    Total
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid md={6} item xs={12} lg={6}>
                                        <ResponsiveContainer width="100%" height={230}>
                                            <PieChart onMouseEnter={this.onPieEnter}>
                                                <Pie
                                                    data={pieData}
                                                    label
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    paddingAngle={5}>
                                                    {pieData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
                                                </Pie>
                                                <Legend/>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper className={classes.paper}>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Week Completion Rate
                                </Typography>
                                <ResponsiveContainer width="95%" height={280}>
                                    <BarChart
                                        data={barData}
                                        barGap={2}
                                        margin={{
                                        top: 30,
                                        right: 0,
                                        left: 5,
                                        bottom: 30
                                    }}
                                        barSize={30}>
                                        <XAxis
                                            dataKey="date"
                                            scale="point"
                                            padding={{
                                            left: 10,
                                            right: 10
                                        }}/>
                                        <YAxis label="%"/>
                                        <Tooltip/>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <Bar
                                            dataKey="comp"
                                            fill="#82b5f2"
                                            background={{
                                            fill: '#fd76a2'
                                        }}/>
                                    </BarChart>
                                </ResponsiveContainer>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper className={classes.paper}>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Week Completion Curve
                                </Typography>
                                <ResponsiveContainer width="95%" height={280}>
                                    <AreaChart
                                        data={barData}
                                        margin={{
                                        top: 30,
                                        right: 0,
                                        left: 5,
                                        bottom: 30
                                    }}>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                                        <XAxis dataKey="date"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Area
                                            type='monotoneX'
                                            dataKey="comp"
                                            stackId="1"
                                            stroke="#3B8BEB"
                                            fill="#3B8BEB"/>
                                        <Area
                                            type='monotoneX'
                                            dataKey="incomp"
                                            stackId="1"
                                            stroke="#FC3C7B"
                                            fill="#FC3C7B"/>
                                    </AreaChart>
                                </ResponsiveContainer>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    };
}
export default withStyles(styles)(StatisticsPage);