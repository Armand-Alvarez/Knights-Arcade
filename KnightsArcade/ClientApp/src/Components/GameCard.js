import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Modal, Button, FormGroup, FormControl, ControlLabel, NavDropdown, MenuItem, Panel, Grid, Row, Col, Image} from 'react-bootstrap';
import './GameCard.css';
import { Auth } from 'aws-amplify';

export default class GameCard extends Component {
	constructor(props) {
		super(props);

	    this.state = {
	      
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

	render(props) {
		return (
			
			<div className="game-card__card">
				<Image width={240} height={135} src={require('../slideTest.png')} />
				<div className="game-card__info-container">
					<div className="game-card__info-row-1">
						<h3 className="game-card__game-title">Sushi Slap</h3>
						<p className="game-card__dev">Developer: Drew</p>
					</div>
					<p>Released: Mar 14, 2019</p>
					<p>puzzle, platformer, RPG</p>
				</div>
			</div>

		);
	}
}