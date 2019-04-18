import React, { Component } from 'react'
import { Carousel, Grid, Row, Col, Image } from 'react-bootstrap';
import { Storage } from 'aws-amplify';
import '../App.css';

export class GameSlides extends Component {
    constructor(props) {
        super(props);
    }


    render(props) {
        if (this.props.numItems === 2) {
            return (
                <div className="App">
                    <Carousel>
                        <Carousel.Item>
                            <Image responsive width={896} height={504} alt="./Images/default.png" src={this.props.gameSlide0} />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image responsive width={896} height={504} alt="./Images/default.png" src={this.props.gameSlide1} />
                        </Carousel.Item>
                    </Carousel>
                </div>
            )
        }
        if (this.props.numItems === 3) {
            return (
                <div className="App">
                    <Carousel>
                        <Carousel.Item>
                            <Image responsive width={896} height={504} alt="./Images/default.png" src={this.props.gameSlide0} />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image responsive width={896} height={504} alt="./Images/default.png" src={this.props.gameSlide1} />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image responsive width={896} height={504} alt="./Images/default.png" src={this.props.gameSlide2} />
                        </Carousel.Item>
                    </Carousel>
                </div>
            )
        }
        if (this.props.numItems === 4) {
            return (
                <div className="App">
                    <Carousel>
                        <Carousel.Item>
                            <Image responsive width={896} height={504} alt="./Images/default.png" src={this.props.gameSlide0} />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image responsive width={896} height={504} alt="./Images/default.png" src={this.props.gameSlide1} />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image responsive width={896} height={504} alt="./Images/default.png" src={this.props.gameSlide2} />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image responsive width={896} height={504} alt="./Images/default.png" src={this.props.gameSlide3} />
                        </Carousel.Item>
                    </Carousel>
                </div>
            )
        }
        if (this.props.numItems === 5) {
            return (
                <div className="App">
                    <Carousel>
                        <Carousel.Item>
                            <Image responsive width={896} height={504} alt="./Images/default.png" src={this.props.gameSlide0} />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image responsive width={896} height={504} alt="./Images/default.png" src={this.props.gameSlide1} />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image responsive width={896} height={504} alt="./Images/default.png" src={this.props.gameSlide2} />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image responsive width={896} height={504} alt="./Images/default.png" src={this.props.gameSlide3} />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image responsive width={896} height={504} alt="./Images/default.png" src={this.props.gameSlide4} />
                        </Carousel.Item>
                    </Carousel>
                </div>
            )
        }
    }
}

export default GameSlides
