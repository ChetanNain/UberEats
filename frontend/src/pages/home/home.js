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
         this.navigateToRestaurantHome = this.navigateToRestaurantHome.bind(this);
      }

    componentDidMount(){
        this.loadTrendingNow();
        this.loadEasyOnPocket();
        this.loadHealthyEating();
        this.loadTodaysOffer();
    }

    headerConfig = {
        headers: {
            'x-authentication-header': localStorage.getItem('token')
          }
        }
    loadTrendingNow(){
        axios.get('http://localhost:3001/dishes/Trending Now', this.headerConfig).then(res=>{
            this.setState({trendingNow: res.data})
        })
    }

    navigateToRestaurantHome(restaurantId){
        console.log(restaurantId);
        this.props.history.push('/my-restaurant/');
    }

    loadTodaysOffer(){
        axios.get('http://localhost:3001/dishes/Todays Offer', this.headerConfig).then(res=>{
            this.setState({todaysOffer: res.data})
        })
    }

    loadHealthyEating(){
        axios.get('http://localhost:3001/dishes/Healthy Eating', this.headerConfig).then(res=>{
            this.setState({healthyEating: res.data})
        })
    }

    loadEasyOnPocket(){
        axios.get('http://localhost:3001/dishes/Easy on Pocket', this.headerConfig).then(res=>{
            this.setState({easyOnPocket: res.data})
        })
    }

    render() {
        return (
            <div>
                <SimpleSlider data = {this.state.todaysOffer} slickHeading = "Todays Offer" navigate = {this.navigateToRestaurantHome}/><br/>
                <SimpleSlider data = {this.state.trendingNow} slickHeading = "Trending Now" navigate={this.navigateToRestaurantHome}/><br/>
                <SimpleSlider data = {this.state.healthyEating} slickHeading = "Healthy Eating" navigate={this.navigateToRestaurantHome}/><br/>
                <SimpleSlider data = {this.state.easyOnPocket} slickHeading = "Easy On Pocket" navigate={this.navigateToRestaurantHome}/><br/>
            </div>
        )
    }


}