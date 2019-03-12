import React, { Component } from 'react';
import {FormGroup, FormControl, ControlLabel, HelpBlock, Form, Button, Col, Checkbox, Panel, Grid, Row} from 'react-bootstrap';
import NaviBar from './Components/NavBar';
import './Submit.css';
import axios from 'axios';
import { Storage } from 'aws-amplify';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { Auth } from 'aws-amplify';

class Submit extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleControlsChange = this.handleControlsChange.bind(this);
    this.handleVideoLinkChange = this.handleVideoLinkChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.handleAdventure = this.handleAdventure.bind(this);
    this.handleRacing = this.handleRacing.bind(this);
    this.handleRPG = this.handleRPG.bind(this);
    this.handleSports = this.handleSports.bind(this);
    this.handleStrategy = this.handleStrategy.bind(this);
    this.handleShooter = this.handleShooter.bind(this);
    this.handlePuzzle = this.handlePuzzle.bind(this);
    this.handleSurvival = this.handleSurvival.bind(this);
    this.handleFighting = this.handleFighting.bind(this);
    this.handleRhythm = this.handleRhythm.bind(this);
    this.handleImg0Change = this.handleImg0Change.bind(this);
    this.saveImg0 = this.saveImg0.bind(this);
    this.handleGameFileChange = this.handleGameFileChange.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.handleUpdateFiles = this.handleUpdateFiles.bind(this);

    this.state = {
      titleValue: "",
      descriptionValue: "",
      controlsValue: "",
      videoLinkValue: "",
      Action: false,
      Adventure: false,
      Racing: false,
      RPG: false,
      Sports: false,
      Strategy: false,
      Shooter: false,
      Puzzle: false,
      Survival: false,
      Fighting: false,
      Rhythm: false,
      gameURL: "",
      gameFile: "",
      gameFileName: "",
      imgFiles: [],
      username: "",
      userID: "",
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

  componentDidMount() {

    Auth.currentAuthenticatedUser({
        bypassCache: false
    }).then(user => {
      this.setState({ username: user.username});
    })
    .catch(err => {
      console.log(err);
    });

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

  handleAction() {
    this.setState({ Action: !this.state.Action });
  }

  handleAdventure() {
    this.setState({ Adventure: !this.state.Adventure });
  }

  handleRacing() {
    this.setState({ Racing: !this.state.Racing });
  }

  handleRPG() {
    this.setState({ RPG: !this.state.RPG });
  }

  handleSports() {
    this.setState({ Sports: !this.state.Sports });
  }

  handleStrategy() {
    this.setState({ Strategy: !this.state.Strategy });
  }

  handleShooter() {
    this.setState({ Shooter: !this.state.Shooter });
  }

  handlePuzzle() {
    this.setState({ Puzzle: !this.state.Puzzle });
  }

  handleSurvival() {
    this.setState({ Survival: !this.state.Survival });
  }

  handleFighting() {
    this.setState({ Fighting: !this.state.Fighting });
  }

  handleRhythm() {
    this.setState({ Rhythm: !this.state.Rhythm });
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

  handleUpdateFiles(items) {
    this.setState({
      imgFiles: items.map(item => item.file)
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
        
        const imgNames = [];

        imgNames.push(this.state.titleValue + "/" + this.state.img0FileName);

        for(var i = 0; i < this.state.imgFiles.length; i++)
        {
          imgNames.push(this.state.titleValue + "/" + this.state.imgFiles[i].name);
        }

        const data = {
          gameName: this.state.titleValue,
          gameCreatorName: this.state.username,
          gameCreatorId: "idkifweneedthis",
          gameDescription: this.state.descriptionValue,
          gameControls: this.state.controlsValue,
          gameVideoLink: this.state.videoLinkValue,
          gameGenreSurvival: this.state.Survival,
          gameGenreFighting: this.state.Fighting,
          gameGenrePuzzle: this.state.Puzzle,
          gameGenreShooter: this.state.Shooter,
          gameGenreStrategy: this.state.Strategy,
          gameGenreSports: this.state.Sports,
          gameGenreRpg: this.state.RPG,
          gameGenreRacing: this.state.Racing,
          gameGenreAdventure: this.state.Adventure,
          gameGenreAction: this.state.Action,
          gameGenreRhythm: this.state.Rhythm,
          gamePath: this.state.titleValue + "/" + this.state.gameFileName,
          gameImg: imgNames
        }

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
        
        for(var i = 0; i < this.state.imgFiles.length; i++)
        {
          console.log(this.state.imgFiles[i].name);
        }

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
      
      <div className = "Submit">
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

          
          <Row>
            <Col md={6}>
              <FormGroup>
                <ControlLabel className = 'text'>Game Files (Zip)</ControlLabel>
                <FormControl
                  type="file"
                  onChange={this.handleGameFileChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <ControlLabel className = 'text'>Default Display Image</ControlLabel>
                <FormControl
                  type="file"
                  onChange={this.handleImg0Change}
                />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup>
            <ControlLabel className = 'text'>Additional images for Slideshow (Max 4, Optional)</ControlLabel>
            <FilePond
              className="file-pond"
              allowMultiple={true}
              maxFiles={4}
              onupdatefiles={this.handleUpdateFiles}
            />
          </FormGroup>

          <Row>
            <Col md={3}>
              <FormGroup>
                <ControlLabel className = 'text'>Genres</ControlLabel>
                <Checkbox className = 'text' onChange={this.handleAction}>Action</Checkbox>
                <Checkbox className = 'text' onChange={this.handleAdventure}>Adventure</Checkbox>
                <Checkbox className = 'text' onChange={this.handleFighting}>Fighting</Checkbox>
                <Checkbox className = 'text' onChange={this.handlePuzzle}>Puzzle</Checkbox>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <ControlLabel className = 'text'></ControlLabel>
                <Checkbox className = 'text' onChange={this.handleRacing}>Racing</Checkbox>
                <Checkbox className=  'text' onChange={this.handleRhythm}>Rhythm</Checkbox>
                <Checkbox className = 'text' onChange={this.handleRPG}>RPG</Checkbox>
                <Checkbox className = 'text' onChange={this.handleShooter}>Shooter</Checkbox>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <ControlLabel className='text'></ControlLabel>
                <Checkbox className='text' onChange={this.handleSports}>Sports</Checkbox>
                <Checkbox className='text' onChange={this.handleStrategy}>Strategy</Checkbox>
                <Checkbox className='text' onChange={this.handleSurvival}>Survival</Checkbox>
              </FormGroup>
            </Col>
          </Row>

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