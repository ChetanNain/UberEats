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
              slidesToShow: 2
            }
          },
          {
            breakpoint: 400,
            settings: {
              arrows: false,
              slidesToShow: 2
            }
          }
        ]
      };

  render() {
    return (

      <div className="App">

      <div className="slider-wrapper">
      <p>{this.props.slickHeading}</p>
        <Slider {...this.settings}>

          {this.props.data.map((dish) =>
              <Card item={dish} navigate={this.props.navigate} />
          )}

        </Slider>

      </div>

    </div>

      /* <div className="App" stlyle={{ background: 'black' }}>
        <div className="slider-wrapper">
          <Slider {...this.settings}>
            <div className="container" >
              <h5>{this.props.slickHeading}</h5>
              <div class='d-flex'>
                {this.props.data.map((dish) => {
                  return <Card item={dish} />
                })}
              </div>
            </div>
          </Slider>
        </div>      
    </div> */

      /* <div className="container" >
          <h5>{this.props.slickHeading}</h5>
          <div class="d-flex align-items-center">
          <span onClick={this.loadPreviouos}> <NavigateBeforeIcon/> </span>
            <div class='d-flex'>
                {this.props.data.slice(this.state.currentIndex - this.state.cardSize, this.state.currentIndex).map((dish)=> {
                  return  <Card item={dish}/>
                  })}
            </div>
        <span onClick={this.loadNext}> <NavigateNextIcon/> </span>
        </div>
      </div> */
    );
  }
}