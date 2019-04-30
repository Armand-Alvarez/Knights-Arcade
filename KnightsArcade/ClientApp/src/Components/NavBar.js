import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Image } from 'react-bootstrap';
import axios from 'axios';
import './NavBar.css';
import { Auth, AuthClass } from 'aws-amplify';
import { request } from 'http';

export default class NaviBar extends Component {
    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);

        this.state = {
            loggedIn: false,
            username: "",
            info: [],
            isAdmin: "false",
            headerStyleName: "",
            gamesStyleName: "",
            aboutStylename: "",
            locationStyleName: "",
            submitStyleName: "",
            adminStyleName: "",
            box: props.box
        };

        console.log(Auth);

        document.title = "Knights Arcade";
    }

    componentDidMount() {
        switch (this.state.box) {
            case "home":
                this.setState({ headerStyleName: "underline" });
                break;
            case "games":
                this.setState({ gamesStyleName: "underline" });
                break;
            case "location":
                this.setState({ locationStyleName: "underline" });
                break;
            case "about":
                this.setState({ aboutStyleName: "underline" });
                break;
            case "admin":
                this.setState({ adminStyleName: "underline" });
                break;
            case "submit":
                this.setState({ submitStyleName: "underline" });
                break;
            default:
                break;
        }
        Auth.currentAuthenticatedUser({
            bypassCache: false
        }).then(user => {
            this.state.info = Auth.user.signInUserSession.accessToken.payload['cognito:groups'];
            this.state.isAdmin = this.handleAdminCheck();
            this.setState({ loggedIn: true });
            this.setState({ username: user.username });
        })
            .then(() => {
                axios.get('/api/v1/Public/rds/users/user?username=' + this.state.username)
                    .then(async (response) => {
                        if (response.status === 204) {
                            const user = {
                                username: this.state.username,
                                userFirstName: "First ",
                                userLastName: "Last Name",
                                userImagePath: "USERS/default/defaultAvatar.png",
                                userMajor: "Major",
                                userEmail: Auth.user.attributes.email
                            }
                            axios.post('/api/v1/Restricted/rds/users/user', user, {
                                headers: {
                                    'Authorization': "Bearer " + Auth.user.signInUserSession.accessToken.jwtToken
                                }
                            });
                        }
                    })
                    .catch(err => {
                    });
            })
            .catch(err => {
                this.setState({ loggedIn: false });
            });
    }

    handleAdminCheck() {
        if (this.state.info != null) {
            if (this.state.info.includes("admin")) {
                return true;
            }
        }
        return false;
    }

    handleLogOut() {
        Auth.signOut()
            .then(data => {
            })
            .catch(err => {
            });
    }

    render(props) {
        if (this.state.isAdmin == true) {
            return (
                <Navbar className="nav-bar" inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand className={this.state.headerStyleName}>
                            <a href="/" style={{padding:'5px'}}><Image style={{ cursor: 'pointer', height: '38px' }} src={require('../Images/mediumsmalllogo.png')} /></a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="Games" className={this.state.gamesStyleName}>
                                Games
							</NavItem>
                            <NavItem eventKey={2} href="About" className={this.state.aboutStyleName}>
                                About
							</NavItem>
                            <NavItem eventKey={3} href="Locations" className={this.state.locationStyleName}>
                                Arcade Machine Locations
							</NavItem>
                            <NavItem eventKey={4} href="Submit" className={this.state.submitStyleName}>
                                Submit A Game
                            </NavItem>
                            <NavItem eventKey={5} href="Admin" className={this.state.adminStyleName}>
                                Admin
							</NavItem>
                        </Nav>
                        <Nav pullRight>
                            {this.state.loggedIn ?
                                <NavDropdown eventKey={3} title={this.state.username} id="basic-nav-dropdown">
                                    <MenuItem eventKey={3.3} href="MyProfile">My Account</MenuItem>
                                    <MenuItem divider />
                                    <MenuItem eventKey={3.3} href="/" onClick={this.handleLogOut}>Log Out</MenuItem>
                                </NavDropdown>
                                :
                                <NavItem eventKey={2} href="Login">
                                    Log In
								</NavItem>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        }
        else {
            return (
                <Navbar className="nav-bar" inverse collapseOnSelect>
                    <Navbar.Header className={this.state.headerStyleName}>
                        <Navbar.Brand >
                            <a href="/" style={{ padding: '5px' }}><Image style={{ cursor: 'pointer', height: '38px' }} src={require('../Images/mediumsmalllogo.png')} /></a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="Games" className={this.state.gamesStyleName}>
                                Games
								</NavItem>
                            <NavItem eventKey={2} href="About" className={this.state.aboutStyleName}>
                                About
								</NavItem>
                            <NavItem eventKey={3} href="Locations" className={this.state.locationStyleName}>
                                Arcade Machine Locations
								</NavItem>
                            <NavItem eventKey={4} href="Submit" className={this.state.submitStyleName}>
                                Submit A Game
                            </NavItem>
                        </Nav>
                        <Nav pullRight>
                            {this.state.loggedIn ?
                                <NavDropdown eventKey={3} title={this.state.username} id="basic-nav-dropdown">
                                    <MenuItem eventKey={3.3} href="MyProfile">My Account</MenuItem>
                                    <MenuItem divider />
                                    <MenuItem eventKey={3.3} href="/" onClick={this.handleLogOut}>Log Out</MenuItem>
                                </NavDropdown>
                                :
                                <NavItem eventKey={2} href="Login">
                                    Log In
									</NavItem>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        }
    }
}