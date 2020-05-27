import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import config from "../../../config.json";

class Facebook extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
  }
  
  responseFacebook = response => {
    console.log("app_id", config.FACEBOOK_APP_ID);
    console.log(response);
  }

  render() { 
    return ( 
      <div>
        <FacebookLogin
          appId="265797638113628"
          autoLoad={true}
          fields="name,email"
          callback={this.responseFacebook}
        />
      </div>
     );
  }
}
 
export default Facebook;