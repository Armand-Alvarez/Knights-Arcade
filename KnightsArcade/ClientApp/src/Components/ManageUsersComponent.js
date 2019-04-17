import React, { Component } from 'react'
import { Panel, Button, ButtonToolbar, Label, Image } from 'react-bootstrap';
import axios from 'axios'
import { Storage, Auth } from 'aws-amplify';


export class ManageUsersComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imgName: '',
            imgUrl: '',
            email: ''
        };


    }

    componentDidMount() {
        const imgPath = this.props.userData.userImagePath;
        Storage.get(imgPath)
            .then(result => {
                this.setState({
                    imgName: this.props.userData.userImg,
                    imgUrl: result
                });
            })
            .catch(err => console.log(err));
    }

    // todo: add delete to swagger
    // todo: add updateFunc & frontend changes (see ManageGamesComponent.js delete func)
    handleDelete() {
    }

    // todo: add promote to swagger
    handlePromote() {
    }

    render() {

        const username = this.props.userData.username;
        const firstName = this.props.userData.userFirstName;
        const lastName = this.props.userData.userLastName;

        return (
            <div style={{ marginBottom: 10 }}>
                <Panel style={{ marginBottom: 10, backgroundColor: '#242424' }}>
                    <Panel.Heading style={{ backgroundColor: '#4c4c4c', color: '#fff' }}><p>{username}</p><p>{firstName} {lastName}</p></Panel.Heading>
                    <Panel.Body>
                        <Image width={240} height={135} src={this.state.imgUrl} />
                        <p>Major: {this.props.userData.userMajor}</p>
                        <p></p>

                        <ButtonToolbar>
                            {/* Button allows Admin to promote a user to admin */}
                            <Button
                                onClick={this.handlePromote}
                                bsStyle="success">
                                Promote To Admin
              </Button>

                            {/* Button allows Admin to delete a user */}
                            <Button
                                onClick={this.handleDelete}
                                bsStyle="danger">
                                Delete
              </Button>

                            <div className='button__container'>
                            </div>
                        </ButtonToolbar>
                    </Panel.Body>
                </Panel>
            </div>
        )
    }
}

export default ManageUsersComponent
