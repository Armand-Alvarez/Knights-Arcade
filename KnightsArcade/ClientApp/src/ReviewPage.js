import React, { Component } from 'react';
import NaviBar from './Components/NavBar';
import axios from 'axios';
import './GameAdvert.css';
import { Storage } from 'aws-amplify';
import GameAdSlides from './Components/GameAdSlides';
import Popup from 'reactjs-popup';
import { Grid, Row, Col, Glyphicon, Button, Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

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
            reviewModal: false,
            reviewMessage: "",
            reviewComments: "",
            gamedata: [],
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
    }

    handleReviewCommentsChange(e) {
        this.setState({ reviewComments: e.target.value });
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

            e.preventDefault();
            this.submitReview("d");
            this.setState({ reviewModal: true });
            this.setState({ reviewMessage: "The game has been denied successfully"})
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

        const genres = [];
        var glyph;
        var status;
        var slideshow;
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
                    <Grid fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                        {status}
                        <Row style={{ marginLeft: 0, marginRight: 0 }}>
                            <Col md={8} mdOffset={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <h1>{this.state.gamedata.gameName}</h1>
                            </Col>
                        </Row>
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
                                                    <FormControl.Static>{this.state.gamedata.gameCreatorName}</FormControl.Static>
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
                                                    <Button bsStyle='link'>Download Game</Button>
                                                </a>
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
                        </Row>
                        <Row>
                            <Col md={7} mdOffset={2}>
                                <Form>
                                    <FormGroup controlId="reviewComments">
                                        <ControlLabel>Review Comments</ControlLabel>
                                        <FormControl componentClass="textarea" onChange={this.handleReviewCommentsChange} />
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={2} mdOffset={2} style={{ padingLeft: 0, paddingRight: 0 }}>
                                <Button onClick={this.handleAccept}>Accept Game</Button>
                            </Col>
                            <Col md={2} mdOffset={1} style={{ padingLeft: 0, paddingRight: 0 }}>
                                <Button onClick={this.handleDeny}>Deny Game</Button>
                            </Col>
                            <Col md={2} mdOffset={1} style={{ padingLeft: 0, paddingRight: 0 }}>
                                <Button onClick={this.handleResubmit}>Require Changes</Button>
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
                </div>
            </div>
        )
    }
}

export default ReviewPage;