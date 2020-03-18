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
import SendingsChart from '../components/Sendings/SendingsChart/SendingsChart';
import SendingsControl from '../components/Sendings/SendingsControl/SendingsControl';

class SendingsPage extends Component {
    state = {
        isLoading: false,
        sendings: [],
        outputType: 'list'
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
                        price
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

    changeOutputTypeHandler = outputType => {
        if(outputType === 'list') {
            this.setState({outputType: 'list'});
        } else {
            this.setState({outputType: 'chart'});
        }
    };

    render() {
        let content = <Spinner />;
        if (!this.state.isLoading) {
            content = (
                <React.Fragment>
                    <SendingsControl
                    activeOutputType={this.state.outputType}
                    onChange={this.changeOutputTypeHandler} />
                    <div>
                        {this.state.outputType === 'list' ? 
                        <SendingList
                        sendings={this.state.sendings}
                        onDelete={this.deleteSendingHandler} /> :
                        <SendingsChart 
                        sendings={this.state.sendings} />}
                    </div>
                </React.Fragment>
            );
        }
        return <React.Fragment>{content}</React.Fragment>;
    }
}

export default SendingsPage;