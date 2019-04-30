import React, { Component } from 'react'
import { Carousel, Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Storage } from 'aws-amplify';
import './GameSlides.css';
import { Auth, AWS } from 'aws-amplify';
import aws4 from 'aws4';

export class GameSlides extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleGameOneTitleChange = this.handleGameOneTitleChange.bind(this);
        this.handleGameOneImageChange = this.handleGameOneImageChange.bind(this);
        this.handleGameOneDescriptionChange = this.handleGameOneDescriptionChange.bind(this);
        this.handleGameTwoTitleChange = this.handleGameTwoTitleChange.bind(this);
        this.handleGameTwoImageChange = this.handleGameTwoImageChange.bind(this);
        this.handleGameTwoDescriptionChange = this.handleGameTwoDescriptionChange.bind(this);
        this.handleGameThreeTitleChange = this.handleGameThreeTitleChange.bind(this);
        this.handleGameThreeImageChange = this.handleGameThreeImageChange.bind(this);
        this.handleGameThreeDescriptionChange = this.handleGameThreeDescriptionChange.bind(this);

        this.state = {
            Data: [],
            GameOneTitle: "",
            GameOneImage: "",
            GameOneDescription: "",
            GameOneId: "",
            GameTwoTitle: "",
            GameTwoImage: "",
            GameTwoDescription: "",
            GameTwoId: "",
            GameThreeTitle: "",
            GameThreeImage: "",
            GameThreeDescription: "",
            GameThreeId: ""
        }

        this.getApprovedGames();
    }

    handleGameOneTitleChange(e) {
        this.setState({ GameOneTitle: e.target.value });
    }
    handleGameOneImageChange(e) {
        this.setState({ GameOneImage: e.target.value });
    }
    handleGameOneDescriptionChange(e) {
        this.setState({ GameOneDescription: e.target.value });
    }
    handleGameTwoTitleChange(e) {
        this.setState({ GameTwoTitle: e.target.value });
    }
    handleGameTwoImageChange(e) {
        this.setState({ GameTwoImage: e.target.value });
    }
    handleGameTwoDescriptionChange(e) {
        this.setState({ GameTwoDescription: e.target.value });
    }
    handleGameThreeTitleChange(e) {
        this.setState({ GameThreeTitle: e.target.value });
    }
    handleGameThreeImageChange(e) {
        this.setState({ GameThreeImage: e.target.value });
    }
    handleGameThreeDescriptionChange(e) {
        this.setState({ GameThreeDescription: e.target.value });
    }

    getApprovedGames() {
        const random = 3;
        axios.get('/api/v1/Public/rds/games/randomgamesapproved?random=' + random)
            .then((response) => {
                return response.data;
            })
            .then(async (data) => {
                if (data.length === random) {
                    this.setState({ GameOneTitle: data[0].gameName })
                    this.setState({ GameOneDescription: data[0].gameDescription })
                    this.setState({ GameOneImage: await Storage.get(data[0].gameImg[0], { level: 'public' }) })
                    this.setState({ GameOneId: data[0].gameId })
                    this.setState({ GameTwoTitle: data[1].gameName })
                    this.setState({ GameTwoDescription: data[1].gameDescription })
                    this.setState({ GameTwoImage: await Storage.get(data[1].gameImg[0], { level: 'public' }) })
                    this.setState({ GameTwoId: data[1].gameId })
                    this.setState({ GameThreeTitle: data[2].gameName })
                    this.setState({ GameThreeDescription: data[2].gameDescription })
                    this.setState({ GameThreeImage: await Storage.get(data[2].gameImg[0], { level: 'public' }) })
                    this.setState({ GameThreeId: data[2].gameId })
                }
            })
            .catch(function (error) {
            });
    }

    updateVariables

    getThreeRandom(data) {
    }


    render() {
        const GameOneLink = "/game?gameId=" + this.state.GameOneId;
        const GameTwoLink = "/game?gameId=" + this.state.GameTwoId;
        const GameThreeLink = "/game?gameId=" + this.state.GameThreeId;
        return (
            <div>
                <Grid>
                    <Row>
                        <Col md={8} mdOffset={2}>
                            <Carousel className="slides">
                                <Carousel.Item>
                                    <a href={GameOneLink}>
                                        <img width={900} height={500} src={this.state.GameOneImage} />
                                        <Carousel.Caption>
                                            <h3 className="Slideshowtext">{this.state.GameOneTitle}</h3>
                                            <p className="Slideshowtext">{this.state.GameOneDescription}</p>
                                        </Carousel.Caption>
                                    </a>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <a href={GameTwoLink}>
                                        <img width={900} height={500} src={this.state.GameTwoImage} />
                                        <Carousel.Caption>
                                            <h3 className="Slideshowtext">{this.state.GameTwoTitle}</h3>
                                            <p className="Slideshowtext">{this.state.GameTwoDescription}</p>
                                        </Carousel.Caption>
                                    </a>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <a href={GameThreeLink}>
                                        <img width={900} height={500} src={this.state.GameThreeImage} />
                                        <Carousel.Caption>
                                            <h3 className="Slideshowtext">{this.state.GameThreeTitle}</h3>
                                            <p className="Slideshowtext">{this.state.GameThreeDescription}</p>
                                        </Carousel.Caption>
                                    </a>
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default GameSlides
