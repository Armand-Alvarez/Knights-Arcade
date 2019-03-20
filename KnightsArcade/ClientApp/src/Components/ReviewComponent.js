import React, { Component } from 'react'
import { Panel } from 'react-bootstrap';
import axios from 'axios'




export class ReviewComponent extends Component {
    constructor () {
      super()
      this.state = {
        gameName: '',
        gameLink: ''
      }
  
      this.handleClick = this.handleClick.bind(this)
    }
  
    handleClick () {
      /* Change the axios.get function input to wherever the game review info is stored */
      axios.get('http://localhost:5002/api/v1/infrastructure/info')
        .then(response => this.setState({username: response.data}))
      }

  render() {
    return (
      <div>
        <Panel>
            <Panel.Body><a href="#">Game Title Link</a></Panel.Body>
        </Panel>
      </div>
    )
  }
}

export default ReviewComponent
