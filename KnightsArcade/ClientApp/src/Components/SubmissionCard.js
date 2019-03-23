import React, { Component } from 'react';
import { Image, Popover, OverlayTrigger } from 'react-bootstrap';
import './GameCard.css';
import { Storage } from 'aws-amplify';

export default class GameCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imgUrl: "",
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
            this.setState({ status: require('../Images/approve.png') });
        }

        if (this.props.gameData.submissionStatus === 'p') {
            this.setState({ status: require('../Images/pending.png') });
        }

        if (this.props.gameData.submissionStatus === 't') {
            this.setState({ status: require('../Images/testing.png') });
        }

        if (this.props.gameData.submissionStatus === 'd') {
            this.setState({ status: require('../Images/remove.png') });
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
                        <p className="game-card__dev">Developer: {gameData.creatorName}</p>
                    </div>
                    <p>Released: {date.toLocaleDateString("en-US", options)}</p>
                    <img className="status-icon" src={this.state.status} />
                </div>
            </div>
        );
    }
}