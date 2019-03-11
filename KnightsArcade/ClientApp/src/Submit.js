import React, { Component } from 'react';
import {FormGroup, FormControl, ControlLabel, HelpBlock, Form, Button, Col, Checkbox, Panel, Grid, Row} from 'react-bootstrap';
import NaviBar from './Components/NavBar';
import './Submit.css';
import axios from 'axios';
import { Storage } from 'aws-amplify';

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
    this.handleImg0Change = this.handleImg0Change.bind(this);
    this.saveImg0 = this.saveImg0.bind(this);
    this.handleGameFileChange = this.handleGameFileChange.bind(this);
    this.saveGame = this.saveGame.bind(this);

    this.state = {
      titleValue: "",
      descriptionValue: "",
      controlsValue: "",
      videoLinkValue: "",
      genre1: false,
      genre2: false,
      genre3: false,
      genre4: false,
      genre5: false,
      gameURL: "",
      gameFile: "",
      gameFileName: "",
      img0URL: "",
      img0File: "",
      img0FileName: "",
      img1URL: "",
      img1File: "",
      img1FileName: "",
      img2URL: "",
      img2File: "",
      img2FileName: "",
      img3URL: "",
      img3File: "",
      img3FileName: "",
      img4URL: "",
      img4File: "",
      img4FileName: "",
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

  handleGameFileChange(e) {
    const file = e.target.files[0]
    this.setState({
      gameURL: URL.createObjectURL(file),
      gameFile: file,
      gameFileName: file.name
    });
  }

  handleImg0Change(e) {
    const file = e.target.files[0]
    this.setState({
      img0URL: URL.createObjectURL(file),
      img0File: file,
      img0FileName: file.name
    });
  }

  handleImg1Change(e) {
    const file = e.target.files[1]
    this.setState({
      img1URL: URL.createObjectURL(file),
      img1File: file,
      img1FileName: file.name
    });
  }

  handleImg2Change(e) {
    const file = e.target.files[2]
    this.setState({
      img2URL: URL.createObjectURL(file),
      img2File: file,
      img2FileName: file.name
    });
  }

  handleImg3Change(e) {
    const file = e.target.files[3]
    this.setState({
      img3URL: URL.createObjectURL(file),
      img3File: file,
      img3FileName: file.name
    });
  }

  handleImg4Change(e) {
    const file = e.target.files[4]
    this.setState({
      img4URL: URL.createObjectURL(file),
      img4File: file,
      img4FileName: file.name
    });
  }

    saveGame() {
        Storage.put(this.state.titleValue + "/" + this.state.gameFileName, this.state.gameFile)
        .then(() => {
            console.log('successfully saved game file!');
            //this.setState({ gameURL: "", gameFile: "", gameFileName: "" })
        })
        .catch(err => {
            console.log('error uploading game file!', err);
            throw (err);
            })
        return;
    }

    saveImg0() {
        Storage.put(this.state.titleValue + "/" + this.state.img0FileName, this.state.img0File)
        .then(() => {
            console.log('successfully saved file!');
            //this.setState({img0URL: "", img0File: "", img0FileName: ""})
        })
        .catch(err => {
            console.log('error uploading image0 file!', err);
            throw (err);
            })
        return;
    }

    saveImg1() {
        Storage.put(this.state.titleValue + "/" + this.state.img1FileName, this.state.img1File)
        .then(() => {
            console.log('successfully saved file!');
            //this.setState({img1URL: "", img1File: "", img1FileName: ""})
        })
        .catch(err => {
            console.log('error uploading file!', err);
            throw (err);
            })
        return;
    }

    saveImg2() {
        Storage.put(this.state.titleValue + "/" + this.state.img2FileName, this.state.img2File)
        .then(() => {
            console.log('successfully saved file!');
            //this.setState({img2URL: "", img2File: "", img2FileName: ""})
        })
        .catch(err => {
            console.log('error uploading file!', err);
            throw (err);
            })
        return;
    }

    saveImg3() {
        Storage.put(this.state.titleValue + "/" + this.state.img3FileName, this.state.img3File)
        .then(() => {
            console.log('successfully saved file!');
            //this.setState({img3URL: "", img3File: "", img3FileName: ""})
        })
        .catch(err => {
            console.log('error uploading file!', err);
            throw (err);
            })
        return;
    }

    saveImg4() {
        Storage.put(this.state.titleValue + "/" + this.state.img4FileName, this.state.img4File)
        .then(() => {
            console.log('successfully saved file!');
            //this.setState({img4URL: "", img4File: "", img4FileName: ""})
        })
        .catch(err => {
            console.log('error uploading file!', err);
            throw (err);
            })
        return;
    }

    postNewEntry() {
        const data = {

            gameName: this.state.titleValue,
            gameCreatorName: "testnamesincenotdone",
            gameCreatorId: 0,
            gameDescription: this.state.descriptionValue,
            gameControls: this.state.controlsValue,
            gameVideoLink: this.state.videoLinkValue,
            gameGenres: "notdone",
            gamePath: this.state.titleValue + "/" + this.state.gameFileName,
            gameImg: [
                this.state.titleValue + "/" + this.state.img0FileName,
                this.state.titleValue + "/" + this.state.img1FileName,
                this.state.titleValue + "/" + this.state.img2FileName,
                this.state.titleValue + "/" + this.state.img3FileName,
                this.state.titleValue + "/" + this.state.img4FileName
            ]
        };

        axios.post('/api/v1/Restricted/rds/newentry', data)
            .then(function (res) {
                console.log(res);
                if (res.status != 201) {
                    console.log('Unable to create database entry');
                    throw ('Unable to create database entry');
                }
            })
            .catch(function () {
                console.log('FAILURE!!');
                throw ('Failed to post to API');
            });
    }

    handleSubmit(e) {

        e.preventDefault();
        
        try {
            this.saveImg0();
            if (this.state.img1FileName !== "") {
                this.saveImg1();
            }
            if (this.state.img2FileName !== "") {
                this.saveImg2();
            }
            if (this.state.img3FileName !== "") {
                this.saveImg3();
            }
            if (this.state.img4FileName !== "") {
                this.saveImg4();
            }
            this.saveGame();
            this.postNewEntry();
        }
        catch (error) {
            console.log("removing from s3");
            Storage.remove(this.state.titleValue)
                .then(result => console.log(result))
                .catch(err => console.log(err));
        }
    
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
              onChange={this.handleGameFileChange}
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel className = 'text'>Default Display Image</ControlLabel>
            <FormControl
              type="file"
              onChange={this.handleImg0Change}
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