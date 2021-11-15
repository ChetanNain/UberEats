import React, { Component } from "react";
import SimpleSlider from "../../components/Slick/Slick";
import axios from "axios";
import "./home.css";
import { connect } from "react-redux";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.navigateToRestaurantHome = this.navigateToRestaurantHome.bind(this);
  }

  navigateToRestaurantHome(restaurantId) {
    this.props.history.push("/my-restaurant?resId=" + restaurantId);
  }

  render() {
    console.log(this.props.applyFilter, "hello");
    return (
      <div>
        <SimpleSlider
          data={this.props.dishes.filter(
            (dish) => dish.dishCategory == "Trending Now"
          )}
          slickHeading="Trending Now"
          refreshCart={this.props.refreshCart}
        />
        <SimpleSlider
          data={this.props.dishes.filter(
            (dish) => dish.dishCategory == "Healthy Eating"
          )}
          slickHeading="Healthy Eating"
          refreshCart={this.props.refreshCart}
        />
        <SimpleSlider
          data={this.props.dishes.filter(
            (dish) => dish.dishCategory == "Easy on Pocket"
          )}
          slickHeading="Easy On Pocket"
          refreshCart={this.props.refreshCart}
        />
        <SimpleSlider
          data={this.props.dishes.filter(
            (dish) => dish.dishCategory == "Todays Offer"
          )}
          slickHeading="Todays Offer"
          refreshCart={this.props.refreshCart}
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    dishes: state.masterData.dishes,
  };
}

export default connect(mapStateToProps)(Home);
