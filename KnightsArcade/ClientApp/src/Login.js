import React, { Component } from 'react';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import { Authenticator } from 'aws-amplify-react';
Amplify.configure(awsmobile);

class Login extends Component {

  render() {
    return (

      <Authenticator hide={[]}>
        <GoBack history={this.props.history}/>
      </Authenticator>

    )
  }
}

class GoBack extends Component {
  constructor(props) {
    super(props);

    this._validAuthStates = ['signedIn'];

  }

  render() {
    if(this.props.authState === "signedIn")
    {
      this.props.history.goBack()
    }
    return null
  }
}

export default Login;