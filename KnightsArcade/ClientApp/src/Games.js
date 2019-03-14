import React, { Component } from 'react';
import NaviBar from './Components/NavBar';
import './Games.css';
import {Panel, Grid, Row, Col, FormGroup, FormControl, InputGroup, DropdownButton, MenuItem, Form, ControlLabel} from 'react-bootstrap';

class Games extends Component {
  render() {
    return (
      <div className="games-page__form-container">
        <div className="games-page__search-row">
            <InputGroup style={{flexGrow: 1}}>
              <FormControl type="text"/>
              <DropdownButton
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title="Action"
              >
                <MenuItem key="1">Item</MenuItem>
              </DropdownButton>
            </InputGroup>
          <div className="games-page__sort">
          <p style={{width: 50}}>Sort by</p>
          <FormGroup>
            <FormControl componentClass="select" placeholder="select">
              <option value="select">select</option>
              <option value="other">...</option>
            </FormControl>
          </FormGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default Games;