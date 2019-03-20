import React, { Component } from 'react'
import './Admin.css';
import NaviBar from '../Components/NavBar';
import RevComp from '../Components/ReviewComponent';
import MangGamesComp from '../Components/ManageGamesComponent';
import MangUsersComp from '../Components/ManageUsersComponent';
import {Tabs, Tab, ListGroup, ListGroupItem} from 'react-bootstrap';
import axios from 'axios'


export class Admin extends Component {
  constructor () {
    super()
    this.test = {
      one: 0,
      two: '',
      three: true

    }
    this.state = {
      username: '',
      array: [],
      array2: []
    }

    this.handleClick = this.handleClick.bind(this)
  }

  

  handleClick () {
    axios.get('http://localhost:5002/api/v1/infrastructure/info')
      .then(response => this.setState({username: response.data}))

    axios.get('http://localhost:5002/api/v1/infrastructure/info2')
      .then(response => this.setState({array: response.data}))  

    }


  render() {

    return (
      <div className = 'Fullpage'>
        <NaviBar/>
        <div className = "Header">
            <h1 className = 'text'>Admin Page</h1>
        </div>

        <div className='button__container'>
      <button className='button' onClick={this.handleClick}>
        Click Me
      </button>
      <p>{this.state.username}</p>
      <p>{this.state.array}</p>
      <p>{this.state.array2}</p>
    </div>

        <Tabs defaultActiveKey="ReviewSubmissiions" id="Admin-tabs">
          <Tab eventKey="ReviewSubmissions" title="Review Submissions">
            <ListGroup>
              <ListGroupItem><RevComp/></ListGroupItem>
              <ListGroupItem><RevComp/></ListGroupItem>
              <ListGroupItem><RevComp/></ListGroupItem>
            </ListGroup>
          </Tab>
          <Tab eventKey="ManageGames" title="Manage Games">
            <ListGroup>
              <ListGroupItem><MangGamesComp/></ListGroupItem>
              <ListGroupItem><MangGamesComp/></ListGroupItem>
              <ListGroupItem><MangGamesComp/></ListGroupItem>
            </ListGroup>         
          </Tab>
          <Tab eventKey="ManageUsers" title="Manage Users">
            <ListGroup>
              <ListGroupItem><MangUsersComp/></ListGroupItem>
              <ListGroupItem><MangUsersComp/></ListGroupItem>
              <ListGroupItem><MangUsersComp/></ListGroupItem>
            </ListGroup>
          </Tab>
        </Tabs>

        
      </div>
    )
  }
}

export default Admin
