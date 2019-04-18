import React, { Component } from 'react';
import { Image, Row, Col, Grid, OverlayTrigger, Popover } from 'react-bootstrap';
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

        const imgPath = this.props.gameData.gameImg[0];
        Storage.get(imgPath)
            .then(result => {
                this.setState({
                    imgUrl: result
                });
            })
            .catch(err => console.log(err));

        if (this.props.gameData.gameStatus === 'a') {
            this.setState({
                statusImg: require('../Images/approve.png'),
                status: "Approved"
            });
        }

        if (this.props.gameData.gameStatus === 'p') {
            this.setState({
                statusImg: require('../Images/pending.png'),
                status: "Pending Review"
            });
        }

        if (this.props.gameData.gameStatus === 't') {
            this.setState({
                statusImg: require('../Images/testing.png'),
                status: "Testing"
            });
        }

        if (this.props.gameData.gameStatus === 'd') {
            this.setState({
                statusImg: require('../Images/remove.png'),
                status: "Denied"
            });
        }

        if (this.props.gameData.gameStatus === 'r') {
            this.setState({
                statusImg: require('../Images/resubmit.png'),
                status: "Resubmit"
            });
        }
    }

    render(props) {
        const popoverHoverFocus = (
            <Popover id="popover-trigger-hover-focus" title={this.props.gameData.gameName}>
                {this.state.status}
            </Popover>
        );
        var link;
        if (this.props.gameData.gameStatus === 'r') {
            link = '/Resubmit?gameId=' + this.props.gameData.gameId;
        }
        if (this.props.gameData.gameStatus === 'a') {
            link = 'Game?gameId=' + this.props.gameData.gameId;
        }
        const gameData = this.props.gameData;
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(gameData.gameSubmissionDateUtc);

        if (this.props.gameData.gameStatus === 'r' || this.props.gameData.gameStatus === 'a') { 
            return (
                <OverlayTrigger
                    trigger={['hover', 'focus']}
                    placement="right"
                    overlay={popoverHoverFocus}
                >   
                    <a href={link}>
                    <div className="game-card__card">
                        <Image width={240} height={135} src={this.state.imgUrl} />
                        <div className="game-card__info-container">
                            <div className="game-card__info-row-1">
                                <h3 className="game-card__game-title">{gameData.gameName}</h3>
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
                    </a>
                </OverlayTrigger>
            );
        }

        return (
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="right"
                overlay={popoverHoverFocus}
            >
            <div className="game-card__card">
                <Image width={240} height={135} src={this.state.imgUrl} />
                <div className="game-card__info-container">
                    <div className="game-card__info-row-1">
                        <h3 className="game-card__game-title">{gameData.gameName}</h3>
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
            </OverlayTrigger>
        );
    }
}