import React, { Component } from 'react';
import { Image, Popover, OverlayTrigger} from 'react-bootstrap';
import './GameCard.css';
import { Storage } from 'aws-amplify';

export default class GameCard extends Component {
	constructor(props) {
		super(props);

	    this.state = {
	    	imgUrl: ""
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
		    .catch(err => console.log(err));

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
            .catch(err => console.log(err));
    }

    render(props) {
        if (this.props.gameData.gameImg[0] !== this.state.imgName) {
            this.updateImage();
        }
		const gameData = this.props.gameData;
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		const date = new Date(gameData.gameSubmissionDateUtc);
        const genres = [];
        const link = "/game?gameId=" + gameData.gameId;

		if(gameData.gameGenreAction === true) {
			genres.push("Action");
		}
		if(gameData.gameGenreAdventure === true) {
			genres.push("Adventure");
		}
		if(gameData.gameGenreFighting === true) {
			genres.push("Fighting");
		}
		if(gameData.gameGenrePlatformer === true) {
			genres.push("Platformer");
		}
		if(gameData.gameGenrePuzzle === true) {
			genres.push("Puzzle");
		}
		if(gameData.gameGenreRPG === true) {
			genres.push("RPG");
		}
		if(gameData.gameGenreRacing === true) {
			genres.push("Racing");
		}
		if(gameData.gameGenreRhythm === true) {
			genres.push("Rhythm");
		}
		if(gameData.gameGenreShooter === true) {
			genres.push("Shooter");
		}
		if(gameData.gameGenreSports === true) {
			genres.push("Sports");
		}
		if(gameData.gameGenreStrategy === true) {
			genres.push("Strategy");
		}
		if(gameData.gameGenreSurvival === true) {
			genres.push("Survival");
		}

		const genreList = genres.join(", ");

		const popoverHoverFocus = (
		  <Popover id="popover-trigger-hover-focus" title={gameData.gameName}>
		  	{gameData.gameDescription}
		  </Popover>
		);

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
						<p className="game-card__dev">Developer: {gameData.gameCreatorName}</p>
					</div>
					<p>Released: {date.toLocaleDateString("en-US", options)}</p>
					<p>{genreList}</p>
				</div>
			</div>
            </a>
			</OverlayTrigger>

		);
	}
}