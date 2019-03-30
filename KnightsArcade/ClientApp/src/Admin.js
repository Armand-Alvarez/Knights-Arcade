import React, { Component } from 'react'
import NaviBar from './Components/NavBar';
import RevComp from './Components/ReviewComponent';
import MangGamesComp from './Components/ManageGamesComponent';
import MangUsersComp from './Components/ManageUsersComponent';
import {Tabs, Tab, ListGroup, ListGroupItem} from 'react-bootstrap';
import axios from 'axios';


export class Admin extends Component {

  constructor (props) {
    super(props);

    this.state = {
      submissions: [],
      games: [],  
      users: [],
    };
  }

  componentDidMount() {

    // Get all submissions pending review
    axios.get('/api/v1/Public/rds/games/allpendinggames')
      .then(res => {
        const submissions = res.data;
        this.setState({ submissions: submissions });
      })
    
    // Get all published games (whether on/off arcade machines)
    axios.get('/api/v1/Public/rds/games/allapprovedgames')
      .then(res => {
        const games = res.data;
        this.setState({ games: games });
      })
    
    // todo: Get all users
    axios.get('/api/v1/Public/rds/users/allusers')
      .then(res => {
        const users = res.data;
        this.setState({ users: users });
      })
  }

  render() {

    return (
      <div className = 'Fullpage'>
        <NaviBar/>
        <div className = "Header">
            <h1 className = 'text'>Admin Page</h1>
        </div>

        <Tabs defaultActiveKey="ReviewSubmissions" id="Admin-tabs">
          <Tab eventKey="ReviewSubmissions" title="Review Submissions">
            <ListGroup>
              <ListGroupItem> {
                this.state.submissions.map((submission) => {
                return <RevComp submissionData={submission}/>
              })    
              }
              </ListGroupItem>
            </ListGroup>
          </Tab>
          <Tab eventKey="ManageGames" title="Manage Games">
            <ListGroup>
              <ListGroupItem> {
                this.state.games.map((game) => {
                  return <MangGamesComp gameData={game}/>
                })
              }</ListGroupItem>
            </ListGroup>         
          </Tab>
          <Tab eventKey="ManageUsers" title="Manage Users">
            <ListGroup>
              <ListGroupItem> {
                this.state.users.map((user) => {
                  return <MangUsersComp userData={user}/>
                })
              }</ListGroupItem>
            </ListGroup>
          </Tab>
        </Tabs>

      </div>
    )
  }
}

export default Admin
