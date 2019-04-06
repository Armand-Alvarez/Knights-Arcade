import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import axios from 'axios';
import './NavBar.css';
import { Auth, AuthClass } from 'aws-amplify';

export default class NaviBar extends Component {
	constructor(props) {
		super(props);

		this.handleLogOut = this.handleLogOut.bind(this);

	    this.state = {
	      loggedIn: false,
				username: "",
				info: [],
				isAdmin: "false"
        };

				document.title = "Knights Arcade";
	}

	componentDidMount() {

		Auth.currentAuthenticatedUser({
		    bypassCache: false
		}).then(user => {
			this.state.info = Auth.user.signInUserSession.accessToken.payload['cognito:groups'];
			this.state.isAdmin = this.handleAdminCheck();
			this.setState({ loggedIn: true });
            this.setState({ username: user.username});
		})
        .then(() => {
            axios.get('/api/v1/Public/rds/users/user?username=' + this.state.username)
                .then(async (response) => {
                    console.log(response);
                    if (response.status === 204) {
                        const user = {
                            username: this.state.username,
                            userFirstName: "First ",
                            userLastName: "Last Name",
                            userImagePath: "USERS/default/defaultAvatar.png",
                            userMajor: "Major"
                        }
                        axios.post('/api/v1/Restricted/rds/users/user', user,{ 
							headers: {
								'Authorization' : Auth.user.signInUserSession.accessToken.jwtToken
							}
						});
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        })
		.catch(err => {
			console.log(err);
			this.setState({ loggedIn: false });
		});        
	}

	handleAdminCheck() {
		if (this.state.info!=null){
			if (this.state.info.includes("admin")) {
				return true;
			}
		}
		return false;
	}

	handleLogOut() {
    	Auth.signOut()
		    .then(data => console.log(data))
		    .catch(err => console.log(err));
  	}

	render(props) {
		if (this.state.isAdmin==true) {
			return (
			
				<Navbar className="nav-bar" inverse collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="/">Knights Arcade</a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav>
							<NavItem eventKey={1} href="Games">
								Games
							</NavItem>
							<NavItem eventKey={2} href="About">
								About
							</NavItem>
							<NavItem eventKey={3} href="Admin">
								Admin
							</NavItem>
	
	
						</Nav>
						}
						<Nav pullRight>
							{this.state.loggedIn ?
	
								<NavDropdown eventKey={3} title={this.state.username} id="basic-nav-dropdown">
										<MenuItem eventKey={3.2} href="Submit">Submit A Game</MenuItem>
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
						<Navbar.Header>
							<Navbar.Brand>
								<a href="/">Knights Arcade</a>
							</Navbar.Brand>
							<Navbar.Toggle />
						</Navbar.Header>
						<Navbar.Collapse>
							<Nav>
								<NavItem eventKey={1} href="Games">
									Games
								</NavItem>
								<NavItem eventKey={2} href="About">
									About
								</NavItem>
								


							</Nav>
							}
							<Nav pullRight>
								{this.state.loggedIn ?

									<NavDropdown eventKey={3} title={this.state.username} id="basic-nav-dropdown">
											<MenuItem eventKey={3.2} href="Submit">Submit A Game</MenuItem>
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

				);}
	}
}