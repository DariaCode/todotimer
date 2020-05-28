/* ----------------------------------------------------
Node.js / Facebook button component

Updated: 05/28/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import AuthContext from '../../context/auth-context';
import config from '../../config.json';


class Facebook extends Component {

    // To add access to context data.
    static contextType = AuthContext;

    componentClicked = data=> {
      console.log("data", data);
    }

    responseFacebook = response => {
        console.log('response',response,);
        // To create body for POST request for login/sing up.
        let requestBody = {
            query: `
            mutation AuthFacebook($email: String!, $accessToken: String!){
              authFacebook(facebookInput: {email: $email, accessToken: $accessToken}) {
                userId
                token
                tokenExpiration
              }
            }
        `,
            variables: {
                email: response.email,
                accessToken: response.accessToken
            }
        };
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                // To handle error message.
                console.log("facebook res", res);
                throw new Error('Failed');
            }
            return res.json();
        }).then(resData => {
            console.log(resData);
            if (resData.data.authFacebook.token) {
                this
                    .context
                    .login(resData.data.authFacebook.token, resData.data.authFacebook.userId, resData.data.authFacebook.tokenExpiration);
            }
        }).catch(err => {
            console.log(err);
        }); 
    }

    render() {
        return (
                <FacebookLogin
                    appId={config.FACEBOOK_APP_ID}
                    autoLoad={false}
                    fields="name,email"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}/>
        );
    }
}

export default Facebook;