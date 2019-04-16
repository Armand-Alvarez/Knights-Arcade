import React, { Component } from 'react'
import NaviBar from './Components/NavBar';
import RevComp from './Components/ReviewComponent';
import TestingComponent from './Components/TestingComponent';
import MangGamesComp from './Components/ManageGamesComponent';
import MangUsersComp from './Components/ManageUsersComponent';
import ArcadeMachineComponent from './Components/ArcadeMachineComponent';
import { Tabs, Tab, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import axios from 'axios';
import Footer from './Components/Footer';
import { Auth } from 'aws-amplify';
import './Admin.css';
import './BodyWrap.css'


export class Admin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            submissions: [],
            games: [],
            testingGames: [],
            users: [],
            info: [],
            arcadeMachines: [],
            isAdmin: 0
        };

        this.updateList = this.updateList.bind(this);
        this.updateUserList = this.updateUserList.bind(this);
        this.updateTestingList = this.updateTestingList.bind(this);
        this.handleNewMachine = this.handleNewMachine.bind(this);
        this.removeArcadeLocation = this.removeArcadeLocation.bind(this);
        this.addArcadeLocation = this.addArcadeLocation.bind(this);
    }

    componentDidMount() {

        // If user is signed out display 403 error
        if (Auth.user == null) {
            this.state.isAdmin = 1;
        }

        // If user signed in, check admin status
        Auth.currentAuthenticatedUser({
            bypassCache: false
        }).then(user => {
            this.state.info = Auth.user.signInUserSession.accessToken.payload['cognito:groups'];
            this.state.isAdmin = this.handleAdminCheck();
        })

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

        // Get all users
        axios.get('/api/v1/Public/rds/users/allusers')
            .then(res => {
                const users = res.data;
                this.setState({ users: users });
            })

        axios.get('api/v1/Public/rds/games/alltestinggames')
            .then(res => {
                const testinggames = res.data;
                this.setState({ testingGames: testinggames });
            })
        axios.get('api/v1/Public/rds/arcademachines/allarcademachines')
            .then(res => {
                const arcademachines = res.data;
                this.setState({ arcadeMachines: arcademachines })
                console.log(arcademachines);
            })
    }

    handleNewMachine() {
        const arcadeMachine = {
            arcadeMachineId: -1,
            arcadeMachineName: "",
            arcadeMachineAddress: "",
            arcadeMAchineCoords: "",
            arcadeMachineDescription: "",
            arcadeMachineRoom: "",
            editable: true
        }
        const temp = this.state.arcadeMachines;
        //temp = temp.reverse;
        temp.push(arcadeMachine);
        //temp = temp.reverse;
        this.setState({ arcadeMachines: temp });
    }

    handleAdminCheck() {
        if (this.state.info != null) {
            if (this.state.info.includes("admin")) {
                return 2;
            }
        }
        return 1;
    }

    updateList(gameId) {
        const temp = this.state.games;

        for (var i = 0; i < temp.length; i++) {
            if (temp[i].gameId === gameId) {
                temp.splice(i, 1);
                break;
            }
        }

        this.setState({ games: temp });

    }

    updateUserList(userId) {
        const temp = this.state.users;

        for (var i = 0; i < temp.length; i++) {
            if (temp[i].userId === userId) {
                temp.splice(i, 1);
                break;
            }
        }

        this.setState({ users: temp });

    }

    addArcadeLocation(machine) {
        this.state.arcadeMachines.push(machine);
    }

    removeArcadeLocation(machineId) {
        const temp = this.state.arcadeMachines;

        for (var i = 0; i < temp.length; i++) {
            if (temp[i].arcadeMachineId === machineId) {
                temp.splice(i, 1);
                break;
            }
        }
        this.setState({ arcadeMachines: temp });

    }

    updateTestingList(gameId) {
        const temp = this.state.testingGames;

        for (var i = 0; i < temp.length; i++) {
            if (temp[i].gameId === gameId) {
                temp.splice(i, 1);
                break;
            }
        }

        this.setState({ testingGames: temp });
        axios.get('/api/v1/Public/rds/games/allpendinggames')
            .then(res => {
                const submissions = res.data;
                this.setState({ submissions: submissions });
            })
    }

    render() {

        var activeTab = "ReviewSubmissions";

        if (this.state.isAdmin == 2) {
            return (
                <div className='AdminPage'>
                    <div className='BodyWrap'>
                        <NaviBar />
                        <div className="Header">
                            <h1 className='text'>Admin Page</h1>
                        </div>

                        <Tabs defaultActiveKey={activeTab} id="Admin-tabs">
                            <Tab eventKey="ReviewSubmissions" title="Review Submissions">
                                <div className="admin_review_container">
                                    <ListGroup>
                                        <ListGroupItem> {
                                            this.state.submissions.map((submission) => {
                                                return <RevComp submissionData={submission} />
                                            })
                                        }
                                        </ListGroupItem>
                                    </ListGroup>
                                </div>
                            </Tab>
                            <Tab eventKey="ManageGames" title="Manage Games">
                                <div className="admin_games_container">
                                    <ListGroup>
                                        <ListGroupItem> {
                                            this.state.games.map((game) => {
                                                return <MangGamesComp updateFunc={this.updateList} gameData={game} />
                                            })
                                        }</ListGroupItem>
                                    </ListGroup>
                                </div>
                            </Tab>
                            <Tab eventKey="ManageUsers" title="Manage Users">
                                <div className="admin_users_container">
                                    <ListGroup>
                                        <ListGroupItem> {
                                            this.state.users.map((user) => {
                                                return <MangUsersComp updateFunc={this.updateUserList} userData={user} />
                                            })
                                        }</ListGroupItem>
                                    </ListGroup>
                                </div>
                            </Tab>
                            <Tab eventKey="TestingQueue" title="Testing Queue">
                                <div className="admin_testqueue_container">
                                    <ListGroup>
                                        <ListGroupItem>
                                            {
                                                this.state.testingGames.map((game) => {
                                                    return <TestingComponent updateFunc={this.updateTestingList} gameData={game} />
                                                })
                                            }
                                        </ListGroupItem>
                                    </ListGroup>
                                </div>
                            </Tab>
                            <Tab eventKey="ArcadeLocations" title="Arcade Machine Locations">
                                <div className="admin_arcade_container">
                                    <Button className="addArcadeButton" bsStyle="success" onClick={this.handleNewMachine}>Add Arcade Machine Location</Button>
                                    <ListGroup>
                                        <ListGroupItem>
                                            {
                                                this.state.arcadeMachines.map((machine) => {
                                                    return <ArcadeMachineComponent addLocation={this.addArcadeLocation} removeLocation={this.removeArcadeLocation} cancelNew={this.cancelNewLocation} arcadeMachine={machine} />
                                                })
                                            }
                                        </ListGroupItem>
                                    </ListGroup>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                    <Footer />
                </div>
            )
        }

        else if (this.state.isAdmin == 1) {
            return (
                <div className='Fullpage'>
                    <div className='BodyWrap'>
                        <NaviBar />
                        <div className="Header">
                            <h2>Error 403: Page forbidden</h2>
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        }

        else if (this.state.isAdmin == 0) {
            return (
                <div className='Fullpage'>
                    <div className='BodyWrap'>
                        <NaviBar />
                    </div>
                    <Footer />
                </div>
            )
        }
    }
}

export default Admin
