import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Modal, Button, FormGroup, FormControl, ControlLabel, NavDropdown, MenuItem} from 'react-bootstrap';
import './NavBar.css';
import { Auth } from 'aws-amplify';

export default class NaviBar extends Component {
	constructor(props) {
		super(props);

		this.handleLogOut = this.handleLogOut.bind(this);

	    this.state = {
	      loggedIn: false,
	      username: ""
	    };
	}

	componentDidMount() {

		Auth.currentAuthenticatedUser({
		    bypassCache: false
		}).then(user => {
			this.setState({ loggedIn: true });
			this.setState({ username: user.username});
		})
		.catch(err => {
			console.log(err);
			this.setState({ loggedIn: false });
		});

	}

	handleLogOut() {
    	Auth.signOut()
		    .then(data => console.log(data))
		    .catch(err => console.log(err));
  	}

	render(props) {
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
			    <Nav pullRight>
			    	{this.state.loggedIn ?

			    		<NavDropdown eventKey={3} title={this.state.username} id="basic-nav-dropdown">
					        <MenuItem eventKey={3.2} href="Submit">Submit a game</MenuItem>
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