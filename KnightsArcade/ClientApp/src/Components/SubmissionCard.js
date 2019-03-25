import React, { Component } from 'react';
import { Image, Row, Col, Grid } from 'react-bootstrap';
import './GameCard.css';
import { Storage } from 'aws-amplify';

export default class GameCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imgUrl: "",
            statusImg: "",
            status: ""
        };
    }

    componentDidMount() {

        const imgPath = this.props.gameData.submissionImage0;
        Storage.get(imgPath)
            .then(result => {
                this.setState({
                    imgUrl: result
                });
            })
            .catch(err => console.log(err));

        if (this.props.gameData.submissionStatus === 'a') {
            this.setState({
                statusImg: require('../Images/approve.png'),
                status: "Approved"
            });
        }

        if (this.props.gameData.submissionStatus === 'p') {
            this.setState({
                statusImg: require('../Images/pending.png'),
                status: "Pending Review"
            });
        }

        if (this.props.gameData.submissionStatus === 't') {
            this.setState({
                statusImg: require('../Images/testing.png'),
                status: "Testing"
            });
        }

        if (this.props.gameData.submissionStatus === 'd') {
            this.setState({
                statusImg: require('../Images/remove.png'),
                status: "Denied"
            });
        }
    }

    render(props) {

        const gameData = this.props.gameData;
        console.log(gameData);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(gameData.submissionDateUtc);

        return (
            <div className="game-card__card">
                <Image width={240} height={135} src={this.state.imgUrl} />
                <div className="game-card__info-container">
                    <div className="game-card__info-row-1">
                        <h3 className="game-card__game-title">{gameData.submissionName}</h3>
                    </div>
                    <div>
                        <div className="submission-card-info">
                            <p className="game-card__dev">Developer: {gameData.creatorName}</p>
                            <p>Released: {date.toLocaleDateString("en-US", options)}</p>
                        </div>
                        <div className="submission-card-icon">
                            <img className="status-icon" src={this.state.statusImg} alt={this.state.status} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}