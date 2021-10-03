
import React , { Component}  from 'react';
import Carousel from 'react-bootstrap/Carousel'
import image1 from '../../images/carousel1.jpg'
import SimpleSlider from "../../components/Slick/Slick";
import Card from '../../components/Card/Card';
import './RestaurantHome.css'
import axios from 'axios';

export default function RestaurantHome() {
  const [data, setData] = React.useState([])
  const [restaurant, setRestaurant] = React.useState([])
  React.useEffect(() => {
    axios.get('http://localhost:3001/dishes/restaurant/1').then(res => {
      setData(res.data);
    })
    axios.get('http://localhost:3001/restaurants/1').then(res => { 
    setRestaurant(res.data[0]);
    })
  }, [])
return(
    <div>
    <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={image1}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={image1}
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={image1}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
<h3 id="DescriptionHeading">  Description </h3>
<p id="Description">{restaurant.description}</p>
  {window.screen.width <= 576 ? <div style={{display: 'grid', gridTemplateColumns: '1fr'}}>
    {data.map(item=>{
        return <Card item={item}/>
    })}
    </div>: 
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr'}}>
    {data.map(item=>{
        return <Card item={item}/>
    })}
    </div>
    }
    

</div>
)}