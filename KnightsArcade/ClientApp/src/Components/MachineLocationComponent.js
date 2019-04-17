import React, { Component } from 'react'
import { Panel, Grid } from 'react-bootstrap';

export class MachineLocationComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            arcadeMachineId: 0,
            arcadeMachineAddress: '',
            arcadeMachineRoom: '',
            arcadeMachineCoords: '',
            arcadeMachineDescription: '',
            arcadeMachineName: ''
        };
    }

    render() {

        const id = this.props.machineData.arcadeMachineId;
        const address = this.props.machineData.arcadeMachineAddress;
        const room = this.props.machineData.arcadeMachineRoom;
        const coords = this.props.machineData.arcadeMachineCoords;
        const description = this.props.machineData.arcadeMachineDescription;
        const name = this.props.machineData.arcadeMachineName;

        return (
            <div style={{ marginBottom: 10, backgroundColor:'#121212' }}>
                <Grid>
                    <Panel style={{ marginBottom: 10, backgroundColor: '#242424' }}>
                        <Panel.Heading style={{backgroundColor:'#4c4c4c', color:'#fff'}}><b>{name}</b></Panel.Heading>
                        <Panel.Body>
                            <p>{room}</p>
                            <p>{address}</p>
                            <p>{description}</p>
                        </Panel.Body>
                    </Panel>
                </Grid>
            </div>
        )
    }
}

export default MachineLocationComponent