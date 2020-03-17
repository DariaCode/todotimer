/* ----------------------------------------------------
React.js / Sendings component

Updated: 03/13/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, {Component} from 'react';

import AuthContext from '../context/auth-context';
import Spinner from '../components/Spinner/Spinner';

class SendingsPage extends Component {
    state = {
        isLoading: false,
        sendings: []
    };

    static contextType = AuthContext;

    componentDidMount() {
        this.fetchSendings();
    }

    fetchSendings = () => {
        this.setState({isLoading: true});
        const requestBody = {
            query: `
            query {
                sendings {
                    _id
                    createdAt
                    task {
                        _id
                        title
                        date
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
            const sendings = resData.data.sendings;
            this.setState({sendings: sendings, isLoading: false});
        }).catch(err => {
            console.log(err);
            this.setState({isLoading: false});
        });
    };

    render() {
        return (
            <React.Fragment>
                {this.state.isLoading
                    ? <Spinner/>
                    : (
                        <ul>
                            {this
                                .state
                                .sendings
                                .map(sending => <li key={sending._id}>{sending.task.title}
                                    - {new Date(sending.createdAt).toLocaleDateString()}</li>)}
                        </ul>
                    )}
            </React.Fragment>
        );
    }
}

export default SendingsPage;