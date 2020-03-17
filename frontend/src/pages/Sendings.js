/* ----------------------------------------------------
React.js / Sendings component

Updated: 03/13/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, {Component} from 'react';

import AuthContext from '../context/auth-context';
import Spinner from '../components/Spinner/Spinner';
import SendingList from '../components/Sendings/SendingList/SendingList';

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

    deleteSendingHandler = sendingId => {
        this.setState({isLoading: true});
        const requestBody = {
            query: `
            mutation CancelSending($id: ID!) {
                cancelSending(sendingId: $id) {
                    _id
                    title
                }
            }
        `,
            variables: {
                id: sendingId
            }
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
                throw new Error('Failed ');
            }
            return res.json();
        }).then(resData => {
            this.setState(prevState => {
                const updatedSendings = prevState
                    .sendings
                    .filter(sending => {
                        return sending._id !== sendingId;
                    });
                return {sendings: updatedSendings, isLoading: false};
            });
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
                    : (<SendingList
                        sendings={this.state.sendings}
                        onDelete={this.deleteSendingHandler}/>)}
            </React.Fragment>
        );
    }
}

export default SendingsPage;