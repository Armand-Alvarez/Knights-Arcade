import React, { Component } from 'react'
import { Panel, Button, ButtonToolbar, Label } from 'react-bootstrap';
import axios from 'axios'


export class ManageUsersComponent extends Component {
  constructor () {
    super()
    this.state = {
      username: ''
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    axios.get('http://localhost:5002/api/v1/infrastructure/info')
      .then(response => this.setState({username: response.data}))
    }

  render() {
    return (
      <div>
        <Panel>
            <Panel.Body>
                {/*Link to the user profile page. */}
                <a href="#">Username Link</a>

                <ButtonToolbar>
                    {/* Button allows Admin to edit User's name/major/email */}
                    <Button bsStyle="success">Edit</Button>

                    
        <div className='button__container'>
      <button className='button' onClick={this.handleClick}>
        Click Me
      </button>
      <p>{this.state.username}</p>
    </div>
                </ButtonToolbar>
            </Panel.Body>
        </Panel>
      </div>
    )
  }
}

export default ManageUsersComponent
