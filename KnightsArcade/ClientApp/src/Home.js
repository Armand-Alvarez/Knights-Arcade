import React, { Component } from 'react';
import './App.css';
import './BodyWrap.css';
import NaviBar from './Components/NavBar';
import { Jumbotron, Button } from 'react-bootstrap';
import GameSlides from './Components/GameSlides';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import Footer from './Components/Footer';
Amplify.configure(awsmobile);



class Home extends Component {

    render() {
        return (
            <div>
                <div className="BodyWrap">
                    <div className="bg">
                        <NaviBar className="nav" box={"home"} />
                        <Jumbotron className="Jumbo">
                            <h1 className="header"> Knights Arcade</h1>
                            <p>Play / Share / Showcase</p>
                            <p><a href='/Locations'><Button bsStyle="primary" className="location-button">Find An Arcade Machine</Button></a></p>
                        </Jumbotron>
                        <GameSlides className="slides" />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Home;