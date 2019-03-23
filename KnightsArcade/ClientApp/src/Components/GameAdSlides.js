import React, { Component } from 'react'
import { Carousel, Grid, Row, Col } from 'react-bootstrap';
import { Storage } from 'aws-amplify';
import '../App.css';

export class GameSlides extends Component {
    constructor(props) {
        super(props);
    }


    render(props) {
        var slideshow;
      switch (this.props.numItems) {
          case 2:
              slideshow =
                  <Carousel>
                      <Carousel.Item>
                          <img width={896} height={504} alt="896x504" src={this.props.gameSlide0} />
                      </Carousel.Item>
                      <Carousel.Item>
                          <img width={896} height={504} alt="896x504" src={this.props.gameSlide1} />
                      </Carousel.Item>
                  </Carousel>
              break;

          case 3:
              slideshow =
                  <Carousel>
                      <Carousel.Item>
                          <img width={896} height={504} alt="896x504" src={this.props.gameSlide0} />
                      </Carousel.Item>
                      <Carousel.Item>
                          <img width={896} height={504} alt="896x504" src={this.props.gameSlide1} />
                      </Carousel.Item>
                      <Carousel.Item>
                          <img width={896} height={504} alt="896x504" src={this.props.gameSlide2} />
                      </Carousel.Item>
                  </Carousel>
              break;
          case 4:
              slideshow =
                  <Carousel>
                      <Carousel.Item>
                          <img width={896} height={504} alt="896x504" src={this.props.gameSlide0} />
                      </Carousel.Item>
                      <Carousel.Item>
                          <img width={896} height={504} alt="896x504" src={this.props.gameSlide1} />
                      </Carousel.Item>
                      <Carousel.Item>
                          <img width={896} height={504} alt="896x504" src={this.props.gameSlide2} />
                      </Carousel.Item>
                      <Carousel.Item>
                          <img width={896} height={504} alt="896x504" src={this.props.gameSlide3} />
                      </Carousel.Item>
                  </Carousel>
              break;
          case 5:
              slideshow =
                  <Carousel>
                      <Carousel.Item>
                          <img width={896} height={504} alt="896x504" src={this.props.gameSlide0} />
                      </Carousel.Item>
                      <Carousel.Item>
                          <img width={896} height={504} alt="896x504" src={this.props.gameSlide1} />
                      </Carousel.Item>
                      <Carousel.Item>
                          <img width={896} height={504} alt="896x504" src={this.props.gameSlide2} />
                      </Carousel.Item>
                      <Carousel.Item>
                          <img width={896} height={504} alt="896x504" src={this.props.gameSlide3} />
                      </Carousel.Item>
                      <Carousel.Item>
                          <img width={896} height={504} alt="896x504" src={this.props.gameSlide4} />
                      </Carousel.Item>
                  </Carousel>
              break;
      }
      return (
              
        <div className="App">
            <Grid>
                <Row>
                    <Col md={8} mdOffset={0}>
                          {slideshow}
                      </Col>
                 </Row>
             </Grid>
         </div>

     )
   }
}

export default GameSlides
