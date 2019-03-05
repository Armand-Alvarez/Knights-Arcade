import React, { Component } from 'react';
import { Thumbnail, Grid, Row, Col } from 'react-bootstrap';
import NaviBar from './Components/NavBar';
import './About.css';

class About extends Component {
  render() {
    return (
      <div className = 'FullPage'>
        <NaviBar/>
        <h1 className ='text'>About</h1>

        <Grid>
          <Row>
            <Col md={6} mdPush={6}>
              <p className = 'text'>
                Insert info here. Section 1 / 2
              </p>
              <p className = 'text'>
                Culpa eiusmod laborum quis occaecat. Reprehenderit non dolor cillum elit eiusmod culpa ut qui cillum ea anim. Anim deserunt aliqua commodo nostrud sunt. Est exercitation deserunt nisi nulla mollit enim enim ut minim. Eiusmod aliquip nulla quis occaecat nulla voluptate dolor proident sunt ut mollit do eiusmod. Tempor excepteur ullamco quis nostrud commodo ex dolore occaecat officia et fugiat veniam laborum officia. Dolore Lorem nisi nostrud labore nisi veniam est ex Lorem non ex amet ullamco nisi.
              </p>
              <p className = 'text'>
                Amet irure nisi dolor sint enim do nulla laborum aliquip incididunt. Magna reprehenderit laboris amet enim ea labore anim aute anim ullamco elit esse irure fugiat. Fugiat velit laborum veniam pariatur laborum cillum nostrud minim est ullamco nostrud non. Dolor et sint consequat occaecat nisi esse reprehenderit mollit sunt id. Labore exercitation officia deserunt minim est consequat labore laborum et velit sint consequat duis fugiat.
              </p>
            </Col>
            <Col md={6} mdPull={6}>
              <Thumbnail src={require('./Images/arcade.png')}></Thumbnail>
            </Col>
          </Row>

          <Row>
            <Col md={6} mdPush={6}>
              <Thumbnail src={require('./Images/workers2.png')}></Thumbnail>
            </Col>
              <Col md={6} mdPull={6}>
                <p className = 'text'>
                  Insert info here. Section 2 / 2
                </p>
                <p className = 'text'>
                  Culpa eiusmod laborum quis occaecat. Reprehenderit non dolor cillum elit eiusmod culpa ut qui cillum ea anim. Anim deserunt aliqua commodo nostrud sunt. Est exercitation deserunt nisi nulla mollit enim enim ut minim. Eiusmod aliquip nulla quis occaecat nulla voluptate dolor proident sunt ut mollit do eiusmod. Tempor excepteur ullamco quis nostrud commodo ex dolore occaecat officia et fugiat veniam laborum officia. Dolore Lorem nisi nostrud labore nisi veniam est ex Lorem non ex amet ullamco nisi.
                </p>
                <p className = 'text'>
                  Amet irure nisi dolor sint enim do nulla laborum aliquip incididunt. Magna reprehenderit laboris amet enim ea labore anim aute anim ullamco elit esse irure fugiat. Fugiat velit laborum veniam pariatur laborum cillum nostrud minim est ullamco nostrud non. Dolor et sint consequat occaecat nisi esse reprehenderit mollit sunt id. Labore exercitation officia deserunt minim est consequat labore laborum et velit sint consequat duis fugiat.
                </p>              </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default About;