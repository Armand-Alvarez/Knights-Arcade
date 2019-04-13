import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './Home';
import MyProfile from './MyProfile';
import Locations from './Locations';
import Games from './Games';
import About from './About';
import Submit from './Submit';
import GameAdvert from './GameAdvert';
import Login from './Login';
import Admin from './Admin';
import GameCard from './Components/GameCard';
import ReviewPage from './ReviewPage';
import Resubmit from './Resubmit';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/MyProfile" component={MyProfile}/>
          <Route path="/Games" component={Games}/>
          <Route path="/About" component={About}/>
          <Route path="/Submit" component={Submit}/>
          <Route path="/Game" component={GameAdvert}/>
          <Route path="/Login" component={Login}/>
          <Route path="/GameCard" component={GameCard}/>
          <Route path="/Admin" component={Admin}/>
          <Route path="/Review" component={ReviewPage}/>
          <Route path="/Locations" component={Locations}/>
          <Route path="/Resubmit" component={Resubmit}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;