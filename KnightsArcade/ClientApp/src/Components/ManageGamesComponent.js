import React, { Component } from 'react'
import { Panel, Button, ButtonToolbar, Label } from 'react-bootstrap';
import axios from 'axios'



export class ManageGamesComponent extends Component {
  constructor () {
    super()
    this.state = {
      gameName: '',
      onArcadeMachine: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    /* Change the axios.get function input to wherever the game info is stored */
    axios.get('http://localhost:5002/api/v1/infrastructure/info')
      .then(response => this.setState({username: response.data}))
    }


  render() {
    return (
      <div>
        <Panel>
            <Panel.Body>
                {/*Link to the game ad page. */}
                <a href="#">Game Title Link</a>

                <ButtonToolbar>
                    {/* Button pushes game to arcade machine */}
                    <Button bsStyle="success">Push to Arcade Machines</Button>
                    {/* Button takes game off of arcade machine */}
                    <Button bsStyle="warning">Take Games Off Arcade Machines</Button>
                    {/* Button deletes game altogether*/}
                    <Button bsStyle="danger">Delete Game From System</Button>
                </ButtonToolbar>
            </Panel.Body>
            <Panel.Footer>
                {/*Label that is only activated if game IS on the arcade machine */}
                <Label bsStyle="success">On Arcade Machines</Label>
            </Panel.Footer>
        </Panel>
      </div>
    )
  }
}

export default ManageGamesComponent
