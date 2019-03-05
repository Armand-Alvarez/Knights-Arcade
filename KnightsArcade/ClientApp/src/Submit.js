import React, { Component } from 'react';
import {FormGroup, FormControl, ControlLabel, HelpBlock, Form, Button, Col, Checkbox, Panel, Grid, Row} from 'react-bootstrap';
import NaviBar from './Components/NavBar';
import './Submit.css';
import axios from 'axios';

class Submit extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleControlsChange = this.handleControlsChange.bind(this);
    this.handleVideoLinkChange = this.handleVideoLinkChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleG1 = this.handleG1.bind(this);
    this.handleG2 = this.handleG2.bind(this);
    this.handleG3 = this.handleG3.bind(this);
    this.handleG4 = this.handleG4.bind(this);
    this.handleG5 = this.handleG5.bind(this);

    this.state = {
      titleValue: "",
      descriptionValue: "",
      controlsValue: "",
      videoLinkValue: "",
      genre1: false,
      genre2: false,
      genre3: false,
      genre4: false,
      genre5: false
    };
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length >= 1) return 'success';

    return null;
  }
  getValidationStateDesc() {
    const length = this.state.value.length;
    if (length >= 100) return 'success';
    else if (length >= 1) return 'warning';

    return null;
  }

  handleTitleChange(e) {
    this.setState({ titleValue: e.target.value });
  }

  handleDescriptionChange(e) {
    this.setState({ descriptionValue: e.target.value });
  }

  handleControlsChange(e) {
    this.setState({ controlsValue: e.target.value });
  }

  handleVideoLinkChange(e) {
    this.setState({ videoLinkValue: e.target.value });
  }

  handleG1() {
    this.setState({ genre1: !this.state.genre1 });
  }

  handleG2() {
    this.setState({ genre2: !this.state.genre2 });
  }

  handleG3() {
    this.setState({ genre3: !this.state.genre3 });
  }

  handleG4() {
    this.setState({ genre4: !this.state.genre4 });
  }

  handleG5() {
    this.setState({ genre5: !this.state.genre5 });
  }

  handleSubmit(e) {

    e.preventDefault();

    const data = {
      
      title: this.state.titleValue,
      description: this.state.descriptionValue,
      controls: this.state.controlsValue,
      video: this.state.videoLinkValue,
      genre1: this.state.genre1,
      genre2: this.state.genre2,
      genre3: this.state.genre3,
      genre4: this.state.genre4,
      genre5: this.state.genre5

    };

    axios.post( '/api/v1/infrastructure/rds/gamesdata', data)
    .then(function(res){
      console.log(res.data);
    })
    .catch(function(){
      console.log('FAILURE!!');
    });
  }

  render() {
    return (
      <div className = 'FullPage'>
        <NaviBar/>
        <div className="Header">
        <h1 className = 'text '>Submit a Game</h1>
        </div>

        <Grid>
        <Row>
        <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
        <Form>
          <FormGroup>
            <ControlLabel className = 'text'>Title of the Game</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter the title of your game"
              onChange={this.handleTitleChange}
            />
          </FormGroup>

          <FormGroup controlId="formControlsTextarea">
            <ControlLabel className = 'text'>Description</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Description" onChange={this.handleDescriptionChange}/>
          </FormGroup>

          <FormGroup controlId="formControlsTextarea">
            <ControlLabel className = 'text'>Controls</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Controls" onChange={this.handleControlsChange}/>
          </FormGroup>

          <FormGroup>
            <ControlLabel className = 'text'>Video (Optional)</ControlLabel>
            <FormControl
              type="text"
              placeholder="Video (Youtube Link)"
              onChange={this.handleVideoLinkChange}
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel className = 'text'>Game Files (Zip)</ControlLabel>
            <FormControl
              type="file"
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel className = 'text'>Default Display Image</ControlLabel>
            <FormControl
              type="file"
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel className = 'text'>Slideshow Image 1 (Optional)</ControlLabel>
            <FormControl
              type="file"
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel className = 'text'>Slideshow Image 2 (Optional)</ControlLabel>
            <FormControl
              type="file"
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel className = 'text'>Slideshow Image 3 (Optional)</ControlLabel>
            <FormControl
              type="file"
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel className = 'text'>Slideshow Image 4 (Optional)</ControlLabel>
            <FormControl
              type="file"
            />
          </FormGroup>

          <FormGroup>
              <Checkbox className = 'text' onChange={this.handleG1}>Genre 1</Checkbox>
              <Checkbox className = 'text' onChange={this.handleG2}>Genre 2</Checkbox>
              <Checkbox className = 'text' onChange={this.handleG3}>Genre 3</Checkbox>
              <Checkbox className = 'text' onChange={this.handleG4}>Genre 4</Checkbox>
              <Checkbox className = 'text' onChange={this.handleG5}>Genre 5</Checkbox>
          </FormGroup>

          <FormGroup>
              <Button bsStyle="primary" onClick={this.handleSubmit}>Submit</Button>
          </FormGroup>
        </Form>
        </Col>
        </Row>
        </Grid>
      </div>
    )
  }
}

export default Submit;