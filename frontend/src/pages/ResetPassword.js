/* eslint-disable require-jsdoc */
/* ----------------------------------------------------
React.js / Reset Password page component

Updated: 05/09/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, {Component} from 'react';
import { Link } from 'react-router-dom'

// Material-UI components (https://material-ui.com/)
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Style for Material-UI components
const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '92vh',
  },
  paper: {
    marginTop: theme.spacing(14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  text: {
    paddingTop: theme.spacing(5.5),
    paddingBottom: theme.spacing(5.5)
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  }
});

class ResetPasswordPage extends Component {
  state = {
    isSent: true
}
  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
}
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline/>
        <Container component="main" maxWidth="xs">
          {/* component="main"- default is "div" */}
          <div className={classes.paper}>
            {/* CHANGE THE AVATAR FOR THE LOGO ICON!!! */}
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon/>
            </Avatar>
            {!this.state.isSent?
            <form className={classes.form} onSubmit={this.submitHandler}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                inputRef={this.emailEl}/>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}>
                Reset Password
              </Button>
            </form>:
          <div>
          <Typography 
            component="h2" 
            variant="h5" 
            color="primary" 
            className={classes.text}
            gutterBottom>
            An email with further instructions has been sent to EMAIL. Please check.
            </Typography>
            <Button 
            variant="outlined" 
            color="primary"
            fullWidth 
            className={classes.submit}>
              <Link className={classes.link} to='/'>Go to Homepage</Link>
            </Button>
          </div>}
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(ResetPasswordPage);
