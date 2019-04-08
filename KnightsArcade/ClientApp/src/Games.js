import React, { Component } from 'react';
import axios from 'axios';
import NaviBar from './Components/NavBar';
import GameCard from './Components/GameCard';
import './Games.css';
import Footer from './Components/Footer';
import {
    Grid, Row, Col, FormGroup, FormControl, InputGroup, DropdownButton, MenuItem, Form, Jumbotron, Button, ButtonToolbar, ControlLabel
} from 'react-bootstrap';

class Games extends Component {
  
  constructor(props) {
    super(props);

    this.handleGenreSelect = this.handleGenreSelect.bind(this);
    this.handleSortBySelect = this.handleSortBySelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);

      const urlParams = new URLSearchParams(window.location.search);
      const urlSearch = urlParams.get('search');

    this.state = {
      games: [],
      gamesList: [],
      currentSortBy: "Game Title",
      currentGenre: "All Genres",
      AllGenres: true,
      Action: false,
      Adventure: false,
      Fighting: false,
      Platformer: false,
      Puzzle: false,
      RPG: false,
      Racing: false,
      Rhythm: false,
      Shooter: false,
      Sports: false,
      Strategy: false,
      Survival: false,
      searchValue: urlSearch
      };
  }

  componentDidMount() {

    axios.get(`api/v1/Public/rds/games/allapprovedgames`)
      .then(res => {
          const games = res.data;
          this.setState({
              games: games,
              gamesList: games
          });
        })
        .then(any => {
            this.initialSearch();
        })
    }

    initialSearch() {
        try {
            var tempGameList = []
            this.state.games.map((game) => {
                if (game.gameName.toLowerCase().search(this.state.searchValue.toLowerCase()) >= 0 || game.gameCreatorName.toLowerCase().search(this.state.searchValue.toLowerCase()) >= 0) {
                    tempGameList.push(game);
                }
            })
            this.setState({
                gamesList: tempGameList
            });
        }
        catch
        {
            this.setState({
                gamesList: this.state.games
            });
        }
    }

    handleSearchChange(e) {
        this.setState({ searchValue: e.target.value });
        try {
            if (this.state.searchValue === "" || this.state.searchValue === null) {
                this.setState({
                    gamesList: this.state.games
                });
            }
            var tempGameList = []
                this.state.games.map((game) => {
                if (game.gameName.toLowerCase().search(this.state.searchValue.toLowerCase()) >= 0  || game.gameCreatorName.toLowerCase().search(this.state.searchValue.toLowerCase()) >= 0) {
                    tempGameList.push(game);
                }
            })
            this.setState({
                gamesList: tempGameList
            });
        }
        catch
        {
            this.setState({
                gamesList: this.state.games
            });
        }
    }


  handleGenreSelect(eventKey) {
    
    this.setState({
      AllGenres: false,
      Action: false,
      Adventure: false,
      Fighting: false,
      Platformer: false,
      Puzzle: false,
      RPG: false,
      Racing: false,
      Rhythm: false,
      Shooter: false,
      Sports: false,
      Strategy: false,
      Survival: false,
    });
      console.log(eventKey);
    switch (eventKey) {
      case 0:
        this.setState({
          AllGenres: true,
          currentGenre: "All Genres",
          gamesList: this.state.games
        });
        break;
      case 1:
        this.setState({
          Action: true,
          currentGenre: "Action",
          gamesList: this.state.games.filter(x => x.gameGenreAction == true)
        });
        break;
      case 2:
        this.setState({
          Adventure: true,
          currentGenre: "Adventure",
          gamesList: this.state.games.filter(x => x.gameGenreAdventure == true)
        });
        break;
      case 3:
        this.setState({
          Fighting: true,
          currentGenre: "Fighting",
          gamesList: this.state.games.filter(x => x.gameGenreFighting == true)
        });
        break;
      case 4:
        this.setState({
          Platformer: true,
          currentGenre: "Platformer",
          gamesList: this.state.games.filter(x => x.gameGenrePlatformer == true)
        });
        break;
      case 5:
        this.setState({
          Puzzle: true,
          currentGenre: "Puzzle",
          gamesList: this.state.games.filter(x => x.gameGenrePuzzle == true)
        });
        break;
      case 6:
        this.setState({
          RPG: true,
          currentGenre: "RPG",
          gamesList: this.state.games.filter(x => x.gameGenreRPG == true)
        });
        break;
      case 7:
        this.setState({
          Racing: true,
          currentGenre: "Racing",
          gamesList: this.state.games.filter(x => x.gameGenreRacing == true)
        });
        break;
      case 8:
        this.setState({
          Rhythm: true,
          currentGenre: "Rhythm",
          gamesList: this.state.games.filter(x => x.gameGenreRhythm == true)
        });
        break;
      case 9:
        this.setState({
          Shooter: true,
          currentGenre: "Shooter",
          gamesList: this.state.games.filter(x => x.gameGenreShooter == true)
        });
        break;
      case 10:
        this.setState({
          Sports: true,
          currentGenre: "Sports",
          gamesList: this.state.games.filter(x => x.gameGenreSports == true)
        });
        break;
      case 11:
        this.setState({
          Strategy: true,
          currentGenre: "Strategy",
          gamesList: this.state.games.filter(x => x.gameGenreStrategy == true)
        });
        break;
      case 12:
        this.setState({
          Survival: true,
          currentGenre: "Survival",
          gamesList: this.state.games.filter(x => x.gameGenreSurvival == true)
        });
        break;
      }
      console.log("asasas");
    }

    handleSortBySelect(eventKey) {
        console.log(eventKey.target.value);
        switch (eventKey.target.value) {
            case "Game Title":
                this.setState({
                    gamesList: this.state.gamesList.sort(function (a, b) {
                        if (a.gameName < b.gameName)
                            return -1;
                        else if (a.gameName > b.gameName)
                            return 1;
                        else
                            return 0;
                    }),
                });
            break;
            case "Developer Name":
                this.setState({
                    gamesList: this.state.gamesList.sort(function (a, b) {
                        if (a.gameCreatorName < b.gameCreatorName)
                            return -1;
                        else if (a.gameCreatorName > b.gameCreatorName)
                            return 1;
                        else
                            return 0;
                    }),
                    currentSortBy: "Developer Name"
                });
            break;
            case "Release Date":
                this.setState({
                    gamesList: this.state.gamesList.sort(function (a, b) {
                        return new Date(b.gameReviewDateUtc) - new Date(a.gameReviewDateUtc);
                    }),
                    currentSortBy: "Release Date"
                });
            break;
        }
    }

    render() {

    return (
      <div className="games-page">
      
      <NaviBar/>
      
      <Jumbotron style={{marginBottom: 10, marginTop: 10}}>
        <Grid fluid>
        <Row>
        <Col sm={6} smOffset={3}>
        <h1>Game Library</h1>
        <p>
          Explore the official game library of KnightsArcade. Filled only with games made by proud UCF Knights.
        </p>
        </Col>
        </Row>
        </Grid>
      </Jumbotron>
      
      <Grid fluid>
      <Row>
      <Col sm={6} smOffset={3}>
      <div className="games-page__form-container">
        <div className="games-page__search-row">
          <div style={{flexGrow: 1, alignSelf: "flex-start"}}>
            <div style={{marginBottom: 0}}>
              <InputGroup>
                <FormControl as="textarea" placeholder="Search" value={this.state.searchValue} onChange={this.handleSearchChange}></FormControl>
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id="input-dropdown-addon"
                  title={this.state.currentGenre}
                >
                  <MenuItem eventKey={0} onSelect={this.handleGenreSelect} disabled={this.state.AllGenres}>All Genres</MenuItem>
                  <MenuItem eventKey={1} onSelect={this.handleGenreSelect} disabled={this.state.Action}>Action</MenuItem>
                  <MenuItem eventKey={2} onSelect={this.handleGenreSelect} disabled={this.state.Adventure}>Adventure</MenuItem>
                  <MenuItem eventKey={3} onSelect={this.handleGenreSelect} disabled={this.state.Fighting}>Fighting</MenuItem>
                  <MenuItem eventKey={4} onSelect={this.handleGenreSelect} disabled={this.state.Platformer}>Platformer</MenuItem>
                  <MenuItem eventKey={5} onSelect={this.handleGenreSelect} disabled={this.state.Puzzle}>Puzzle</MenuItem>
                  <MenuItem eventKey={6} onSelect={this.handleGenreSelect} disabled={this.state.RPG}>RPG</MenuItem>
                  <MenuItem eventKey={7} onSelect={this.handleGenreSelect} disabled={this.state.Racing}>Racing</MenuItem>
                  <MenuItem eventKey={8} onSelect={this.handleGenreSelect} disabled={this.state.Rhythm}>Rhythm</MenuItem>
                  <MenuItem eventKey={9} onSelect={this.handleGenreSelect} disabled={this.state.Shooter}>Shooter</MenuItem>
                  <MenuItem eventKey={10} onSelect={this.handleGenreSelect} disabled={this.state.Sports}>Sports</MenuItem>
                  <MenuItem eventKey={11} onSelect={this.handleGenreSelect} disabled={this.state.Strategy}>Strategy</MenuItem>
                  <MenuItem eventKey={12} onSelect={this.handleGenreSelect} disabled={this.state.Survival}>Survival</MenuItem>
                </DropdownButton>
              </InputGroup>
            </div>
        </div>
        <p style={{ marginBottom: 0, fontWeight: "bold", marginLeft: 20, marginRight: 15 }}>Sort by</p>
        <Form>
            <FormGroup style={{marginBottom: 0}}>
              <FormControl onChange={this.handleSortBySelect} componentClass="select" placeholder="select">
                <option>Game Title</option>
                <option>Developer Name</option>
                <option>Release Date</option>
              </FormControl>
            </FormGroup>
          </Form>
          
        </div>
        
        <div className="games-page__game-list">
          {
            this.state.gamesList.map((game) => {
              return <GameCard gameData={game} /> 
              })
          }
        </div>

      </div>
      </Col>
      </Row>
            </Grid>
            <Footer scrolls={true}/>

      </div>
        )
  }
}

export default Games;