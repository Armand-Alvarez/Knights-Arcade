import React, { Component } from 'react';
import { Thumbnail, Grid, Row, Col } from 'react-bootstrap';
import NaviBar from './Components/NavBar';
import './About.css';

class About extends Component {
  render() {
    return (
      <div className = 'FullPage'>
        <NaviBar/>


        <Grid>
          <Row>
            <Col md={6} mdPush={6}>
              <Thumbnail src={require('./Images/arcade.png')}></Thumbnail>
            </Col>
            <Col md={6} mdPull={6}>
            <h1 className ='text'>About</h1>
              <p className = 'text'>
                SVAD Mission:
              </p>
              <p className = 'text'>
                "UCF's School of Visual Arts and Design unites arts, emerging media, 
                photography, art history, and architecture. We encourage the creative and 
                inventive efforts of individuals and groups who investigate and value the past, 
                who explore and engage in the present, and who critically design an innovative 
                future."
              </p>
              <p className = 'text'>
                The school of visual arts and design at UCF is a place for seeing, 
                thinking, hearing, touching, learning, and creating. Art engages the 
                senses and inspires the imagination and we designed our curriculum 
                to do the same. We offer academic programs and courses of interest 
                to artists and designers of all varieties.
              </p>
              <p className = 'text'>
                The SVAD arcade machines are located around the University of Central Florida campus.
                All games on these machines are developed by UCF students. 

              </p>
            </Col>

          </Row>

          <Row>
            <Col md={6} mdPush={6}>
              <p className = 'text'>
                Group Members:
              </p>
              <p className = 'text'>
                Armand Alvarez, Scott Kramarz, Jon Navas, Yitzak Hernandez, Drew Corbeil
              </p>
              <p className = 'text'>
                Sponser: Peter Smith
              </p>
            </Col>
            <Col md={6} mdPull={6}>
              <Thumbnail src={require('./Images/workers2.png')}></Thumbnail>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default About;