import React from "react";
import Card from "./Card";
import axios from "axios";

import "./slick.css";
export default class SimpleSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          currentIndex: 4,
          hideNext: false,
          hidePrev: false,
        }
        this.loadPreviouos = this.loadPreviouos.bind(this);
        this.loadNext = this.loadNext.bind(this);
      }


      loadNext(){
        if(this.state.currentIndex == this.props.data.length){
          this.setState({hideNext: true, hidePrev: false})
        }
        this.setState({currentIndex: this.state.currentIndex + 1})
      }

      loadPreviouos(){
        if(this.state.currentIndex == 4){
          this.setState({hideNext: false, hidePrev: true})
        }if(this.state.currentIndex > 4){
          this.setState({currentIndex: this.state.currentIndex - 1})
        }
      }

  render() {
    return (
      <div className="container" style={{paddingBottom:'30px'}} >
          <h2 style={{paddingBottom:'25px'}}>{this.props.slickHeading}</h2>
          <span onClick={this.loadPreviouos} style={{display: this.state.hidePrev ? 'none' : 'block'}}> &lt; </span>
        <div class='d-flex w-80'>
            {this.props.data.slice(this.state.currentIndex - 4, this.state.currentIndex).map((dish)=> {
               return  <Card item={dish}/>
              })}
        </div>
        <span onClick={this.loadNext} style={{display: this.state.hideNext ? 'none' : 'block'}}> &gt; </span>
      </div>
    );
  }
}