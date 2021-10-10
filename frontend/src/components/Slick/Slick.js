import React from "react";
import Card from "../Card/Card";
import axios from "axios";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./slick.css";
export default class SimpleSlider extends React.Component {
    constructor(props) {
        super(props);
      }

    settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 700,
            settings: {
              arrows: false,
              slidesToShow: 3
            }
          },
          {
            breakpoint: 500,
            settings: {
              arrows: false,
              slidesToShow: 1
            }
          },
          {
            breakpoint: 400,
            settings: {
              arrows: false,
              slidesToShow: 1
            }
          }
        ]
      };

  render() {
    return (

      <div className="App">
      <div className="slider-wrapper">
      <p style={{fontSize: '16px', fontWeight: 600}}>{this.props.slickHeading}</p>
        <Slider {...this.settings}>
          {this.props.data.map((dish) =>
              <Card item={dish} navigate={this.props.navigate} refreshCart={this.props.refreshCart} />
          )}
        </Slider>
      </div>
    </div>
    );
  }
}