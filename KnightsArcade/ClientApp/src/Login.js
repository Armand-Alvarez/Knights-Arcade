import React, { Component } from 'react';
import { Jumbotron, Button, Carousel, Grid, Row, Col } from 'react-bootstrap';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import { Authenticator, Greetings } from 'aws-amplify-react';
Amplify.configure(awsmobile);

class Login extends Component {
  constructor(props) {
    super(props);

  }

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
    if(this.props.authState == "signedIn")
    {
      this.props.history.goBack()
    }
    return null
  }
}

export default Login;