import React, { Component } from 'react';
import NaviBar from './Components/NavBar';
import axios from 'axios';
import './GameAdvert.css';
import { Storage } from 'aws-amplify';
import GameAdSlides from './Components/GameAdSlides';
import Popup from 'reactjs-popup';
import Footer from './Components/Footer'
import { Grid, Row, Col, Glyphicon, Button, Form, FormControl, FormGroup, ControlLabel, HelpBlock, Table, thead, tr, th, td, Jumbotron } from 'react-bootstrap';

class ReviewPage extends Component {

    constructor(props) {
        super(props);

        this.handleReviewCommentsChange = this.handleReviewCommentsChange.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.handleDeny = this.handleDeny.bind(this);
        this.handleResubmit = this.handleResubmit.bind(this);

        this.state = {
            errorAlertMessage: "",
            errorAlert: false,
            denyConfirm: false,
            reviewModal: false,
            buttonStatus: "disabled",
            reviewMessage: "",
            reviewCommentsValue: "",
            gamedata: [],
            testdata: [],
            numImages: 0,
            gameImage0: "",
            gameImage1: "",
            gameImage2: "",
            gameImage3: "",
            gameImage4: "",
            file: ""
        };
    }


    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        const urlGameid = urlParams.get('gameId');
        const getRequest = `api/v1/Public/rds/games/gamesbyid?gameid=` + urlGameid;
        const getTestRequest = `api/v1/Public/rds/tests/testsbygameid?gameid=` + urlGameid;
        axios.get(getRequest)
            .then(res => {
                const gamedata = res.data;
                this.setState({ gamedata: gamedata });
                this.setState({ numImages: gamedata.gameImg.length });
            })
            .then(async (gamedata) => {
                this.setState({ gameImage0: await Storage.get(this.state.gamedata.gameImg[0]) })
                this.setState({ gameImage1: await Storage.get(this.state.gamedata.gameImg[1]) })
                this.setState({ gameImage2: await Storage.get(this.state.gamedata.gameImg[2]) })
                this.setState({ gameImage3: await Storage.get(this.state.gamedata.gameImg[3]) })
                this.setState({ gameImage4: await Storage.get(this.state.gamedata.gameImg[4]) })
                this.setState({ file: await Storage.get(this.state.gamedata.gamePath) })
            })

        axios.get(getTestRequest)
            .then(res => {
                const testdata = res.data;
                this.setState({ testdata: testdata });
                console.log(testdata);
            })
        
    }

    handleAccept(e) {
        try {
            e.preventDefault();
            this.submitReview("a");
            this.setState({ reviewModal: true });
            this.setState({ reviewMessage: "The game has been accepted successfully" })
        }
        catch (e) {
                        this.setState({ reviewModal: false })
            this.setState({ errorAlertMessage: "There was an error submitting the review. Please reload and try again." });
            this.setState({ errorAlert: true });
        }
    }

    handleDeny(e) {
        try {
            this.setState({ denyConfirm: false })
            e.preventDefault();
            this.submitReview("d");
            this.setState({ reviewModal: true });
            this.setState({ reviewMessage: "The game has been denied successfully" })
        }
        catch (e) {
            this.setState({ reviewModal: false })
            this.setState({ errorAlertMessage: "There was an error submitting the review. Please reload and try again." });
            this.setState({ errorAlert: true });
        }
    }

    handleResubmit(e) {
        try {

            e.preventDefault();
            this.submitReview("r");
            this.setState({ reviewModal: true });
            this.setState({ reviewMessage: "The game has been flagged for resubmission successfully"})
        }
        catch (e) {
            this.setState({ reviewModal: false })
            this.setState({ errorAlertMessage: "There was an error submitting the review. Please reload and try again." });
            this.setState({ errorAlert: true });
        }
    }

    handleReviewCommentsChange(e) {
        this.setState({ reviewCommentsValue: e.target.value });
        var length = this.state.reviewCommentsValue.length;
        if (length > 0) {
            this.state.buttonStatus = false;
            return;
        }
            this.state.buttonStatus = true;
    }

    submitReview(reviewType) {

        const submissionData = {
            creatorId: null,
            gameId: this.state.gamedata.gameId,
            submissionName: null,
            submissionStatus: reviewType,
            submissionImage0: null,
            submissionDateUtc: null,
            submissionReviewDateUtc: new Date().toUTCString(),
            submissionReviewComments: this.state.reviewCommentsValue
        }

        axios.put('/api/v1/Restricted/rds/submissions/submission', submissionData)
            .then(function (res, error) {
                console.log(res);
            }
            ).catch(error => {
                console.log(error.message);
               
                ;
            });

    }

    render(props) {
        const creatorLink = "/games?search=" + this.state.gamedata.gameCreatorName;
        const genres = [];
        var glyph;
        var status;
        var slideshow;
        var testOpens;
        var test5min;
        var testCloses;
        var testRam = parseInt(this.state.testdata.testAverageRam);
        var testRamString = "";
        var downloadable;
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(this.state.gamedata.gameSubmissionDateUtc);

        if (this.state.gamedata.gameStatus === "a") {
            status =
                <Row>
                <Col mdOffset={2}>
                    <h1 className = "GameStatusText">This game has already been accepted</h1>
                </Col>
                </Row>;
        }
        if (this.state.gamedata.gameStatus === "d") {
            status =
                <Row>
                    <Col mdOffset={2}>
                        <h1 className="GameStatusText">This game has already been denied</h1>
                    </Col>
                </Row>;
        }
        if (this.state.gamedata.gameStatus === "r") {
            status =
                <Row>
                    <Col mdOffset={2}>
                        <h1 className="GameStatusText">This game is currently awaiting resubmission</h1>
                    </Col>
                </Row>;
        }

        if (this.state.gamedata.gameAvailableToDownload != true) {
            downloadable = (
                <p>The author has opted for this game to not be available for web download</p>
                )
        }

        if (this.state.testdata.testOpens) {
            testOpens = "Pass"
        }   else {
            testOpens = "Fail"
        }
        if (this.state.testdata.test5min) {
            test5min = "Pass"
        }   else {
            test5min = "Fail"
        }
        if (this.state.testdata.testCloses) {
            testCloses = "Pass"
        }   else {
            testCloses = "Fail"
        }

        if (testRam < 1024) {
            testRamString = this.state.testdata.testRam + "B"
        } else if (testRam < 1048576) {
            testRam = testRam / 1024;
            testRamString = Math.round(testRam) + "KB"
        } else if (testRam < 1073741824) {
            testRam = testRam / 1048576;
            testRamString = Math.round(testRam) + "MB"
        } else {
            testRamString = Math.round(testRam) + "GB"
        }

        if (this.state.gamedata.gameGenreAction === true) {
            genres.push("Action");
        }
        if (this.state.gamedata.gameGenreAdventure === true) {
            genres.push("Adventure");
        }
        if (this.state.gamedata.gameGenreFighting === true) {
            genres.push("Fighting");
        }
        if (this.state.gamedata.gameGenrePlatformer === true) {
            genres.push("Platformer");
        }
        if (this.state.gamedata.gameGenrePuzzle === true) {
            genres.push("Puzzle");
        }
        if (this.state.gamedata.gameGenreRPG === true) {
            genres.push("RPG");
        }
        if (this.state.gamedata.gameGenreRacing === true) {
            genres.push("Racing");
        }
        if (this.state.gamedata.gameGenreRhythm === true) {
            genres.push("Rhythm");
        }
        if (this.state.gamedata.gameGenreShooter === true) {
            genres.push("Shooter");
        }
        if (this.state.gamedata.gameGenreSports === true) {
            genres.push("Sports");
        }
        if (this.state.gamedata.gameGenreStrategy === true) {
            genres.push("Strategy");
        }
        if (this.state.gamedata.gameGenreSurvival === true) {
            genres.push("Survival");
        }

        const genreList = genres.join(", ");

        if (this.state.gamedata.gameOnArcade === true) {
            glyph = <Glyphicon className='Check' glyph='ok'></Glyphicon>;
        }
        else {
            glyph = <Glyphicon className='Nocheck' glyph='remove'></Glyphicon>;
        }

        switch (this.state.numImages) {
            case 1:
                slideshow = <img width={896} height={504} src={this.state.gameImage0} />;
                break;
            case 2:
                slideshow = <GameAdSlides numImages={this.state.numImages}
                    numItems={2}
                    gameSlide0={this.state.gameImage0}
                    gameSlide1={this.state.gameImage1} />
                break;
            case 3:
                slideshow = <GameAdSlides numImages={this.state.numImages}
                    numItems={3}
                    gameSlide0={this.state.gameImage0}
                    gameSlide1={this.state.gameImage1}
                    gameSlide2={this.state.gameImage2} />
                break;
            case 4:
                slideshow = <GameAdSlides numImages={this.state.numImages}
                    numItems={4}
                    gameSlide0={this.state.gameImage0}
                    gameSlide1={this.state.gameImage1}
                    gameSlide2={this.state.gameImage2}
                    gameSlide3={this.state.gameImage3} />
                break;
            case 5:
                slideshow = <GameAdSlides numImages={this.state.numImages}
                    numItems={5}
                    gameSlide0={this.state.gameImage0}
                    gameSlide1={this.state.gameImage1}
                    gameSlide2={this.state.gameImage2}
                    gameSlide3={this.state.gameImage3}
                    gameSlide4={this.state.gameImage4} />
                break;
        }


        return (
            <div className='FullPage'>
                <NaviBar />
                <div className='GameAdDiv'>
                    <Jumbotron style={{ marginBottom: 10, marginTop: 10 }}>
                        <Grid fluid>
                            <Row style={{ marginLeft: 0, marginRight: 0 }}>
                                <Col md={6} mdOffset={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
                                    <h1 className="GameTitle">{this.state.gamedata.gameName}</h1>
                                </Col>
                            </Row>
                        </Grid>
                    </Jumbotron>
                    <Grid fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Row style={{ marginLeft: 0, marginRight: 0 }}>
                            <Col>
                                <Grid>
                                    <Row>
                                        <Col md={10} mdOffset={0} sm={10} smOffset={0} style={{ paddingLeft: 0, paddingRight: 0 }}>
                                            {slideshow}
                                        </Col>
                                        <Col md={2} mdOffset={0} sm={2} smOffset={1} style={{ paddingLeft: 0, paddingRight: 0 }}>
                                            <Form>
                                                <FormGroup>
                                                    <ControlLabel>Creator</ControlLabel>
                                                    <a href={creatorLink}><FormControl.Static>{this.state.gamedata.gameCreatorName}</FormControl.Static></a>
                                                </FormGroup>
                                                <FormGroup>
                                                    <ControlLabel>Date Published</ControlLabel>
                                                    <FormControl.Static>{date.toLocaleDateString("en-US", options)}</FormControl.Static>
                                                </FormGroup>
                                                <FormGroup>
                                                    <ControlLabel>Genres</ControlLabel>
                                                    <FormControl.Static>{genreList}</FormControl.Static>
                                                </FormGroup>
                                                <FormGroup>
                                                    <ControlLabel>Available On Arcade Machines</ControlLabel>
                                                    {glyph}
                                                </FormGroup>
                                                <a href={this.state.file} download>
                                                    <Button bsStyle='info'>Download Game</Button>
                                                </a>
                                                {downloadable}
                                            </Form>
                                        </Col>
                                    </Row>
                                </Grid>

                            </Col>
                        </Row>
                        <Row style={{ marginLeft: 0, marginRight: 0 }}>
                            <Col md={4} mdOffset={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <h3>About the game</h3>
                                <p>{this.state.gamedata.gameDescription}</p>
                            </Col>
                            <Col md={2} mdOffset={1} style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <h3>Controls</h3>
                                <p>{this.state.gamedata.gameControls}</p>
                            </Col>
                        </Row>{/*
                        <Row>
                            <Col className="testColTop" md={1} mdOffset={2}>
                                <span>Opening Test</span>
                            </Col>
                            <Col className="testColTop" md={1}>
                                <span>Five Minute Test</span>
                            </Col>
                            <Col className="testColTop" md={1}>
                                <span>Closing Test</span>
                            </Col>
                            <Col className="testColTop" md={1}>
                                <span>Average Ram Test</span>
                            </Col>
                            <Col className="testColTop" md={1}>
                                <span>Peak RAM Test</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="testColBottom" md={1} mdOffset={2}>
                                <span>{testOpens}</span>
                            </Col>
                            <Col className="testColBottom" md={1}>
                                <span>{test5min}</span>
                            </Col>
                            <Col className="testColBottom" md={1}>
                                <span>{testCloses}</span>
                            </Col>
                            <Col className="testColBottom" md={1}>
                                <span>{testRamString}</span>
                            </Col>
                            <Col className="testColBottom" md={1}>
                                <span>Not Yet Implemented</span>
                            </Col>

                        </Row>*/}
                        <Row style={{ marginLeft: 0, marginRight: 0 }}>
                            <Col className="reviewPanel" md={8} mdOffset={2}>
                            <Row  style={{ marginLeft: 0, marginRight: 0 }}>
                                <Col className="testResultsCol" md={12} mdOffset={0}>
                                    <Table striped bordered responsive condensed>
                                        <thead>
                                            <tr>
                                                <th>Opening Test</th>
                                                <th>Five Minute Test</th>
                                                <th>Closing Test</th>
                                                <th>Average RAM Usage</th>
                                                <th>Peak RAM Usage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{testOpens}</td>
                                                <td>{test5min}</td>
                                                <td>{testCloses}</td>
                                                <td>{testRamString}</td>
                                                <td>Not Yet Implemented</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>

                                <Row style={{ marginLeft: 0, marginRight: 0 }}>
                                <Col className="reviewCommentsCol" md={12} mdOffset={0}>
                                    <Form>
                                        <FormGroup controlId="reviewComments">
                                            <ControlLabel>Review Comments</ControlLabel>
                                            <FormControl componentClass="textarea" placeholder="Review Comments" onChange={this.handleReviewCommentsChange} />
                                            <HelpBlock>Must have a review comment to sumbit the review</HelpBlock>
                                        </FormGroup>
                                    </Form>
                                </Col>
                            </Row>
                                <Row style={{ marginLeft: 0, marginRight: 0 }}>
                                <Col md={2} mdOffset={2} style={{ padingLeft: 0, paddingRight: 0 }}>
                                    <Button className="acceptButton" disabled={this.state.buttonStatus} onClick={this.handleAccept}>Accept Game</Button>
                                </Col>
                                <Col md={2} mdOffset={1} style={{ padingLeft: 0, paddingRight: 0 }}>
                                    <Button className="denyButton" disabled={this.state.buttonStatus} onClick={this.handleDeny}>Deny Game</Button>
                                </Col>
                                <Col md={2} mdOffset={1} style={{ padingLeft: 0, paddingRight: 0 }}>
                                    <Button className="resubmitButton" disabled={this.state.buttonStatus} onClick={this.handleResubmit}>Require Changes</Button>
                                </Col>
                            </Row>
                        </Col>
                        </Row>
                    </Grid>
                    <Popup
                        open={this.state.reviewModal}
                        modal
                        closeOnDocumentClick={true}
                        lockScroll={true}
                    >
                        <a href="/admin"><div className="ReviewModal">
                            <span>{this.state.reviewMessage}</span><br></br>
                            <span>Click on this modal to return to the administration page</span><br></br>
                        </div></a>
                    </Popup>
                    <Popup
                        open={this.state.errorAlert}
                        modal
                        closeOnDocumentClick={false}
                        lockScroll={true}
                        >
                        <div className="ErrorModal">
                            <span>{this.state.errorAlertMessage}</span><br></br>
                            <span>Please reload the page and try again</span>
                        </div>
                    </Popup>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default ReviewPage;