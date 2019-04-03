import React, { Component } from 'react';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';
import './Footer.css';

export default class Footer extends Component {
    constructor(props) {
        super(props);

    }

    render(props) {

        return (
            <Grid className="Footer" fluid>
                <Row style={{ marginLeft: 0, marginRight: 0, marginTop: 10, marginBottom: 10 }}>
                            <Col md={2} mdOffset={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <h2 className="FooterTitle">Footer</h2>
                            </Col>
                        </Row>
                    </Grid>
           );
    }
}