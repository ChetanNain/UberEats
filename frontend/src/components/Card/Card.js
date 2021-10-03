import React from "react"
import image1 from '../../images/carousel1.jpg';
import axios from "axios";
import CircleIcon from '@mui/icons-material/Circle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';

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
    return(<div class="cardBody">
            <img class="card-img-top" src={image1} alt="Card image cap"/>
                <div class="card-body">
                <h5 class="card-title">{props.item.restaurant}</h5>
                            <div class="d-flex justify-content-between align-items-center p-2"><span class="card-text">{props.item.dishName}</span> 
                                     <span class="card-text">{props.item.price + '$'}</span></div>
                            
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex">
                                    <IconButton aria-label="add to favorites" onClick={addToCart}>
                                        <AddShoppingCartIcon />
                                    </IconButton>
                                    
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                </div>

                                {props.item.dishType ? <CircleIcon style={{color: 'green', fontSize: '20px', right: 0}}/> : <CircleIcon style={{color: 'red', fontSize: '20px'}}/>}
                            </div>
                            </div>
                    </div>   
    )
    
    }