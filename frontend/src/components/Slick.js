import React from "react";
import Slider from "react-slick";
import Card from "./Card";

import "./slick.css";
export default class SimpleSlider extends React.Component {
    constructor(props) {
        super(props);
      }
  render() {
    var settings = {
        //dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
      };

      
    return (
      <div className="container" style={{paddingBottom:'30px'}} >
          <h2 style={{paddingBottom:'25px'}}>{this.props.slickHeading}</h2>
        <Slider {...settings}>
            {this.props.data.map((dish)=> {
               return  <Card item={dish}/>
              })}
        </Slider>
      </div>
    );
  }
}

