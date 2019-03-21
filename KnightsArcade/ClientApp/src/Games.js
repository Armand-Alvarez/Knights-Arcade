import React, { Component } from 'react';
import axios from 'axios';
import NaviBar from './Components/NavBar';
import GameCard from './Components/GameCard';
import './Games.css';
import { Grid, Row, Col, FormGroup, FormControl, InputGroup, DropdownButton, MenuItem, Form, Jumbotron} from 'react-bootstrap';

class Games extends Component {
  
  constructor(props) {
    super(props);

    this.handleGenreSelect = this.handleGenreSelect.bind(this);

    this.state = {
      games: [],
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
    };
  }

  componentDidMount() {

    axios.get(`api/v1/Public/rds/games/allapprovedgames`)
      .then(res => {
        const games = res.data;
        this.setState({ games: games });
      })

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

    switch(eventKey) {
      case 0:
        this.setState({
          AllGenres: true,
          currentGenre: "All Genres"
        });
        break;
      case 1:
        this.setState({
          Action: true,
          currentGenre: "Action"
        });
        break;
      case 2:
        this.setState({
          Adventure: true,
          currentGenre: "Adventure"
        });
        break;
      case 3:
        this.setState({
          Fighting: true,
          currentGenre: "Fighting"
        });
        break;
      case 4:
        this.setState({
          Platformer: true,
          currentGenre: "Platformer"
        });
        break;
      case 5:
        this.setState({
          Puzzle: true,
          currentGenre: "Puzzle"
        });
        break;
      case 6:
        this.setState({
          RPG: true,
          currentGenre: "RPG"
        });
        break;
      case 7:
        this.setState({
          Racing: true,
          currentGenre: "Racing"
        });
        break;
      case 8:
        this.setState({
          Rhythm: true,
          currentGenre: "Rhythm"
        });
        break;
      case 9:
        this.setState({
          Shooter: true,
          currentGenre: "Shooter"
        });
        break;
      case 10:
        this.setState({
          Sports: true,
          currentGenre: "Sports"
        });
        break;
      case 11:
        this.setState({
          Strategy: true,
          currentGenre: "Strategy"
        });
        break;
      case 12:
        this.setState({
          Survival: true,
          currentGenre: "Survival"
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
          <Form style={{flexGrow: 1, alignSelf: "flex-start"}}>
            <FormGroup style={{marginBottom: 0}}>
              <InputGroup>
                <FormControl type="text" placeholder="Search"/>
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
            </FormGroup>
          </Form>
          <p style={{marginBottom:0, fontWeight: "bold", marginLeft: 20, marginRight: 15}}>Sort by</p>
          <Form>
            <FormGroup style={{marginBottom: 0}}>
              <FormControl componentClass="select" placeholder="select">
                <option value="select">Game Title</option>
                <option value="other">Developer Name</option>
                <option value="other">Release Date</option>
              </FormControl>
            </FormGroup>
          </Form>
        </div>
        
        <div className="games-page__game-list">
          {
            this.state.games.map((game) => {
              return <GameCard gameData={game} /> 
              })
          }
        </div>

      </div>
      </Col>
      </Row>
      </Grid>
      </div>
    )
  }
}

export default Games;