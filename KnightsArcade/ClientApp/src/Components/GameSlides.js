import React, { Component } from 'react'
import { Carousel, Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Storage } from 'aws-amplify';
import '../App.css';

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
            GameTwoTitle: "",
            GameTwoImage: "",
            GameTwoDescription: "",
            GameThreeTitle: "",
            GameThreeImage: "",
            GameThreeDescription: ""
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
                console.log(response.data);
                return response.data;
            })
            .then(async (data) => {
                if (data.length === random) {
                    this.setState({ GameOneTitle: data[0].gameName })
                    this.setState({ GameOneDescription: data[0].gameDescription })
                    this.setState({ GameOneImage: await Storage.get(data[0].gameImg[0]) })
                    this.setState({ GameTwoTitle: data[1].gameName })
                    this.setState({ GameTwoDescription: data[1].gameDescription })
                    this.setState({ GameTwoImage: await Storage.get(data[1].gameImg[0]) })
                    this.setState({ GameThreeTitle: data[2].gameName })
                    this.setState({ GameThreeDescription: data[2].gameDescription })
                    this.setState({ GameThreeImage: await Storage.get(data[2].gameImg[0]) })
                    console.log(Storage.get(data[0].gameImg[0]));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    updateVariables

    getThreeRandom(data) {
        console.log(data);
    }

    
  render() {
    return (
      <div className="App">
        <Grid>
        <Row>
        <Col md={8} mdOffset={2}>
        <Carousel>
        <Carousel.Item>
            <img width={900} height={500} alt="900x500" src={this.state.GameOneImage} />
            <Carousel.Caption>
            <h3>{this.state.GameOneTitle}</h3>
            <p>{this.state.GameOneDescription}</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img width={900} height={500} alt="900x500" src={this.state.GameTwoImage} />
            <Carousel.Caption>
            <h3>{this.state.GameTwoTitle}</h3>
            <p>{this.state.GameTwoDescription}</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img width={900} height={500} alt="900x500" src={this.state.GameThreeImage} />
            <Carousel.Caption>
            <h3>{this.state.GameThreeTitle}</h3>
            <p>{this.state.GameThreeDescription}</p>
            </Carousel.Caption>
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
