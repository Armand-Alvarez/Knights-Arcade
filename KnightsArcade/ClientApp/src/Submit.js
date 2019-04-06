import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Form, Button, Col, Checkbox, Grid, Row, HelpBlock} from 'react-bootstrap';
import NaviBar from './Components/NavBar';
import './Submit.css';
import axios from 'axios';
import { Storage } from 'aws-amplify';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { Auth } from 'aws-amplify';
import Popup from 'reactjs-popup';
import { css } from '@emotion/core';
import { ClipLoader, PacmanLoader } from 'react-spinners';
import Footer from './Components/Footer';

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
    this.handlePlatformer = this.handlePlatformer.bind(this)
    this.handleImg0Change = this.handleImg0Change.bind(this);
    this.saveImg0 = this.saveImg0.bind(this);
    this.handleGameFileChange = this.handleGameFileChange.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.handleUpdateFiles = this.handleUpdateFiles.bind(this);
    this.handleCloseErrorAlert = this.handleCloseErrorAlert.bind(this);

    this.state = {
      titleValue: "",
      titleValidation: false,
      descriptionValue: "",
      descriptionValidation: false,
      controlsValue: "",
      controlValidation: false,
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
      Platformer: false,
      genreValidation: false,
      gameURL: "",
      gameFile: "",
      gameFileName: "",
      gameFileValidation: false,
      imgFiles: [],
      username: "",
      userID: "",
      img0URL: "",
      img0File: "",
      img0FileName: "",
      imgValidation: false,
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
      imagesValidation: true,
      loadingModal: false,
      errorAlert: false,
      errorAlertMessage:""

      };
      const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
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

  getValidationStateTitle() {
    const length = this.state.titleValue.length;
      if (length >= 1) {
          return 'success';
      }
    return null;
  }

  getValidationStateDesc() {
      const length = this.state.descriptionValue.length;
      if (length >= 100) {
          return 'success';
      }
      else if (length >= 25) {
          return 'warning';
      }
      else if (length >= 1) {
          return 'error';
      }

      return null;
  }

  getValidationStateControls() {
    const length = this.state.controlsValue.length;
      if (length >= 30) {
          return 'success';
      }
      else if (length >= 10) {
          return 'warning';
      }
      else if (length >= 1) {
          return 'error';
      }
      return null;
  }

  getValidationStateZip() {
      var validExtensions = ".zip";
      var fileName = this.state.gameFileName;
      if (!fileName) {
          return null;
      }
      else {
          if (fileName.substring(fileName.length - 4, fileName.length).toLowerCase() === validExtensions) {
              return 'success';
          }
          return 'error';
      }
      return null;
  }

  getValidationStateImg() {
      var validExtensions = [".png", ".jpg", ".jpeg"];
      var imgName = this.state.img0FileName;
      if (!imgName) {
          return null;
      }
      else {
          for (var index = 0; index < validExtensions.length; index++) {
              if (imgName.substring(imgName.length - validExtensions[index].length, imgName.length).toLowerCase() === validExtensions[index]) {
                  return 'success';
              }
          }
          return 'error';
      }
      return null;
  }

    getValidationStateImages() {
        var validExtensions = [".png", ".jpg", ".jpeg"];
        var imgNames = this.state.imgFiles;

        var result = 'error'; 
        if (!imgNames[0]) {
            return null;
        }
        else {
            for (var indexI = 0; indexI < imgNames.length; indexI++) {
                result = 'error';

                var imgName = imgNames[indexI];
                for (var indexJ = 0; indexJ < validExtensions.length; indexJ++) {
                    if (imgName.name.substring(imgName.name.length - validExtensions[indexJ].length, imgName.name.length).toLowerCase() === validExtensions[indexJ]) {
                        result = 'success';
                    }
                }
                if (result != 'success') {
                    return 'error';
                }
            }
            return 'success';
        }
        return null;
  }

  getValidationStateGenre() {
      if (!this.state.Action && !this.state.Adventure && !this.state.Racing && !this.state.RPG &&
          !this.state.Rhythm && !this.state.Sports && !this.state.Shooter && !this.state.Puzzle &&
          !this.state.Survival && !this.state.Fighting && !this.state.Platformer && !this.state.Strategy) {
          return null;
      }
      else {
          return 'success';
      }
      return null;
  }


  handleTitleChange(e) {
      this.setState({ titleValue: e.target.value });

      const length = this.state.titleValue.length;
      if (length >= 1) {
          this.setState({ titleValidation: true });
          return;
      }
      this.setState({ titleValidation: false });
  }

  handleDescriptionChange(e) {
      this.setState({ descriptionValue: e.target.value });

      const length = this.state.descriptionValue.length;
      if (length >= 100) {
          this.setState({ descriptionValidation: true });
          return;
      }
      this.setState({ descriptionValidation: false });
  }

  handleControlsChange(e) {
      this.setState({ controlsValue: e.target.value });

      const length = this.state.controlsValue.length;
      if (length >= 30) {
      console.log("Control validation: true");
          this.setState({ controlValidation: true });
          return;
      }
      this.setState({ controlValidation: false });
      console.log("Control validation: false");
    }

    handleCloseErrorAlert(e) {
        this.setState({ errorAlert: false });
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

  handlePlatformer() {
    this.setState({ Platformer: !this.state.Platformer });
  }

  handleGameFileChange(e) {
      try {
          console.log(e.target.files[0]);
          const file = e.target.files[0]
          this.setState({
              gameURL: URL.createObjectURL(file),
              gameFile: file,
              gameFileName: file.name
          });

          var validExtensions = ".zip";
          var fileName = e.target.files[0].name;
          if (!fileName) {
              this.setState({ gameFileValidation: false });
              return;
          }
          else {
              if (fileName.substring(fileName.length - 4, fileName.length).toLowerCase() === validExtensions) {
                  this.setState({ gameFileValidation: true });
                  return;
              }
              this.setState({ gameFileValidation: false });
              return;
          }
          this.setState({ gameFileValidation: false });
          return;
      }
      catch (e)
      {
          this.setState({
              gameURL: null,
              gameFile: null,
              gameFileName: null
          });
          this.setState({ gameFileValidation: false });
          console.log(e);
          return;
      }
  }

  handleImg0Change(e) {
      const file = e.target.files[0]
      this.setState({
        img0URL: URL.createObjectURL(file),
        img0File: file,
        img0FileName: file.name
      });

      var validExtensions = [".png", ".jpg", ".jpeg"];
      var imgName = e.target.files[0].name;
      if (!imgName) {
          this.setState({ imgValidation: false });
          return;
      }
      else {
          for (var index = 0; index < validExtensions.length; index++) {
              if (imgName.substring(imgName.length - validExtensions[index].length, imgName.length).toLowerCase() === validExtensions[index]) {
                  this.setState({ imgValidation: true });
                  return;
              }
          }
          this.setState({ imgValidation: false });
          return;
      }
      this.setState({ imgValidation: false });
      return;
  }

  handleUpdateFiles(items) {
      this.setState({
        imgFiles: items.map(item => item.file)
      });

      var validExtensions = [".png", ".jpg", ".jpeg"];
      var imgNames = items.map(item => item.file);
      console.log(imgNames[0]);

      var result = 'error';
      if (!imgNames[0]) {
          this.setState({ imagesValidation: true });
          return;
      }
      else {
          for (var indexI = 0; indexI < imgNames.length; indexI++) {
              result = 'error';

              var imgName = imgNames[indexI];
              for (var indexJ = 0; indexJ < validExtensions.length; indexJ++) {
                  if (imgName.name.substring(imgName.name.length - validExtensions[indexJ].length, imgName.name.length).toLowerCase() === validExtensions[indexJ]) {
                      result = 'success';
                  }
              }
              if (result != 'success') {
                  this.setState({ imagesValidation: false });
                  return;
              }
          }
          this.setState({ imagesValidation: true });
          return;
      }
      this.setState({ imagesValidation: true });
      return;
  }

    saveGame() {
        Storage.put(this.state.titleValue + "/" + this.state.gameFileName, this.state.gameFile)
        .then(() => {
            console.log('successfully saved game file!');
            window.location.href = 'MyProfile';
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
        })
        .catch(err => {
            console.log('error uploading image0 file!', err);
            throw (err);
            })
        return;
    }

    saveAdditionalImages() {
      for(var i = 0; i < this.state.imgFiles.length; i++) {
        Storage.put(this.state.titleValue + "/" + this.state.imgFiles[i].name, this.state.imgFiles[i])
          .then (result => console.log("img saved to S3!")) // {key: "test.txt"}
          .catch(err => console.log(err));
      }
    }

    postToS3() {
      this.saveImg0();
      this.saveAdditionalImages();
      this.saveGame();
    }

    checkState() {
        if (!this.state.titleValue) {
            this.setState({ loadingModal: false });
            this.setState({ errorAlertMessage: "Please input a valid game title for submission." });
            this.setState({ errorAlert: true });
            console.log("Invalid game title");
            throw ("Invalid game title");
        }
        if (!this.state.descriptionValue || !this.state.descriptionValidation) {
            this.setState({ loadingModal: false });
            this.setState({ errorAlertMessage: "Please input a valid game description for submission." });
            this.setState({ errorAlert: true });
            console.log("Invalid game description");
            throw ("Invalid game description");
        }
        if (!this.state.controlsValue || !this.state.controlValidation) {
            this.setState({ loadingModal: false });
            this.setState({ errorAlertMessage: "Please input valid game controls for submission." });
            this.setState({ errorAlert: true });
            console.log("Invalid game controls");
            throw ("Invalid game controls");
        }
        if (!this.state.gameFile || !this.state.gameFileValidation) {
            this.setState({ loadingModal: false });
            this.setState({ errorAlertMessage: "Please input a valid game file for submission." });
            this.setState({ errorAlert: true });
            console.log("Invalid game file");
            throw ("Invalid game file");
        }
        if (!this.state.img0File || !this.state.imgValidation || !this.state.imagesValidation) {
            this.setState({ loadingModal: false });
            this.setState({ errorAlertMessage: "Please input valid image(s) for submission." });
            this.setState({ errorAlert: true });
            console.log("Invalid image");
            throw ("Invalid image");
        }
        if (!this.state.Action && !this.state.Adventure && !this.state.Racing && !this.state.RPG &&
            !this.state.Rhythm && !this.state.Sports && !this.state.Shooter && !this.state.Puzzle &&
            !this.state.Survival && !this.state.Fighting && !this.state.Platformer && !this.state.Strategy) {
            this.setState({ loadingModal: false });
            this.setState({ errorAlertMessage: "Please select at least one genre." });
            this.setState({ errorAlert: true });
            console.log("No genres selected");
            throw ("No genres selected");
        }
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
          gameCreatorId: "",
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
          gameGenrePlatformer: this.state.Platformer,
          gamePath: this.state.titleValue + "/" + this.state.gameFileName,
          gameImg: imgNames,
          gameAvailableToDownload: false
        }
        var self = this;
        axios.post('/api/v1/Restricted/rds/newentry', data, {
          headers: {
            'Authorization' : Auth.user.signInUserSession.accessToken.jwtToken
          }
        })
            .then(function (res, error) {
                if (res.status === 201) {
                    console.log(res);
                    self.postToS3();
                }
                else if (res.status === 409)
                {
                    console.log("409");
                    this.setState({ loadingModal: false });
                    this.setState({ errorAlertMessage: "That game name already exists. Please use another." });
                    this.setState({ errorAlert: true });
                    throw ("That game name already exists. Please use another.");
                }
                else {
                    console.log("Other");
                    this.setState({ loadingModal: false });
                    this.setState({ errorAlertMessage: "There was an error with your submission. Please reload and try again." });
                    this.setState({ errorAlert: true });
                    throw ("There was an error with your submission. Please reload and try again.");
                }
            }).catch(error => {
                console.log(error);
                var errorDupMessage = "Request failed with status code 409";
                console.log(error.message);
                if (error.message.substring(0, errorDupMessage.length) === errorDupMessage)
                    this.setState({ errorAlertMessage: "That game name already exists. Please use another." });
                else
                    this.setState({ errorAlertMessage: "There was an error with your submission. Please reload and try again." });

                this.setState({ loadingModal: false });
                this.setState({ errorAlert: true });;
            });
    }

    handleSubmit(e) {
        try {
            this.setState({ loadingModal: true });

            e.preventDefault();
            this.checkState();
            this.postNewEntry();
        }
        catch (e)
        {
            this.setState({ errorAlertMessage: e });

            console.log(e);

            this.setState({ loadingModal: false });
            this.setState({ errorAlert: true });
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
          <FormGroup validationState={this.getValidationStateTitle()}>
            <ControlLabel className = 'text'>Title of the Game</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter the title of your game"
              onChange={this.handleTitleChange}
            />
          </FormGroup>

          <FormGroup controlId="formControlsTextarea" validationState={this.getValidationStateDesc()}>
            <ControlLabel className = 'text'>Description</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Description" onChange={this.handleDescriptionChange}/>
            <HelpBlock>Must be at least 100 characters.</HelpBlock>
          </FormGroup>

          <FormGroup controlId="formControlsTextarea" validationState={this.getValidationStateControls()}>
            <ControlLabel className = 'text'>Controls</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Controls" onChange={this.handleControlsChange}/>
            <HelpBlock>Must be at least 30 characters.</HelpBlock>
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
              <FormGroup validationState={this.getValidationStateZip()}>
                <ControlLabel className = 'text'>Game Files (Zip)</ControlLabel>
                <FormControl
                  type="file"
                  onChange={this.handleGameFileChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup validationState={this.getValidationStateImg()}>
                <ControlLabel className = 'text'>Default Display Image (JPG, JPEG, PNG)</ControlLabel>
                <FormControl
                  type="file"
                  onChange={this.handleImg0Change}
                />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup validationState={this.getValidationStateImages()}>
            <ControlLabel className = 'text'>Additional images for Slideshow (Max 4, Optional)</ControlLabel>
            <FilePond
              className="file-pond"
              allowMultiple={true}
              maxFiles={4}
              onupdatefiles={this.handleUpdateFiles}
            />
            <HelpBlock>All images must be either .jpg, .jpeg, or .png</HelpBlock>
          </FormGroup>

          <Row>
            <FormGroup validationState={this.getValidationStateGenre()}>
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
                    <Checkbox className='text' onChange={this.handlePlatformer}>Platformer</Checkbox>
                    </FormGroup>
                </Col>
            </FormGroup>
          </Row>
          <HelpBlock>Must choose at least one.</HelpBlock>
          <FormGroup>
              <Button bsStyle="primary" onClick={this.handleSubmit}>Submit</Button>
          </FormGroup>
        </Form>
        </Col>
        </Row>
        </Grid>
            <Popup
                open={this.state.loadingModal}
                modal
                closeOnDocumentClick={false}
                lockScroll={true}
            >
                <div className='sweet-loading'>
                    <PacmanLoader
                        css={css`
                            display: block;
                            margin: 0 auto;
                            position: relative;
                            right: 40px;
                            `}
                        sizeUnit={"px"}
                        size={25}
                        color={'#F5A623'}
                        loading={true}
                    />
                </div>
            </Popup>
            <Popup
                open={this.state.errorAlert}
                modal
                closeOnDocumentClick={false}
                lockScroll={true}
            >
                <div className="error-alert-modal">
                    <span>{this.state.errorAlertMessage}</span>
                </div>
                <Button bsStyle="danger" bsSize="xsmall" onClick={this.handleCloseErrorAlert} style={{cursor:'pointer'}}>X</Button>
            </Popup>
            <Footer />
      </div>
    )
  }
}

export default Submit;