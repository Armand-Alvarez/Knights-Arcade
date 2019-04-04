import React, { Component } from 'react';
import { Button, Grid, Col, Row, Table } from 'react-bootstrap';
import './CollapsibleData.css';



export default class CollapsibleData extends Component {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);

        this.state = {
            open: false
        };
    }

    handleOpen(e) {
        this.setState({ open: true });
    }
    handleClose(e) {
        this.setState({ open: false });
    }

    render(props) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
/*      var date0 = new Date(this.props.testlogs[0].testlogDatetimeUtc);
        var date1 = new Date(this.props.testlogs[1].testlogDatetimeUtc);
        var date2 = new Date(this.props.testlogs[2].testlogDatetimeUtc); */

        if (this.state.open) {
            if (this.props.testlogs.length === 3) {
                return (
                    <div>
                        <Button onClick={this.handleClose}>Test Logs ˅</Button>
                        <Table striped bordered responsive condensed className="collapsibleTable">
                            <thead>
                                <tr>
                                    <th>Log #</th>
                                    <th>Log Entry</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                <td>{this.props.testlogs[0].testlogAttempt}</td>
                                <td>{this.props.testlogs[0].testlogLog}</td>
                                <td>{this.props.testlogs[0].testlogDatetimeUtc}</td>
                            </tbody>
                            <tbody>
                                <td>{this.props.testlogs[1].testlogAttempt}</td>
                                <td>{this.props.testlogs[1].testlogLog}</td>
                                <td>{this.props.testlogs[1].testlogDatetimeUtc}</td>
                            </tbody>
                            <tbody>
                                <td>{this.props.testlogs[2].testlogAttempt}</td>
                                <td>{this.props.testlogs[2].testlogLog}</td>
                                <td>{this.props.testlogs[2].testlogDatetimeUtc}</td>
                            </tbody>
                        </Table>
                    </div>
                );
            }
            if (this.props.testlogs.length === 2) {
                return (
                    <div>
                        <Button onClick={this.handleClose}>Test Logs ˅</Button>
                        <Table striped bordered responsive condensed className="collapsibleTable">
                            <thead>
                                <tr>
                                    <th>Log #</th>
                                    <th>Log Entry</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                <td>{this.props.testlogs[0].testlogAttempt}</td>
                                <td>{this.props.testlogs[0].testlogLog}</td>
                                <td>{this.props.testlogs[0].testlogDatetimeUtc}</td>
                            </tbody>
                            <tbody>
                                <td>{this.props.testlogs[1].testlogAttempt}</td>
                                <td>{this.props.testlogs[1].testlogLog}</td>
                                <td>{this.props.testlogs[1].testlogDatetimeUtc}</td>
                            </tbody>
                        </Table>
                    </div>
                );
            }
            if (this.props.testlogs.length === 1) {
                return (
                    <div>
                        <Button onClick={this.handleClose}>Test Logs ˅</Button>
                        <Table striped bordered responsive condensed className="collapsibleTable">
                            <thead>
                                <tr>
                                    <th>Log #</th>
                                    <th>Log Entry</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                <td>{this.props.testlogs[0].testlogAttempt}</td>
                                <td>{this.props.testlogs[0].testlogLog}</td>
                                <td>{this.props.testlogs[0].testlogDatetimeUtc}</td>
                            </tbody>
                        </Table>
                    </div>
                );

            }
            
        }
        else {
            return (
                <Button className="collapsedButton" onClick={this.handleOpen}>Test Logs ></Button>
                )
        }
    }

}