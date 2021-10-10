import React, { Component }  from 'react';
import SimpleSlider from "../../components/Slick/Slick";
import axios from 'axios';
import './home.css';
import { connect } from 'react-redux';

export class Home extends Component{
    constructor(props){
        super(props);
        this.navigateToRestaurantHome = this.navigateToRestaurantHome.bind(this);
    }

    navigateToRestaurantHome(restaurantId){
        this.props.history.push('/my-restaurant?resId='+restaurantId);
    }

    render(){
        console.log(this.props.applyFilter, "hello")
        return (
            <div>
                <SimpleSlider data = {this.props.dishes.filter(dish=> dish.dishCategory == 'Trending Now')} slickHeading = "Trending Now" navigate={this.navigateToRestaurantHome}/>
                <SimpleSlider data = {this.props.dishes.filter(dish=> dish.dishCategory == 'Healthy Eating')} slickHeading = "Healthy Eating" navigate={this.navigateToRestaurantHome}/>
                <SimpleSlider data = {this.props.dishes.filter(dish=> dish.dishCategory == 'Easy on Pocket')} slickHeading = "Easy On Pocket" navigate={this.navigateToRestaurantHome}/>
                <SimpleSlider data = {this.props.dishes.filter(dish=> dish.dishCategory == 'Todays Offer')} slickHeading = "Todays Offer" navigate={this.navigateToRestaurantHome}/>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        dishes: state.masterData.dishes
    };
}


export default connect(mapStateToProps)(Home);