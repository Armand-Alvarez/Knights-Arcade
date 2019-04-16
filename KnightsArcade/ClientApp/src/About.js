import React, { Component } from 'react';
import { Thumbnail, Grid, Row, Col, Jumbotron } from 'react-bootstrap';
import NaviBar from './Components/NavBar';
import './About.css';
import Footer from './Components/Footer';
import './BodyWrap.css';


class About extends Component {
    render() {
        return (
            <div>
                <div className='BodyWrap'>
                    <div className='AboutPage'>
                        <NaviBar box={"about"}/>
                        <Jumbotron style={{ marginBottom: 10, marginTop: 10 }}>
                            <Grid fluid>
                                <Row>
                                    <Col sm={6} smOffset={3}>
                                        <h1>About</h1>
                                    </Col>
                                </Row>
                            </Grid>
                        </Jumbotron>

                        <Grid>
                            <Row>
                                <Col md={6} mdPush={6}>
                                    <Thumbnail src={require('./Images/arcade.png')}></Thumbnail>
                                </Col>
                                <Col md={6} mdPull={6}>
                                    <p className='text'>
                                        SVAD Mission:
                                </p>
                                    <p className='text'>
                                        "UCF's School of Visual Arts and Design unites arts, emerging media,
                                        photography, art history, and architecture. We encourage the creative and
                                        inventive efforts of individuals and groups who investigate and value the past,
                                        who explore and engage in the present, and who critically design an innovative
                                        future."
                                </p>
                                    <p className='text'>
                                        The school of visual arts and design at UCF is a place for seeing,
                                        thinking, hearing, touching, learning, and creating. Art engages the
                                        senses and inspires the imagination and we designed our curriculum
                                        to do the same. We offer academic programs and courses of interest
                                        to artists and designers of all varieties.
                                </p>
                                    <p className='text'>
                                        The SVAD arcade machines are located around the University of Central Florida campus.
                                        All games on these machines are developed by UCF students.
                           
                                </p>
                                </Col>

                            </Row>

                            <Row>
                                <Col md={6} mdPush={6}>
                                    <p>
                                        This website is part of a senior design project made from Fall 2018 - Spring 2019.
                                        We built a system to view/submit games, have them be automatically reviewed, than be published
                                        on this website by an approved Admin.
                                </p>
                                    <p>
                                        If you find any bugs on this website, please email knightsarcade@gmail.com with a description of the bug. Thank you!
                                </p>
                                    <p className='text'>
                                        Group Members:
                                </p>
                                    <p className='text'>
                                        Armand Alvarez, Scott Kramarz, Jon Navas, Yitzak Hernandez, Drew Corbeil
                                </p>
                                    <p className='text'>
                                        Sponsor: Peter Smith
                                </p>
                                </Col>
                                <Col md={6} mdPull={6}>
                                    <Thumbnail src={require('./Images/workers2.png')}></Thumbnail>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default About;