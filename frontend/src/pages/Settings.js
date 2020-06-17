/* ----------------------------------------------------
React.js / Settings page component

Updated: 06/11/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, { Component } from "react";
import AuthContext from "../context/auth-context";

// Material-UI components (https://material-ui.com/).
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Style for Material-UI components
const styles = theme => ({
  root: {
    display: "flex",
    paddingTop: "84px",
    paddingLeft: "220px",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      paddingTop: "1px",
      paddingLeft: "1px"
    }
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing(10)
  },
  paper: {
    padding: theme.spacing(2.5)
  },
  gridWrapper: {
    padding: theme.spacing(3)
  },
  form: {
    maxWidth: "350px"
  },
  button: {
    minWidth: "128px",
    margin: theme.spacing(1)
  }
});

class SettingsPage extends Component {
  state = {
    isLoading: false,
    changeEmail: true,
    changePassword: true
  };
  // To add access to context data.
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.newEmailEl = React.createRef();
    this.confEmailEl = React.createRef();
    this.curPasswordEl = React.createRef();
    this.newPasswordEl = React.createRef();
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Container maxWidth="md">
          <Typography component="h1" variant="h4" color="primary" gutterBottom>
            Settings
          </Typography>
          {this.state.isLoading ? (
            <div className={classes.spinner}>
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <Paper className={classes.paper}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                Profile
              </Typography>
              <div className={classes.gridWrapper}>
                <Grid container direction="row" justify="flex-start">
                  <Grid item xs={12} lg={2}>
                    <Typography>Email</Typography>
                  </Grid>
                  <Grid>
                    {this.state.changeEmail ? (
                      <Grid className={classes.form}>
                        <TextField
                          variant="outlined"
                          margin="dense"
                          required
                          fullWidth
                          id="email"
                          label="New Email"
                          name="new email"
                          autoComplete="New email"
                          type="email"
                          size="small"
                          inputRef={this.newEmailEl}
                        />
                        <TextField
                          variant="outlined"
                          margin="dense"
                          required
                          fullWidth
                          id="email"
                          label="Confirm Email"
                          name="comfirm email"
                          autoComplete="Confirm email"
                          type="email"
                          size="small"
                          inputRef={this.confEmailEl}
                        />
                        <TextField
                          variant="outlined"
                          margin="dense"
                          required
                          fullWidth
                          name="password"
                          label="Current Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          size="small"
                          inputRef={this.curPasswordEl}
                        />
                        <Grid>
                          <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                          >
                            Ok
                          </Button>
                          <Button
                            className={classes.button}
                            variant="outlined"
                            color="secondary"
                          >
                            Cancel
                          </Button>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                      >
                        <Typography>{this.context.userId}</Typography>
                        <Button color="primary" className={classes.button}>
                          Change
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                >
                  <Grid item xs={12} lg={2}>
                    <Typography>Password</Typography>
                  </Grid>
                  <Grid>
                    {this.state.changeEmail ? (
                      <Grid className={classes.form}>
                        <TextField
                          variant="outlined"
                          margin="dense"
                          required
                          fullWidth
                          name="password"
                          label="Current Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          size="small"
                          inputRef={this.curPasswordEl}
                        />
                         <TextField
                          variant="outlined"
                          margin="dense"
                          required
                          fullWidth
                          name="password"
                          label="New Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                          size="small"
                          inputRef={this.newPasswordEl}
                        />
                        <Grid>
                          <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                          >
                            Ok
                          </Button>
                          <Button
                            className={classes.button}
                            variant="outlined"
                            color="secondary"
                          >
                            Cancel
                          </Button>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                      >
                        <Typography>●●●●●●</Typography>
                        <Button color="primary" className={classes.button}>
                          Change
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                  >
                    Delete Account
                  </Button>
                </Grid>
              </div>
            </Paper>
          )}
        </Container>
      </div>
    );
  }
}
export default withStyles(styles)(SettingsPage);
