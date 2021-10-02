import React from "react";
import Card from "./Card";
import axios from "axios";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
          <div class="d-flex justify-content-between align-items-center">
         <ChevronLeftIcon onClick={this.loadPreviouos} style={{display: this.state.hidePrev ? 'none' : 'block'}}/>
        <div class='d-flex w-80'>
            {this.props.data.slice(this.state.currentIndex - 4, this.state.currentIndex).map((dish)=> {
               return  <Card item={dish}/>
              })}
        </div>
        <ChevronRightIcon onClick={this.loadNext} style={{display: this.state.hideNext ? 'none' : 'block'}}/>
        </div>
      </div>
    );
  }
}