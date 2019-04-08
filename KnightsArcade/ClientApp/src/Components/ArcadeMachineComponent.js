import React, { Component } from 'react'
import { Form, FormGroup, FormControl, ControlLabel, Button, Col } from 'react-bootstrap';
import { Storage } from 'aws-amplify';
import axios from 'axios';
import { Auth, AuthClass } from 'aws-amplify';
import Popup from 'reactjs-popup';

export class ArcadeMachineComponent extends Component {

    constructor(props) {
        super(props);

        this.saveChanges = this.saveChanges.bind(this);
        this.makeEditable = this.makeEditable.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleRoomChange = this.handleRoomChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.removeMachine = this.removeMachine.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.cancelNew = this.cancelNew.bind(this);

        if (this.props.arcadeMachine.arcadeMachineId === -1) {
            this.state = {
                editable: true,
                arcadeMachineId: this.props.arcadeMachine.arcadeMachineId,
                arcadeMachineAddress: this.props.arcadeMachine.arcadeMachineAddress,
                arcadeMachineRoom: this.props.arcadeMachine.arcadeMachineRoom,
                arcadeMachineDescription: this.props.arcadeMachine.arcadeMachineDescription,
                arcadeMachineAddressTemp: this.props.arcadeMachine.arcadeMachineAddress,
                arcadeMachineRoomTemp: this.props.arcadeMachine.arcadeMachineRoom,
                arcadeMachineDescriptionTemp: this.props.arcadeMachine.arcadeMachineDescription,
                isNew: true,
                removeModal: false
            }
        } else {
            this.state = {
                editable: false,
                arcadeMachineId: this.props.arcadeMachine.arcadeMachineId,
                arcadeMachineAddress: this.props.arcadeMachine.arcadeMachineAddress,
                arcadeMachineRoom: this.props.arcadeMachine.arcadeMachineRoom,
                arcadeMachineDescription: this.props.arcadeMachine.arcadeMachineDescription,
                arcadeMachineAddressTemp: this.props.arcadeMachine.arcadeMachineAddress,
                arcadeMachineRoomTemp: this.props.arcadeMachine.arcadeMachineRoom,
                arcadeMachineDescriptionTemp: this.props.arcadeMachine.arcadeMachineDescription,
                isNew: false,
                removeModal: false
            };
        }
    }

    makeEditable(e) {
        this.setState({ editable: true });
    }

    saveChanges(e) {
        this.setState({ editable: false });

        this.setState({ arcadeMachineAddress: this.state.arcadeMachineAddressTemp });
        this.setState({ arcadeMachineRoom: this.state.arcadeMachineRoomTemp });
        this.setState({ arcadeMachineDescription: this.state.arcadeMachineDescriptionTemp });

        if (this.state.isNew) {
            const arcadeMachine = {
                arcadeMachineAddress: this.state.arcadeMachineAddressTemp,
                arcadeMachineRoom: this.state.arcadeMachineRoomTemp,
                arcadeMachineDescription: this.state.arcadeMachineDescriptionTemp,
                arcadeMachineCoords: null
            }
            console.log(arcadeMachine);
            this.setState({ isNew: false });
            axios.post('api/v1/Restricted/rds/arcademachines/arcademachine', arcadeMachine, {
                headers: {
                    'Authorization': Auth.user.signInUserSession.accessToken.jwtToken
                }
            }).then(res => {
                if (res.status < 400) {
                    const arcadeMachine = res.data;
                    this.setState({ arcadeMachineId: arcadeMachine.arcadeMachineId });
                    this.props.addLocation(arcadeMachine);
                    this.props.removeLocation(this.state.arcadeMachineId);
                    alert(res.status)
                }
                else {
                    alert(res.status);
                }
            })
        }

        else {
            const arcadeMachine = {
                arcadeMachineId: this.state.arcadeMachineId,
                arcadeMachineAddress: this.state.arcadeMachineAddressTemp,
                arcadeMachineRoom: this.state.arcadeMachineRoomTemp,
                arcadeMachineDescription: this.state.arcadeMachineDescriptionTemp,
                arcadeMachineCoords: null
            }
            console.log(arcadeMachine);
            axios.put('api/v1/Restricted/rds/arcademachines/arcademachine', arcadeMachine, {
                headers: {
                    'Authorization': Auth.user.signInUserSession.accessToken.jwtToken
                }
            }).then(res => {
                if (res.status < 400) {
                    alert(res.status);
                }
                else {
                    alert(res.status);
                }
            })
        }
    }

    cancelChanges(e) {
        this.setState({ editable: false })
        this.setState({ arcadeMachineAddressTemp: this.state.arcadeMachineAddress });
        this.setState({ arcadeMachineRoomTemp: this.state.arcadeMachineRoom });
        this.setState({ arcadeMachineDescriptionTemp: this.state.arcadeMachineDescription });
    }
    cancelNew(e) {
        this.props.removeLocation(this.state.arcadeMachineId);
    }
    handleDelete(e) {
        this.setState({ removeModal: true });
    }
    hideModal(e) {
        this.setState({ removeModal: false });
    }

    removeMachine(e) {
        axios.delete('/api/v1/Restricted/rds/arcademachines/arcademachine?arcadeMachineId=' + this.state.arcadeMachineId, {
            headers: {
                'Authorization': Auth.user.signInUserSession.accessToken.jwtToken
            }
        })
            .then(res => {
                if (res.status < 400) {
                    this.props.removeLocation(this.state.arcadeMachineId);
                }
            })
        this.setState({ removeModal: false });
    }

    handleAddressChange(e) {
        this.setState({ arcadeMachineAddressTemp: e.target.value })
    }

    handleRoomChange(e) {
        this.setState({ arcadeMachineRoomTemp: e.target.value });
    }

    handleDescriptionChange(e) {
        this.setState({ arcadeMachineDescriptionTemp: e.target.value });
    }

    render(props) {
        if (this.state.isNew) {
            return (
                <div>
                    <Form horizontal>
                        <FormGroup controlId="ArcadeMachineAddress">
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Address
                            </Col>
                            <Col sm={6}>
                                <FormControl type="email" placeholder="Arcade Machine Address" value={this.state.arcadeMachineAddressTemp} onChange={this.handleAddressChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="ArcadeMachineRoom">
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Room
                            </Col>
                            <Col sm={6}>
                                <FormControl type="email" placeholder="Arcade Machine Room" value={this.state.arcadeMachineRoomTemp} onChange={this.handleRoomChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="ArcadeMachineDescription">
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Description
                            </Col>
                            <Col sm={6}>
                                <FormControl type="email" placeholder="Arcade Machine Description" value={this.state.arcadeMachineDescriptionTemp} onChange={this.handleDescriptionChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={5} smOffset={7}>
                                <Button bsStyle="warning" className="arcadeButton" onClick={this.cancelNew}>Cancel</Button>
                                <Button bsStyle="primary" className="arcadeButton" onClick={this.saveChanges}>Commit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            )
        } else if (this.state.editable) {
            return (
                <div>
                    <Form horizontal>
                        <FormGroup controlId="ArcadeMachineAddress">
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Address
                            </Col>
                            <Col sm={6}>
                                <FormControl type="email" placeholder="Arcade Machine Address" value={this.state.arcadeMachineAddressTemp} onChange={this.handleAddressChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="ArcadeMachineRoom">
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Room
                            </Col>
                            <Col sm={6}>
                                <FormControl type="email" placeholder="Arcade Machine Room" value={this.state.arcadeMachineRoomTemp} onChange={this.handleRoomChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="ArcadeMachineDescription">
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Description
                            </Col>
                            <Col sm={6}>
                                <FormControl type="email" placeholder="Arcade Machine Description" value={this.state.arcadeMachineDescriptionTemp} onChange={this.handleDescriptionChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={5} smOffset={7}>
                                <Button bsStyle="warning" className="arcadeButton" onClick={this.cancelChanges}>Cancel</Button>
                                <Button bsStyle="primary" className="arcadeButton" onClick={this.saveChanges}>Save</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Form horizontal>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Address
                            </Col>
                            <Col sm={8}>
                                <FormControl.Static>
                                    {this.state.arcadeMachineAddress}
                                </FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Room
                            </Col>
                            <Col sm={8}>
                                <FormControl.Static>
                                    {this.state.arcadeMachineRoom}
                                </FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Description
                            </Col>
                            <Col sm={8}>
                                <FormControl.Static>
                                    {this.state.arcadeMachineDescription}
                                </FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={5} smOffset={7}>
                                <Button bsStyle="danger" className="arcadeButton" onClick={this.handleDelete}>Remove</Button>
                                <Button bsStyle="primary" className="arcadeButton" onClick={this.makeEditable}>Edit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                    <Popup
                        open={this.state.removeModal}
                        modal
                        closeOnDocumentClick={true}
                        lockScroll={true}
                    >
                        <div className="ReviewModal">
                            <span>Are you sure you want to remove this location?</span><br></br>
                            <Button bsStyle="danger" onClick={this.removeMachine}>Yes</Button><br></br>
                            <Button bsStyle="warning" onClick={this.hideModal}>No</Button>
                        </div>
                    </Popup>
                </div>
            )
        }
    }
}

export default ArcadeMachineComponent