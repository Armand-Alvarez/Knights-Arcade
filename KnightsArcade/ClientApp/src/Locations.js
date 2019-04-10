import React, { Component } from 'react';
import NaviBar from './Components/NavBar';
import Footer from './Components/Footer';
//import {Map} from 'google-maps-react';
import { Grid, Row, Col, Jumbotron , ListGroup, ListGroupItem} from 'react-bootstrap';


export class Locations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            machines: 2
        };
    }     

    render() {
        return(
            <div className='Locations'>
                <NaviBar/>
                <Jumbotron style={{marginBottom: 10, marginTop: 10}}>
                    <Grid fluid>
                    <Row>
                    <Col sm={6} smOffset={3}>
                    <h1>Arcade Machine Locations</h1>
                    </Col>
                    </Row>
                    </Grid>
                </Jumbotron>

                <div style={{ width: 500, height: 500 }} id="map" />

                <ListGroup>
                    <ListGroupItem>
                        <p>Address: 123 Street</p>
                        <p>Building: A Building</p>
                        <p>Room Number: 123</p>
                    </ListGroupItem>

                    <ListGroupItem>
                        <p>Address: 123 Street</p>
                        <p>Building: A Building</p>
                        <p>Room Number: 123</p>
                    </ListGroupItem>
                </ListGroup>
                
                <Footer/>
            </div>
        )
    }
}

export default Locations