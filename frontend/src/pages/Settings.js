/* ----------------------------------------------------
React.js / Settings page component

Updated: 06/11/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, {Component} from 'react';
import AuthContext from '../context/auth-context';

// Material-UI components (https://material-ui.com/).
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';


// Style for Material-UI components
const styles = (theme) => ({
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
        }},
        spinner: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: theme.spacing(10)
        },
        paper: {
            padding: theme.spacing(2.5)
        }
});

class SettingsPage extends Component {
    state = {
        isLoading: false
    };
    static contextType = AuthContext;

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline/>
                <Container maxWidth="md">
                    <Typography component="h1" variant="h4" color="primary" gutterBottom>
                        Settings
                    </Typography>
                    {this.state.isLoading
                        ? <div className={classes.spinner}>
                                <CircularProgress color="secondary"/>
                            </div>
                        : <Paper className={classes.paper}>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Profile
                            </Typography>
                            <Typography gutterBottom>
                                Email
                            </Typography> 
                        </Paper>}
                </Container>
            </div>
        )
    };
}
export default withStyles(styles)(SettingsPage);