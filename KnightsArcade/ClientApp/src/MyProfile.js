import React, { Component } from 'react';
import NaviBar from './Components/NavBar';
import { Button, Thumbnail, Grid, Row, Col, Image, FormGroup, FormControl, ControlLabel, ButtonGroup, Label, Panel, Form, ButtonToolbar } from 'react-bootstrap';
import './MyProfile.css';

class MyProfile extends Component {
  
  constructor(props, context) {
    super(props, context);

    this.handleEditUsername = this.handleEditUsername.bind(this);
    this.handleEditName = this.handleEditName.bind(this);
    this.handleEditMajor = this.handleEditMajor.bind(this);

    this.state = {
      usernameOpen: false,
      nameOpen: false,
      majorOpen: false
    };
  }

  handleEditUsername() {
      this.setState({ usernameOpen: !this.state.usernameOpen });
  }

  handleEditName() {
      this.setState({ nameOpen: !this.state.nameOpen });
  }

  handleEditMajor() {
      this.setState({ majorOpen: !this.state.majorOpen });
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
              <h2><b>Profile Settings</b></h2>
            </Col>
          </Row>
          <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col md={8} mdOffset={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <hr className="my-profile__hr1" />
            </Col>
          </Row>
          <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col className="my-profile__avatar-col" md={4} mdOffset={4} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <Image className="my-profile__avatar" src={require('./avatarTest.png')}/>
            </Col>
          </Row>
          <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col className="my-profile__file-chooser-col" md={4} mdOffset={4} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <Button className="my-profile__pic-button" bsSize="small" bsStyle="primary"><b>Change Profile Picture</b></Button>
            </Col>
          </Row>
          <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col md={8} mdOffset={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <hr className="my-profile__hr" />
            </Col>
          </Row>
          <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col className="my-profile__section-col" md={2} mdOffset={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <h5 className="my-profile__variable-name"><b>Username</b></h5>
            </Col>
            <Col className="my-profile__variable-col" md={4} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <h5 className="my-profile__variable-val"><b>DrewIsSuperKOOL</b></h5>
            </Col>
            <Col className="my-profile__link-col" md={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <Button bsStyle="link" bsSize="medium" onClick={this.handleEditUsername}>Edit</Button>
            </Col>
          </Row>
          <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col md={8} mdOffset={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <Panel className="my-profile__collapsed-panel" id="collapsible-panel-example-1" expanded={this.state.usernameOpen}>
                <Panel.Collapse>
                  <Panel.Body>
                    <Form horizontal>
                      <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2} smOffset={3}>
                          Username
                        </Col>
                        <Col sm={4}>
                          <FormControl type="text" placeholder="New Username" />
                        </Col>
                      </FormGroup>
                      <FormGroup>
                        <Col smOffset={5} sm={6}>
                           <ButtonToolbar>
                              <Button bsStyle="primary">Save</Button>
                              <Button>Cancel</Button>
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
              <h5 className="my-profile__variable-name"><b>Name</b></h5>
            </Col>
            <Col className="my-profile__variable-col" md={4} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <h5 className="my-profile__variable-val"><b>Drew Corbeil</b></h5>
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
                          <FormControl type="text" placeholder="First Name" />
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2} smOffset={3}>
                          Last
                        </Col>
                        <Col sm={4}>
                          <FormControl type="text" placeholder="Last Name" />
                        </Col>
                      </FormGroup>
                      <FormGroup>
                        <Col smOffset={5} sm={6}>
                           <ButtonToolbar>
                              <Button bsStyle="primary">Save</Button>
                              <Button>Cancel</Button>
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
              <h5 className="my-profile__variable-val"><b>Computer Science</b></h5>
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
                      <FormGroup controlId="formControlsSelect">
                        <Col sm={1} smOffset={2}>
                          <ControlLabel>Major</ControlLabel>
                        </Col>
                        <Col sm={7}>
                          <FormControl componentClass="select" placeholder="select">
                            <option value="select">select</option>
                            <option value="other">...</option>
                          </FormControl>
                        </Col>
                      </FormGroup>
                      <FormGroup>
                        <Col smOffset={5} sm={6}>
                           <ButtonToolbar>
                              <Button bsStyle="primary">Save</Button>
                              <Button>Cancel</Button>
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