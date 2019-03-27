import React, { Component } from 'react';
import NaviBar from './Components/NavBar';
import { Button, Grid, Row, Col, Image, FormGroup, FormControl, ControlLabel, Panel, Form, ButtonToolbar } from 'react-bootstrap';
import './MyProfile.css';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import { Storage } from 'aws-amplify';
import { InputGroup, DropdownButton, MenuItem, Jumbotron } from 'react-bootstrap';
import ProfileSubmissionCard from './Components/ProfileSubmissionCard';

class MyProfile extends Component {
  
  constructor(props, context) {
    super(props, context);

    this.handleEditName = this.handleEditName.bind(this);
    this.handleEditMajor = this.handleEditMajor.bind(this);

    this.state = {
      username:"",
      nameOpen: false,
      fullName:"",
      firstName:"",
      lastName:"",
      majorOpen: false,
      major:"",
      imgOpen: false,
      imgURL: "",
      imgFile:"",
        imgName: "",
      imgSrc: "",
        games: [],
      };

      Auth.currentAuthenticatedUser({
          bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      }).then((response) => {
          this.setState({ username: response.username })
      }).then(() => {
            axios.get('/api/v1/Public/rds/users/user?username=' + this.state.username)
                .catch(err => console.log(err))
                .then(async (response) => {
                console.log('/api/v1/Public/rds/users/user?username=' + this.state.username)
                console.log(response)
                if (response.status === 204) {
                    const user = {
                        username: this.state.username,
                        userFirstName: "First ",
                        userLastName: "Last Name",
                        userImagePath: "USERS/default/defaultAvatar.png",
                        userMajor: "Major"
                    }
                    axios.post('/api/v1/Restricted/rds/users/user', user).catch(err => console.log(err))
                        .then(() => window.location.reload());
                }
                else if (response.status === 200) {
                    this.setState({
                        firstName: response.data.userFirstName,
                        lastName: response.data.userLastName,
                        fullName: response.data.userFirstName + " " + response.data.userLastName,
                        major: response.data.userMajor,
                        imgSrc: await Storage.get(response.data.userImagePath),
                        imgURL: response.data.userImagePath
                    })
                }
            });
        })
          .then(() => {
              axios.get('/api/v1/Public/rds/submissions/allcreatorsubmissions?developerName=' + this.state.username)
                  .catch()
                  .then((response) => {
                      this.setState({ games: response.data });
                      console.log(this.state.games);
                  });
          })
          .catch(err => console.log(err))
  }

  handleEditName() {
      this.setState({ nameOpen: !this.state.nameOpen });
  }

  handleEditMajor() {
      this.setState({ majorOpen: !this.state.majorOpen });
  }

  handleEditImg()
  {
      this.setState({ imgOpen: !this.state.imgOpen });
  }

  handleFirstNameChange(e){
      console.log(e.target);
      this.setState({ firstName: e.target.value });
  }

  handleLastNameChange(e){
      this.setState({ lastName: e.target.value });
  }

  handleMajorNameChange(e){
      this.setState({ major: e.target.value });
  }

  handleImgPathChange(e){
    const file = e.target.files[0]
    this.setState({ 
        imgFile: file,
        imgName: file.name,
        imgURL: "USERS/" + this.state.username + "/" + file.name
    });
  }

    handleSave() {
        document.body.style.cursor = 'wait'
      console.log(this.state.username)
      const user = {
          username: this.state.username,
          userFirstName: this.state.firstName,
          userLastName: this.state.lastName,
          userImagePath: this.state.imgURL,
          userMajor: this.state.major
      }
      axios.put('/api/v1/Restricted/rds/users/user', user)
          .then((response) => {
              console.log(response);
          })
          .then(() => { window.location.reload(); })
          .catch((err) => {
              console.log(err);
          });
  }

  handleSaveImg()
  {
      Storage.put(this.state.imgURL, this.state.imgFile)
          .then(() => {
              console.log('successfully saved file!');
              this.handleSave();
          })
          .catch(err => {
              console.log('error uploading image0 file!', err);
              throw (err);
          })
      return;
    }

  render() {
    return (
      <div className = 'FullPage'>
        <NaviBar/>
        <Grid fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row style={{ marginLeft: 0, marginRight: 0 }}>
        <Col md={6} mdOffset={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Panel>
        <Panel.Body>
        <Grid fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col md={8} mdOffset={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <h1><b>Profile</b></h1>
            </Col>
          </Row>
          <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col md={8} mdOffset={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <hr className="my-profile__hr1" />
            </Col>
          </Row>
          <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col className="my-profile__avatar-col" md={4} mdOffset={4} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <Image className="my-profile__avatar" src={this.state.imgSrc}/>
            </Col>
          </Row>
          <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col className="my-profile__file-chooser-col" md={4} mdOffset={4} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <Button className="my-profile__pic-button" bsSize="small" onClick={this.handleEditImg.bind(this)} bsStyle="primary"><b>Change Profile Picture</b></Button>
            </Col>
          </Row>
          <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col md={8} mdOffset={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <Panel className="my-profile__collapsed-panel" id="collapsible-panel-example-1" expanded={this.state.imgOpen}>
                <Panel.Collapse>
                  <Panel.Body>
                    <Form horizontal>
                      <FormGroup controlId="formHorizontalEmail">
                        <Col sm={4}>
                          <ControlLabel className = 'text'>Upload Profile Picture</ControlLabel>
                          <FormControl placeholder="Profile Icon" type="file" onChange={this.handleImgPathChange.bind(this)} />
                        </Col>
                      </FormGroup>
                      <FormGroup>
                        <Col smOffset={5} sm={6}>
                           <ButtonToolbar>
                              <Button bsStyle="primary" onClick={this.handleSaveImg.bind(this)}>Save</Button>
                            </ButtonToolbar>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>
            </Col>
          </Row>
          <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col md={8} mdOffset={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <hr className="my-profile__hr" />
            </Col>
          </Row>
          <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col className="my-profile__section-col" md={2} mdOffset={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <h5 className="my-profile__variable-name"><b>Developer Name</b></h5>
            </Col>
            <Col className="my-profile__variable-col" md={4} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <h5 className="my-profile__variable-val"><b>{this.state.username}</b></h5>
            </Col>
          </Row>
          <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col className="my-profile__section-col" md={2} mdOffset={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <h5 className="my-profile__variable-name"><b>Name</b></h5>
            </Col>
            <Col className="my-profile__variable-col" md={4} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <h5 className="my-profile__variable-val"><b>{this.state.fullName}</b></h5>
            </Col>
            <Col className="my-profile__link-col" md={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <Button bsStyle="link" bsSize="medium" onClick={this.handleEditName}>Edit</Button>
            </Col>
          </Row>
          <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col md={8} mdOffset={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <Panel className="my-profile__collapsed-panel" id="collapsible-panel-example-1" expanded={this.state.nameOpen}>
                <Panel.Collapse>
                  <Panel.Body>
                    <Form horizontal>
                      <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2} smOffset={3}>
                          First
                        </Col>
                        <Col sm={4}>
                          <FormControl type="text" placeholder="First Name" onChange={this.handleFirstNameChange.bind(this)}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2} smOffset={3}>
                          Last
                        </Col>
                        <Col sm={4}>
                          <FormControl type="text" placeholder="Last Name" onChange={this.handleLastNameChange.bind(this)}/>
                        </Col>
                      </FormGroup>
                      <FormGroup>
                        <Col smOffset={5} sm={6}>
                           <ButtonToolbar>
                              <Button bsStyle="primary" onClick={this.handleSave.bind(this)}>Save</Button>
                            </ButtonToolbar>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>
            </Col>
          </Row>
          <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col className="my-profile__section-col" md={2} mdOffset={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <h5 className="my-profile__variable-name"><b>Major</b></h5>
            </Col>
            <Col className="my-profile__variable-col" md={4} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <h5 className="my-profile__variable-val"><b>{this.state.major}</b></h5>
            </Col>
            <Col className="my-profile__link-col" md={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <Button bsStyle="link" bsSize="medium" onClick={this.handleEditMajor}>Edit</Button>
            </Col>
          </Row>
          <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col md={8} mdOffset={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <Panel className="my-profile__collapsed-panel" id="collapsible-panel-example-1" expanded={this.state.majorOpen}>
                <Panel.Collapse>
                  <Panel.Body>
                    <Form horizontal>
                      <FormGroup controlId="formHorizontalEmail">
                        <Col sm={4}>
                          <FormControl type="text" placeholder="Major" onChange={this.handleMajorNameChange.bind(this)}/>
                        </Col>
                      </FormGroup>
                      <FormGroup>
                        <Col smOffset={5} sm={6}>
                           <ButtonToolbar>
                              <Button bsStyle="primary" onClick={this.handleSave.bind(this)} >Save</Button>
                            </ButtonToolbar>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>
            </Col>
          </Row>
          <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col md={8} mdOffset={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <hr className="my-profile__hr" />
            </Col>
          </Row>
          <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col md={8} mdOffset={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <h3><b>My Games</b></h3>
            </Col>
          </Row>
            <Row>
                <div className="games-page__game-list">
                    {
                        this.state.games.map((game) => {
                            return <ProfileSubmissionCard gameData={game} />
                        })
                    }
                </div>
            </Row>

        </Grid>
        </Panel.Body>
        </Panel>
        </Col>
        </Row>
        </Grid>
      </div>
    )
  }
}

export default MyProfile;