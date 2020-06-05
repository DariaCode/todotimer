/* ----------------------------------------------------
React.js / Email confirmation page

Updated: 06/06/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, {Component} from 'react';
import { Link } from 'react-router-dom'

// Material-UI components (https://material-ui.com/)
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Material-UI components (https://material-ui.com/)
import {withStyles} from '@material-ui/core/styles';

// Style for Material-UI components
const styles = (theme) => ({
    root: {
        display: 'flex',
        paddingTop: '124px',
        flexDirection: 'column',
    },
    paper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: theme.spacing(1.5)
    },
    spinner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: theme.spacing(10)
    }
});

// eslint-disable-next-line require-jsdoc
class ConfirmPage extends Component {
    state = {
        confirming: true,
    }

    componentDidMount = () => {
      const {emailToken} = this.props.match.params;
      const requestBody = {
        query: `
            mutation ConfirmUser($emailToken: String!){
              confirmUser(confirmInput: {emailToken: $emailToken}) {
                    msgs
                }
            }
        `,
        variables: {
          emailToken: emailToken,
        }
      };

      fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resData => {
          this.setState({ confirming: false });
          console.log("ConfirmPage resData", resData);
        }).catch(err => {
          console.log(err);
      });
    };

    render() {
      const {classes} = this.props;
        return (
            <div className={classes.root}>
              <CssBaseline/>
              <Container maxWidth="md">
                {this.state.confirming
                    ? <div className={classes.spinner}>
                        <CircularProgress color="secondary"/>
                      </div>
                    : <Paper className={classes.paper}>
                      <Typography component="h2" variant="h5" color="primary" gutterBottom>
                        Your email has been confirmed!
                      </Typography>
                      <Button variant="outlined" color="primary">
                      <Link to='/'>Go to Homepage</Link>
                      </Button>
                      </Paper>
                }
                </Container>
            </div>
        );
    }
}

export default withStyles(styles)(ConfirmPage);
