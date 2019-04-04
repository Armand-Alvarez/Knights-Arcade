import React, { Component } from 'react';
import { Grid, Row, Col, Jumbotron, Image } from 'react-bootstrap';
import './Footer.css';

export default class Footer extends Component {
    constructor(props) {
        super(props);

    }

    render(props) {

        return (
            <Grid className="Footer" fluid>
                <Row style={{ marginLeft: 0, marginRight: 0, marginTop: 10, marginBottom: 10 }}>
                    <Col md={1} mdOffset={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Image width={50} height={50} src={require("../Images/knightsicon.ico")} />
                    </Col>
                    <Col md={4} className="FooterText">
                        <p>Knights Arcade: A University Of Central Florida Senior Design Project.</p>
                    </Col>
                </Row>
            </Grid>
        );
    }
}   