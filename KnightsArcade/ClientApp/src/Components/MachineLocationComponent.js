import React, { Component } from 'react'
import { Panel } from 'react-bootstrap';

export class MachineLocationComponent extends Component {
    constructor (props) {
        super (props);

        this.state = {
            arcadeMachineId: 0,
            arcadeMachineAddress: '',
            arcadeMachineRoom: '',
            arcadeMachineCoords: '',
            arcadeMachineDescription: ''
        };
    }

    render() {

        const id = this.props.machineData.arcadeMachineId;
        const address = this.props.machineData.arcadeMachineAddress;
        const room = this.props.machineData.arcadeMachineRoom;
        const coords = this.props.machineData.arcadeMachineCoords;
        const description = this.props.machineData.arcadeMachineDescription;

        return (
            <div>
                <Panel>
                    <Panel.Heading><p>Machine: {id}</p></Panel.Heading>
                    <Panel.Body>
                        <p>Address = {address}</p>
                        <p>Room = {room}</p>
                        <p>Coordinates = {coords}</p>
                        <p>Location Description = {description}</p>
                    </Panel.Body>
                </Panel>
            </div>
        )
    }
}

export default MachineLocationComponent