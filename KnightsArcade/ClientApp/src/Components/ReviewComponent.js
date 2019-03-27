import React, { Component } from 'react'
import { Panel } from 'react-bootstrap';



export class ReviewComponent extends Component {

    constructor (props) {
      super(props);

      this.state = {
        subName: '',
      };
    }

  render(props) {
    const submissionData = this.props.submissionData;
    const link = "/game?gameId=" + submissionData.gameId;

    return (
      <div>
        <Panel>
          <Panel.Body><a href={link}>{this.props.submissionData.gameName}</a></Panel.Body>
        </Panel>
      </div>
    )
  }
}

export default ReviewComponent
