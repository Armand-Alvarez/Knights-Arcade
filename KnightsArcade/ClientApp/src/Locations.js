import React, { Component } from 'react';
import NaviBar from './Components/NavBar';
import Footer from './Components/Footer';
import { Grid, Row, Col, Jumbotron , ListGroup, ListGroupItem} from 'react-bootstrap';
import axios from 'axios'
import MachineComp from './Components/MachineLocationComponent';


export class Locations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            machines: []
        };
    }    
    
    componentDidMount() {

        // Get the arcade machine locations
        axios.get('/api/v1/Public/rds/arcademachines/allarcademachines')
            .then(res => {
                const machines = res.data;
                this.setState({ machines: machines });
            })
    }

    initMap() {
    // The location of Uluru
    var uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 4, center: uluru });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: uluru, map: map });
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

                <ListGroup>
                    <ListGroupItem> {
                        this.state.machines.map((machine) => {
                            return <MachineComp machineData={machine} />
                        })   
                    }
                    </ListGroupItem> 
                </ListGroup>

                <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWK9AGTA0mhRxENjQSxzkw5w1A-lyWm_I&callback=initMap"
                    type="text/javascript"></script>

                <div>{this.state.initMap()}</div>

                <Footer scrolls={true}/>
            </div>
        )
    }
}

export default Locations