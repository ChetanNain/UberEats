
import React , { Component}  from 'react';
import Carousel from 'react-bootstrap/Carousel'
import image1 from '../../images/carousel1.jpg'
import SimpleSlider from "../../components/Slick/Slick";
import Card from '../../components/Card/Card';
import './RestaurantHome.css'
import axios from 'axios';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BusinessIcon from '@mui/icons-material/Business';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function RestaurantHome(props) {
  const [data, setData] = React.useState([])
  const [restaurant, setRestaurant] = React.useState([])
  const [restaurantName, setRestaurantName] = React.useState();
  const [restaurantLocation, setRestaurantLocation] = React.useState();
  const [restaurantCity, setRestaurantCity] = React.useState();
  const [restaurantCountry, setRestaurantCountry] = React.useState();
  const [restaurantProvience, setRestaurantProvience] = React.useState();
  const [restaurantPincode, setRestaurantPincode] = React.useState();
  const [mobileNumber, setRestaurantMobileNumber] = React.useState();

  const search = props.location.search;
  const resId = new URLSearchParams(search).get('resId');
  React.useEffect(() => {
    const headerConfig = {
      headers: {
          'x-authentication-header': localStorage.getItem('token')
        }
    }
    if(!resId){
      axios.get('http://localhost:3001/restaurantDishes', headerConfig).then(res => {
            if(res.data){
              setData(res.data)
            }
      })
      axios.get('http://localhost:3001/restaurants', headerConfig).then(res => { 
        if(res.data && res.data.length > 0){
          setRestaurant(res.data[0])
        }
      })
      axios.get('http://localhost:3001/basicDetail', headerConfig).then(res=>{
        if(res.data){
          setRestaurantName(res.data.name);
          setRestaurantLocation(res.data.address);
          setRestaurantCity(res.data.city);
          setRestaurantCountry(res.data.country);
          setRestaurantProvience(res.data.provience);
          setRestaurantCountry(res.data.country);
          setRestaurantPincode(res.data.pincode);
          setRestaurantMobileNumber(res.data.mobileNumber);
        }
      })
  }else{
    axios.get('http://localhost:3001/restaurantDishes?restaurandId='+ resId, headerConfig).then(res => {
      setData(res.data);
    })
    axios.get('http://localhost:3001/restaurants?restaurandId='+ resId, headerConfig).then(res => { 
    setRestaurant(res.data[0]);
    })
    axios.get('http://localhost:3001/basicDetail?restaurandId='+ resId, headerConfig).then(res=>{
            setRestaurantName(res.data.name);
            setRestaurantLocation(res.data.address);
            setRestaurantCity(res.data.city);
            setRestaurantCountry(res.data.country);
            setRestaurantProvience(res.data.provience);
            setRestaurantCountry(res.data.country);
            setRestaurantPincode(res.data.pincode);
            setRestaurantMobileNumber(res.data.mobileNumber);
      })
  }
  }, [])

return(
    <div>
    <Carousel style={{height: '300px'}}>
  <Carousel.Item style={{height: '300px'}}>
    <img
      className="d-block w-100"
      src={image1}
      alt="First slide"
      style={{height: '300px'}}
    />
    <Carousel.Caption style={{background: 'black', opacity: '0.8'}}>
      <h3>Welcome to the cafe!</h3>
      <p>{restaurant.description}</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{height: '300px'}}>
    <img
      className="d-block w-100"
      src={image1}
      alt="Second slide"
      style={{height: '300px'}}
    />

    <Carousel.Caption style={{background: 'black', opacity: '0.8'}}>
      <h3>Welcome to the cafe!</h3>
      <p>{restaurant.description}</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{height: '300px'}}>
    <img
      className="d-block w-100"
      src={image1}
      alt="Third slide"
      style={{height: '300px'}}
    />

    <Carousel.Caption style={{background: 'black', opacity: '0.8'}}>
      <h3>Welcome to the cafe!</h3>
      <p>{restaurant.description}</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

  <div className='d-md-flex justify-content-center' style={{background: 'white'}}>
    <div class="addressBox" style={{padding: '3%'}}>
      <RestaurantIcon style={{width: '50px', height: '50px'}}/><span>{restaurantName}</span>
    </div>
    <div class="addressBox" style={{padding: '3%'}}>
      <LocationOnIcon style={{width: '50px', height: '50px'}}/><span>{restaurantLocation}, {restaurantCity}, {restaurantProvience}, {restaurantPincode}</span>
    </div>
    <div class="addressBox" style={{padding: '3%'}}>
      <PublicIcon style={{width: '50px', height: '50px'}}/><span>{restaurantCountry}</span>
    </div>
    <div class="addressBox" style={{padding: '3%'}}>
      <PhoneIphoneIcon style={{width: '50px', height: '50px'}}/><span>{mobileNumber}</span>
    </div>
  </div>

  <div onClick={()=>props.history.push('/add-restaurant')} class="addressBox" style={{padding: '20px', width: '350px', alignItems: 'center', margin: 'auto', display: restaurant.description ? 'none' : 'block'}}>
    <center><p style={{margin:'auto'}}>Click! Add your restaurant here.</p></center>
    </div>
  
 
<center><p>{restaurant.description}</p></center>
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