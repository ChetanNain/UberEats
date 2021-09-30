import React from "react"
import "./slick.css";
import image1 from '../images/carousel1.jpg';
import axios from "axios";
import CircleIcon from '@mui/icons-material/Circle';
export default function Card(props){
     var addToCart =()=>{
        const data = {itemId: props.item.id, customerId: 1}
        axios.post("http://localhost:3001/addToCart", data)
        .then(
            res => {
                alert("Item added to cart.");
            }
        )
    }
    return(<div class="card" style={{minWidth: '18rem' , marginLeft:'10px', marginBottom:'10px'}}>
            <img class="card-img-top" src={image1} alt="Card image cap"/>
                <div class="card-body">
                <h5 class="card-title">{props.item.restaurant}</h5>
                            <div class="d-flex justify-content-between"><span class="card-text">{props.item.dishName}</span> <span class="card-text">{props.item.price + '$'}</span></div>
                            
                            
                                <div class="d-flex justify-content-between">
                                <a href="#" class="btn btn-primary" onClick = {addToCart} >Add to Cart</a>
                                    <CircleIcon style={{color: props.item.dishType == 'Veg' ? 'green' : 'red'}}/>
                            </div>
                            </div>
                    </div>   
    )
    
    }