import React, { Component } from 'react'
import { Image, Popover, OverlayTrigger } from 'react-bootstrap';
import { Storage } from 'aws-amplify';


export class ReviewComponent extends Component {

    constructor (props) {
      super(props);

      this.state = {
          subName: '',
          imgUrl: '',
          imgName: ''
      };
    }

    componentDidMount() {
        const imgPath = this.props.submissionData.gameImg[0];
        Storage.get(imgPath)
            .then(result => {
                this.setState({
                    imgName: this.props.submissionData.gameImg[0],
                    imgUrl: result
                });
            })
            .catch(err => { });

    }

    updateImage() {
        const imgPath = this.props.submissionData.gameImg[0];
        Storage.get(imgPath)
            .then(result => {
                this.setState({
                    imgName: this.props.submissionData.gameImg[0],
                    imgUrl: result
                });
            })
            .catch(err => { });
    }

    render(props) { 
        if (this.props.submissionData.gameImg[0] !== this.state.imgName) {
            this.updateImage();
        }

        const link = "/review?gameId=" + this.props.submissionData.gameId;
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(this.props.submissionData.gameSubmissionDateUtc);
        const genres = [];

        if (this.props.submissionData.gameGenreAction === true) {
            genres.push("Action");
        }
        if (this.props.submissionData.gameGenreAdventure === true) {
            genres.push("Adventure");
        }
        if (this.props.submissionData.gameGenreFighting === true) {
            genres.push("Fighting");
        }
        if (this.props.submissionData.gameGenrePlatformer === true) {
            genres.push("Platformer");
        }
        if (this.props.submissionData.gameGenrePuzzle === true) {
            genres.push("Puzzle");
        }
        if (this.props.submissionData.gameGenreRPG === true) {
            genres.push("RPG");
        }
        if (this.props.submissionData.gameGenreRacing === true) {
            genres.push("Racing");
        }
        if (this.props.submissionData.gameGenreRhythm === true) {
            genres.push("Rhythm");
        }
        if (this.props.submissionData.gameGenreShooter === true) {
            genres.push("Shooter");
        }
        if (this.props.submissionData.gameGenreSports === true) {
            genres.push("Sports");
        }
        if (this.props.submissionData.gameGenreStrategy === true) {
            genres.push("Strategy");
        }
        if (this.props.submissionData.gameGenreSurvival === true) {
            genres.push("Survival");
        }

        const genreList = genres.join(", ");

        const popoverHoverFocus = (
            <Popover id="popover-trigger-hover-focus" title={this.props.submissionData.gameName}>
                {this.props.submissionData.gameDescription}
            </Popover>
        );

    return (
        <div style={{marginBottom: 10}}>
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
                                <h3 className="game-card__game-title">{this.props.submissionData.gameName}</h3>
                                <p className="game-card__dev">Developer: {this.props.submissionData.gameCreatorName}</p>
                            </div>
                            <p>Released: {date.toLocaleDateString("en-US", options)}</p>
                            <p>{genreList}</p>
                        </div>
                    </div>
                </a>
            </OverlayTrigger>
        </div>
    )
  }
}

export default ReviewComponent
