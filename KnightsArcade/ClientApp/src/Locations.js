import React, { Component } from 'react';
import NaviBar from './Components/NavBar';
import Footer from './Components/Footer';
import { Grid, Row, Col, Jumbotron, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios'
import MachineComp from './Components/MachineLocationComponent';
import GoogleMapReact from 'google-map-react'
import './BodyWrap.css';

const AnyReactComponent = ({ text }) => (
    <div style={{
        color: 'white',
        background: 'grey',
        padding: '15px 10px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        transform: 'translate(-50%, -50%)'
    }}>
        {text}
    </div>
);

export class Locations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            machines: [],
            machineLabels: [],
            key: { key: "AIzaSyCWK9AGTA0mhRxENjQSxzkw5w1A-lyWm_I" },
            places: [],
            center: { lat: 28.5965534, lng: -81.2001603 },
            zoom: 15
        };
    }

    componentDidMount() {

        // Get the arcade machine locations
        axios.get('/api/v1/Public/rds/arcademachines/allarcademachines')
            .then(res => {
                const machines = res.data;
                this.setState({ machines: machines });
                const places = machines.map(x => x.arcadeMachineCoords.split(","));
                const machineLabels = machines;
                machineLabels.forEach(function (machine) {
                    const places = machine.arcadeMachineCoords.split(",");
                    delete machine.arcadeMachineCoords;
                    machine.places = places;
                });
                this.setState({ machineLabels: machineLabels });
                console.log(machineLabels)
            })
    }

    render() {
        return (
            <div className='Locations'>
                <div className='BodyWrap'>
                    <NaviBar box={"location"}/>
                    <Jumbotron style={{ marginBottom: 10, backgroundColor: '#272727' }}>
                        <Grid fluid>
                            <Row>
                                <Col sm={6} smOffset={3}>
                                    <h1>Arcade Machine Locations</h1>
                                </Col>
                            </Row>
                        </Grid>
                    </Jumbotron>
                    <ListGroup style={{ backgroundColor: '#121212', margin:'0' }}>
                        <ListGroupItem style={{ backgroundColor:'#121212', border:'0' }}> {
                            this.state.machines.map((machine) => {
                                return <MachineComp machineData={machine} />
                            })
                        }
                            <Grid>
                                <div style={{ height: '50vh', width: '100%' }}>
                                    <GoogleMapReact
                                        bootstrapURLKeys={this.state.key}
                                        defaultCenter={this.state.center}
                                        defaultZoom={this.state.zoom}
                                    >

                                        {this.state.machineLabels.map((machine) => (
                                            <AnyReactComponent
                                                lat={machine.places[0]}
                                                lng={machine.places[1]}
                                                text={machine.arcadeMachineMarker}
                                            />
                                        ))}

                                    </GoogleMapReact>
                                </div>
                            </Grid>
                        </ListGroupItem>
                    </ListGroup>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Locations