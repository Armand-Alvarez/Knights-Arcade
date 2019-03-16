import React, { Component } from 'react';
import NaviBar from './Components/NavBar';
import './GameAdvert.css';
import GameAdSlides from './Components/GameAdSlides';
import { Grid, Row, Col, Glyphicon, Button, Form, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';

class GameAdvert extends Component {
  render() {
    return (
      <div className = 'FullPage'>
        <NaviBar/>
        <div className = 'GameAdDiv'>
            <Grid fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                <Row style={{ marginLeft: 0, marginRight: 0 }}>
                    <Col md={8} mdOffset={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
                      <h1>Game Name</h1>
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
                            <FormControl.Static>Terry Crews</FormControl.Static>
                          </FormGroup>
                          <FormGroup>
                            <ControlLabel>Date Published</ControlLabel>
                            <FormControl.Static>11-11-2019</FormControl.Static>
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
                    <p>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAA AAAAAAA AAAAAAAAAA AAAAAAA AAAAAAA AAAAAAAAAAAAa AAAAAAAAAAAAA AAAAAAAAAAA AAAAAAAAA AAAAAAAA AAAAAAAAAAAAAA  AAAAAAAAAAA AaAAAAAAAAAAAA AAAAAAAAAA AA AAAAAAAAAAAA AAAAA AAAAAAAAAAAA AA AAAAAAAAAAAAa AAAAAAAAAAAAAA AAAAAAAAAA  AAAAAAAAAA AAAAAAA AAAAA AAAAAAAAA AAA AAAAAAAAAa</p>
                  </Col>
                  <Col md={2} mdOffset={1} style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <h3>Controls</h3>
                  <p>fddgffhgfghfgf\nghg hghgfgfhgfhgfghfhgf hgfghfhfhgfghfghfhg gf hgf hgf hgfhgf hgf hgf hgfhgf hggfhg fghf hgf hgfgh hgfhgf hgf hgf hgf hgf hgfhg hgfhgf hgfhgfhgf hgf hfghfhgf ghf hg fh</p>
                  </Col>
                </Row>
		          </Grid>
        </div>
      </div>
    )
  }
}

export default GameAdvert;