import React, { Component } from 'react'
import { Image, Popover, OverlayTrigger, Button } from 'react-bootstrap';
import { Storage } from 'aws-amplify';
import axios from 'axios';
import { Auth, AuthClass } from 'aws-amplify';


export class TestingComponent extends Component {

    constructor (props) {
      super(props);

        this.handleToPending = this.handleToPending.bind(this);

      this.state = {
          subName: '',
          imgUrl: '',
          imgName: ''
      };
    }

    componentDidMount() {
        const imgPath = this.props.gameData.gameImg[0];
        Storage.get(imgPath)
            .then(result => {
                this.setState({
                    imgName: this.props.gameData.gameImg[0],
                    imgUrl: result
                });
            })
            .catch(err => { });

    }

    handleToPending() {
        const game = {
            gameId: this.props.gameData.gameId,
            gameName: null,
            gameCreatorId: null,
            gameCreatorName: null,
            gameCreatorEmail: null,
            gameDescription: null,
            gameControls: null,
            gameVideolink: null,
            gameGenreSurvival: null,
            gameGenreFighting: null,
            gameGenrePuzzle: null,
            gameGenrePlatformer: null,
            gameGenreShooter: null,
            gameGenreStrategy: null,
            gameGenreSports: null,
            gameGenreRpg: null,
            gameGenreRacing: null,
            gameGenreAdventure: null,
            gameGenreAction: null,
            gameGenreRhythm: null,
            gameStatus: 'p',
            gameOnArcade: null,
            gamePath: null,
            gameImg: null,
            gameSubmissionDateUtc: null,
            gameReviewDateUtc: null

        }
        axios.put('/api/v1/Restricted/rds/games/game', game, {
            headers: {
                'Authorization' : "Bearer " + Auth.user.signInUserSession.accessToken.jwtToken
            }
        })
            .then(res => {
                if (res.status === 200) {
                    axios.delete('api/v1/Restricted/rds/testsqueue/testqueue?gameId=' + this.props.gameData.gameId, {
                        headers: {
                            'Authorization' : "Bearer " + Auth.user.signInUserSession.accessToken.jwtToken
                        }
                    })
                }
                this.props.updateFunc(this.props.gameData.gameId);
            })
    }

    updateImage() {
        const imgPath = this.props.gameData.gameImg[0];
        Storage.get(imgPath)
            .then(result => {
                this.setState({
                    imgName: this.props.gameData.gameImg[0],
                    imgUrl: result
                });
            })
            .catch(err => { });
    }

    render(props) { 
        if (this.props.gameData.gameImg[0] !== this.state.imgName) {
            this.updateImage();
        }

        const link = "/review?gameId=" + this.props.gameData.gameId;
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(this.props.gameData.gameSubmissionDateUtc);
        const genres = [];

        if (this.props.gameData.gameGenreAction === true) {
            genres.push("Action");
        }
        if (this.props.gameData.gameGenreAdventure === true) {
            genres.push("Adventure");
        }
        if (this.props.gameData.gameGenreFighting === true) {
            genres.push("Fighting");
        }
        if (this.props.gameData.gameGenrePlatformer === true) {
            genres.push("Platformer");
        }
        if (this.props.gameData.gameGenrePuzzle === true) {
            genres.push("Puzzle");
        }
        if (this.props.gameData.gameGenreRPG === true) {
            genres.push("RPG");
        }
        if (this.props.gameData.gameGenreRacing === true) {
            genres.push("Racing");
        }
        if (this.props.gameData.gameGenreRhythm === true) {
            genres.push("Rhythm");
        }
        if (this.props.gameData.gameGenreShooter === true) {
            genres.push("Shooter");
        }
        if (this.props.gameData.gameGenreSports === true) {
            genres.push("Sports");
        }
        if (this.props.gameData.gameGenreStrategy === true) {
            genres.push("Strategy");
        }
        if (this.props.gameData.gameGenreSurvival === true) {
            genres.push("Survival");
        }

        const genreList = genres.join(", ");

        const popoverHoverFocus = (
            <Popover id="popover-trigger-hover-focus" title={this.props.gameData.gameName}>
                {this.props.gameData.gameDescription}
            </Popover>
        );

    return (
        <div style={{ marginBottom: 10 }}>
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="right"
                overlay={popoverHoverFocus}
            >
                    <div className="game-card__card">
                        <Image width={240} height={135} src={this.state.imgUrl} />
                        <div className="game-card__info-container">
                            <div className="game-card__info-row-1">
                                <h3 className="game-card__game-title">{this.props.gameData.gameName}</h3>
                                <p className="game-card__dev">Developer: {this.props.gameData.gameCreatorName}</p>
                            </div>
                            <p>Released: {date.toLocaleDateString("en-US", options)}</p>
                            <p>{genreList}</p>
                        <Button className="ToPendingButton" onClick={this.handleToPending}>Send to pending</Button>
                        </div>
                    </div>
            </OverlayTrigger>
        </div>
    )
  }
}

export default TestingComponent
