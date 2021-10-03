import React , { Component}  from 'react';
import SimpleSlider from "../../components/Slick/Slick";
import axios from 'axios';
import './home.css'
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            trendingNow: [],
            easyOnPocket: [],
            healthyEating: [],
            todaysOffer: []
         };
      }

    componentDidMount(){
        
        this.loadTrendingNow();
        this.loadEasyOnPocket();
        this.loadHealthyEating();
        this.loadTodaysOffer();
    }

    loadTrendingNow(){
        axios.get('http://localhost:3001/dishes/Trending Now').then(res=>{
            this.setState({trendingNow: res.data})
        })
    }

    loadTodaysOffer(){
        axios.get('http://localhost:3001/dishes/Todays Offer').then(res=>{
            this.setState({todaysOffer: res.data})
        })
    }

    loadHealthyEating(){
        axios.get('http://localhost:3001/dishes/Healthy Eating').then(res=>{
            this.setState({healthyEating: res.data})
        })
    }

    loadEasyOnPocket(){
        axios.get('http://localhost:3001/dishes/Easy on Pocket').then(res=>{
            this.setState({easyOnPocket: res.data})
        })
    }

    render() {
        return (
            <div>
                <SimpleSlider data = {this.state.todaysOffer} slickHeading = "Todays Offer"/><br/>
                <SimpleSlider data = {this.state.trendingNow} slickHeading = "Trending Now"/><br/>
                <SimpleSlider data = {this.state.healthyEating} slickHeading = "Healthy Eating"/><br/>
                <SimpleSlider data = {this.state.easyOnPocket} slickHeading = "Easy On Pocket"/><br/>
            </div>
        )
    }


}