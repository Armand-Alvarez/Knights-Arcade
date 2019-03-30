import React, { Component } from 'react'
import { Panel, Button, ButtonToolbar, Label } from 'react-bootstrap';
import axios from 'axios'



export class ManageGamesComponent extends Component {

  constructor (props) {
    super(props);

    this.handlePush = this.handlePush.bind(this);
    this.handlePull = this.handlePull.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    //this.handleClick = this.handleClick.bind(this);

    this.state = {
      gameName: '',
      gameId: '',
      onArcadeMachine: false
    };
  }

  componentDidMount() {

    this.state.gameId = this.props.gameData.gameId;
    this.state.gameName = this.props.gameData.gameName;
    this.state.onArcadeMachine = this.props.gameData.gameOnArcade;
  }

  handlePush() {
    const game = {
      gameId : this.state.gameId,
      gameName : null,
      gameCreatorId	: null,
      gameCreatorName	: null,
      gameDescription	: null,
      gameControls	: null,
      gameVideolink	: null,
      gameGenreSurvival	: null,
      gameGenreFighting	: null,
      gameGenrePuzzle	: null,
      gameGenrePlatformer	: null,
      gameGenreShooter	: null,
      gameGenreStrategy	: null,
      gameGenreSports	: null,
      gameGenreRpg	: null,
      gameGenreRacing	: null,
      gameGenreAdventure	: null,
      gameGenreAction	: null,
      gameGenreRhythm	: null,
      gameStatus	: null,
      gameOnArcade	: true,
      gamePath	: null,
      gameImg	: null,
      gameSubmissionDateUtc	: null,
      gameReviewDateUtc	: null

      }
      axios.put('/api/v1/Restricted/rds/games/game', game)
          .then(res => {
              this.setState({ onArcadeMachine: true });
              this.forceUpdate();
          })
  }

  handlePull() {
    const game = {
      gameId : this.props.gameData.gameId,
      gameName : null,
      gameCreatorId	: null,
      gameCreatorName	: null,
      gameDescription	: null,
      gameControls	: null,
      gameVideolink	: null,
      gameGenreSurvival	: null,
      gameGenreFighting	: null,
      gameGenrePuzzle	: null,
      gameGenrePlatformer	: null,
      gameGenreShooter	: null,
      gameGenreStrategy	: null,
      gameGenreSports	: null,
      gameGenreRpg	: null,
      gameGenreRacing	: null,
      gameGenreAdventure	: null,
      gameGenreAction	: null,
      gameGenreRhythm	: null,
      gameStatus	: null,
      gameOnArcade	: false,
      gamePath	: null,
      gameImg	: null,
      gameSubmissionDateUtc	: null,
      gameReviewDateUtc	: null

      }
      axios.put('/api/v1/Restricted/rds/games/game', game)
          .then(res => {
              this.setState({ onArcadeMachine: false });
              this.forceUpdate();
          })
  }

  handleDelete() {
<<<<<<< HEAD
    axios.delete("/api/v1/Restricted/rds/games/game?gameid=" + this.props.gameData.gameId)

    this.props.updateFunc(this.props.gameData.gameId);
=======
      axios.delete("/api/v1/Restricted/rds/games/game?gameid=" + this.props.gameData.gameId)
>>>>>>> acc7bca2a181bbaf301aeaaf3215f9ffda303797
  }



  render(props) {
    const gameData = this.props.gameData;
    const link = "/game?gameId=" + gameData.gameId;
    var arcadeStatus;

    if (this.state.onArcadeMachine)
      arcadeStatus = <Label bsStyle="success">On Arcade Machines</Label>
    else
      arcadeStatus = <Label bsStyle="danger">Not On Arcade Machines</Label>

    return (
      <div>
        <Panel>
          <Panel.Heading>
            {/*Link to the game ad page. */}
            <a href={link}>{this.props.gameData.gameName}</a>
          </Panel.Heading>
          <Panel.Body>
              <ButtonToolbar>
                  {/* Button pushes game to arcade machine */}
                  <Button 
                    onClick={this.handlePush}
                    bsStyle="success">
                    Push to Arcade Machines</Button>
                  {/* Button takes game off of arcade machine */}
                  <Button 
                    onClick={this.handlePull}
                    bsStyle="warning">
                    Take Games Off Arcade Machines</Button>
                  {/* Button deletes game altogether*/}
                  <Button 
                    onClick={this.handleDelete}
                    bsStyle="danger">
                  Delete Game From System</Button>
              </ButtonToolbar>
          </Panel.Body>
          <Panel.Footer>
              {/*Label that is only activated if game IS on the arcade machine */}
              {arcadeStatus}
          </Panel.Footer>
        </Panel>
      </div>
    )
  }
}

export default ManageGamesComponent
