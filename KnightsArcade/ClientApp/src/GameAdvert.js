import React, { Component } from 'react';
import NaviBar from './Components/NavBar';
import axios from 'axios';
import './GameAdvert.css';
import GameAdSlides from './Components/GameAdSlides';
import { Grid, Row, Col, Glyphicon, Button, Form, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';

class GameAdvert extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            gamedata: []
        };
    }


    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        const urlGameid = urlParams.get('gameId');
        var getRequest = `api/v1/Public/rds/games/gamesbyid?gameId=` + urlGameid;
        axios.get(getRequest)
            .then(res => {
                const gamedata = res.data;
                this.setState({ gamedata: gamedata });
            })
    }


    render() {
    return (
      <div className = 'FullPage'>
        <NaviBar/>
        <div className = 'GameAdDiv'>
            <Grid fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                <Row style={{ marginLeft: 0, marginRight: 0 }}>
                        <Col md={8} mdOffset={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
                            <h1>{this.state.gamedata.gameName}</h1>
                    </Col>
                </Row>
                <Row style={{ marginLeft: 0, marginRight: 0 }}>
                  <Col>
                    <Grid>
                      <Row> 
                      <Col md={10} mdOffset={0} sm={10} smOffset={0} style={{ paddingLeft: 0, paddingRight: 0 }}>
                      <GameAdSlides/>
                     </Col>
                     <Col md={2} mdOffset={0} sm={2} smOffset={1} style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Form>
                          <FormGroup>
                            <ControlLabel>Creator</ControlLabel>
                            <FormControl.Static>{this.state.gamedata.gameCreatorName}</FormControl.Static>
                          </FormGroup>
                          <FormGroup>
                            <ControlLabel>Date Published</ControlLabel>
                            <FormControl.Static>{this.state.gamedata.gameSubmissionDateUtc}</FormControl.Static>
                          </FormGroup>
                          <FormGroup>
                            <ControlLabel>Genres</ControlLabel>
                            <FormControl.Static>Action Adventure Shooter</FormControl.Static>
                          </FormGroup>
                          <FormGroup>
                            <ControlLabel>Available On Arcade Machines</ControlLabel>
                            <Glyphicon className='Check' glyph='ok'></Glyphicon>
                            </FormGroup>
                          <Button bsStyle='link'>Download Game</Button>
                        </Form>
                      </Col>
                      </Row>  
                    </Grid>
                    
                  </Col>
                </Row>
                <Row style={{ marginLeft: 0, marginRight: 0 }}>
                  <Col md={4} mdOffset={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
                            <h3>About the game</h3>
                            <p>{this.state.gamedata.gameDescription}</p>
                  </Col>
                  <Col md={2} mdOffset={1} style={{ paddingLeft: 0, paddingRight: 0 }}>
                            <h3>Controls</h3>
                            <p>{this.state.gamedata.gameControls}</p>
                  </Col>
                </Row>
		          </Grid>
        </div>
      </div>
    )
  }
}

export default GameAdvert;