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
        this.handleCoordsChange = this.handleCoordsChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleMarkerChange = this.handleMarkerChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.removeMachine = this.removeMachine.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.cancelNew = this.cancelNew.bind(this);
        this.fail = this.fail.bind(this);

        if (this.props.arcadeMachine.arcadeMachineId === -1) {
            this.state = {
                editable: true,
                arcadeMachineId: this.props.arcadeMachine.arcadeMachineId,
                arcadeMachineAddress: this.props.arcadeMachine.arcadeMachineAddress,
                arcadeMachineName: this.props.arcadeMachine.arcadeMachineName,
                arcadeMachineCoords: this.props.arcadeMachine.arcadeMachineCoords,
                arcadeMachineRoom: this.props.arcadeMachine.arcadeMachineRoom,
                arcadeMachineDescription: this.props.arcadeMachine.arcadeMachineDescription,
                arcadeMachineMarker: this.props.arcadeMachine.arcadeMachineMarker,
                arcadeMachineAddressTemp: this.props.arcadeMachine.arcadeMachineAddress,
                arcadeMachineNameTemp: this.props.arcadeMachine.arcadeMachineName,
                arcadeMachineCoordsTemp: this.props.arcadeMachine.arcadeMachineCoords,
                arcadeMachineRoomTemp: this.props.arcadeMachine.arcadeMachineRoom,
                arcadeMachineDescriptionTemp: this.props.arcadeMachine.arcadeMachineDescription,
                arcadeMachineMarkerTemp: this.props.arcadeMachine.arcadeMachineMarker,
                isNew: true,
                errorMsg: "",
                removeModal: false,
                errorModal: false
            }
        } else {
            this.state = {
                editable: false,
                arcadeMachineId: this.props.arcadeMachine.arcadeMachineId,
                arcadeMachineAddress: this.props.arcadeMachine.arcadeMachineAddress,
                arcadeMachineName: this.props.arcadeMachine.arcadeMachineName,
                arcadeMachineCoords: this.props.arcadeMachine.arcadeMachineCoords,
                arcadeMachineRoom: this.props.arcadeMachine.arcadeMachineRoom,
                arcadeMachineDescription: this.props.arcadeMachine.arcadeMachineDescription,
                arcadeMachineMarker: this.props.arcadeMachine.arcadeMachineMarker,
                arcadeMachineAddressTemp: this.props.arcadeMachine.arcadeMachineAddress,
                arcadeMachineNameTemp: this.props.arcadeMachine.arcadeMachineName,
                arcadeMachineCoordsTemp: this.props.arcadeMachine.arcadeMachineCoords,
                arcadeMachineRoomTemp: this.props.arcadeMachine.arcadeMachineRoom,
                arcadeMachineDescriptionTemp: this.props.arcadeMachine.arcadeMachineDescription,
                arcadeMachineMarkerTemp: this.props.arcadeMachine.arcadeMachineMarker,
                isNew: false,
                errorMsg: "",
                removeModal: false,
                errorModal: false
            };
        }
    }

    fail(msg, err) {
        this.setState({ errorModal: true });
        this.setState({ errorMsg: (msg + err) });
    }

    makeEditable(e) {
        this.setState({ editable: true });
    }

    saveChanges(e) {
        this.setState({ editable: false });

        this.setState({ arcadeMachineAddress: this.state.arcadeMachineAddressTemp });
        this.setState({ arcadeMachineRoom: this.state.arcadeMachineRoomTemp });
        this.setState({ arcadeMachineDescription: this.state.arcadeMachineDescriptionTemp });
        this.setState({ arcadeMachineName: this.state.arcadeMachineNameTemp });
        this.setState({ arcadeMachineCoords: this.state.arcadeMachineCoordsTemp });
        this.setState({ arcadeMachineMarker: this.state.arcadeMachineMarkerTemp });

        if (this.state.isNew) {
            const arcadeMachine = {
                arcadeMachineAddress: this.state.arcadeMachineAddressTemp,
                arcadeMachineRoom: this.state.arcadeMachineRoomTemp,
                arcadeMachineDescription: this.state.arcadeMachineDescriptionTemp,
                arcadeMachineCoords: this.state.arcadeMachineCoordsTemp,
                arcadeMachineName: this.state.arcadeMachineNameTemp,
                arcadeMachineMarker: this.state.arcadeMachineMarkerTemp
            }
            this.setState({ isNew: false });
            axios.post('api/v1/Restricted/rds/arcademachines/arcademachine', arcadeMachine, {
                headers: {
                    'Authorization': "Bearer " + Auth.user.signInUserSession.accessToken.jwtToken
                }
            }).then(res => {
                if (res.status < 400) {
                    const arcadeMachine = res.data;
                    this.setState({ arcadeMachineId: arcadeMachine.arcadeMachineId });
                    this.props.addLocation(arcadeMachine);
                    this.props.removeLocation(this.state.arcadeMachineId);
                }
                else {
                    this.fail("Location could not be added: Error:", res.status);
                }
            })
        }

        else {
            const arcadeMachine = {
                arcadeMachineId: this.state.arcadeMachineId,
                arcadeMachineAddress: this.state.arcadeMachineAddressTemp,
                arcadeMachineRoom: this.state.arcadeMachineRoomTemp,
                arcadeMachineDescription: this.state.arcadeMachineDescriptionTemp,
                arcadeMachineCoords: this.state.arcadeMachineCoordsTemp,
                arcadeMachineName: this.state.arcadeMachineNameTemp,
                arcadeMachineMarker: this.state.arcadeMachineMarkerTemp
            }
            axios.put('api/v1/Restricted/rds/arcademachines/arcademachine', arcadeMachine, {
                headers: {
                    'Authorization': "Bearer " + Auth.user.signInUserSession.accessToken.jwtToken
                }
            }).then(res => {
                if (res.status < 400) {

                }
                else {
                    this.fail("Location could not be saved: Error:", res.status);
                }
            })
        }
    }


    cancelChanges(e) {
        this.setState({ editable: false })
        this.setState({ arcadeMachineAddressTemp: this.state.arcadeMachineAddress });
        this.setState({ arcadeMachineRoomTemp: this.state.arcadeMachineRoom });
        this.setState({ arcadeMachineDescriptionTemp: this.state.arcadeMachineDescription });
        this.setState({ arcadeMachineNameTemp: this.state.arcadeMachineName });
        this.setState({ arcadeMachineCoordsTemp: this.state.arcadeMachineCoords });
        this.setState({ arcadeMachineMarkerTemp: this.state.arcadeMachineMarker });
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
                'Authorization': "Bearer " + Auth.user.signInUserSession.accessToken.jwtToken
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

    handleCoordsChange(e) {
        this.setState({ arcadeMachineCoordsTemp: e.target.value });
    }

    handleNameChange(e) {
        this.setState({ arcadeMachineNameTemp: e.target.value });
    }

    handleMarkerChange(e) {
        this.setState({ arcadeMachineMarkerTemp: e.target.value });
    }

    render(props) {
        if (this.state.isNew) {
            return (
                <div style={{ marginBottom: 10, border:'1px solid #fff', backgroundColor:'#242424' }}>
                    <Form horizontal>
                        <FormGroup controlId="ArcadeMachineName">
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Name
                            </Col>
                            <Col sm={10}>
                                <FormControl type="email" placeholder="Arcade Machine Name" value={this.state.arcadeMachineNameTemp} onChange={this.handleNameChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="ArcadeMachineAddress">
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Address
                            </Col>
                            <Col sm={10}>
                                <FormControl type="email" placeholder="Arcade Machine Address" value={this.state.arcadeMachineAddressTemp} onChange={this.handleAddressChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="ArcadeMachineCoords">
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Coords
                            </Col>
                            <Col sm={10}>
                                <FormControl type="email" placeholder="Arcade Machine Coords" value={this.state.arcadeMachineCoordsTemp} onChange={this.handleCoordsChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="ArcadeMachineMarker">
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Marker
                            </Col>
                            <Col sm={10}>
                                <FormControl type="email" placeholder="Arcade Machine Marker" value={this.state.arcadeMachineMarkerTemp} onChange={this.handleMarkerChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="ArcadeMachineRoom">
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Room
                            </Col>
                            <Col sm={10}>
                                <FormControl type="email" placeholder="Arcade Machine Room" value={this.state.arcadeMachineRoomTemp} onChange={this.handleRoomChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="ArcadeMachineDescription">
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Description
                            </Col>
                            <Col sm={10}>
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
                <div style={{ marginBottom: 10, border: '1px solid #fff', backgroundColor: '#242424' }}>
                    <Form horizontal>
                        <FormGroup controlId="ArcadeMachineName">
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Name
                            </Col>
                            <Col sm={10}>
                                <FormControl type="email" placeholder="Arcade Machine Name" value={this.state.arcadeMachineNameTemp} onChange={this.handleNameChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="ArcadeMachineAddress">
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Address
                            </Col>
                            <Col sm={10}>
                                <FormControl type="email" placeholder="Arcade Machine Address" value={this.state.arcadeMachineAddressTemp} onChange={this.handleAddressChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="ArcadeMachineCoords">
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Coords
                            </Col>
                            <Col sm={10}>
                                <FormControl type="email" placeholder="Arcade Machine Coords" value={this.state.arcadeMachineCoordsTemp} onChange={this.handleCoordsChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="ArcadeMachineMarker">
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Marker
                            </Col>
                            <Col sm={10}>
                                <FormControl type="email" placeholder="Arcade Machine Marker" value={this.state.arcadeMachineMarkerTemp} onChange={this.handleMarkerChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="ArcadeMachineRoom">
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Room
                            </Col>
                            <Col sm={10}>
                                <FormControl type="email" placeholder="Arcade Machine Room" value={this.state.arcadeMachineRoomTemp} onChange={this.handleRoomChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="ArcadeMachineDescription">
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Description
                            </Col>
                            <Col sm={10}>
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
                <div style={{ marginBottom: 10, border: '1px solid #fff', backgroundColor: '#242424' }}>
                    <Form horizontal>
                        <FormGroup controlId="ArcadeMachineName">
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Name
                            </Col>
                            <Col sm={10}>
                                <FormControl.Static>
                                    {this.state.arcadeMachineName}
                                </FormControl.Static>
                            </Col>
                        </FormGroup>
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
                                Arcade Machine Coords
                            </Col>
                            <Col sm={10}>
                                <FormControl.Static>
                                    {this.state.arcadeMachineCoords}
                                </FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Arcade Machine Marker
                            </Col>
                            <Col sm={10}>
                                <FormControl.Static>
                                    {this.state.arcadeMachineMarker}
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
                    <Popup
                        open={this.state.errorModal}
                        modal
                        closeOnDocumentClick={true}
                        lockScroll={true}
                    >
                        <div className="ReviewModal">
                            <span>Failed to add new location</span><br />
                            <span>Error: {this.state.errorCode}</span>
                        </div>
                    </Popup>
                </div>
            )
        }
    }
}

export default ArcadeMachineComponent