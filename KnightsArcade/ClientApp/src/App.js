import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './Home';
import MyProfile from './MyProfile';
import Games from './Games';
import About from './About';
import Submit from './Submit';
import GameAdvert from './GameAdvert';
import Login from './Login';
import GameCard from './Components/GameCard';

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
          <Route path="/GameAdvert" component={GameAdvert}/>
          <Route path="/Login" component={Login}/>
          <Route path="/GameCard" component={GameCard}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;