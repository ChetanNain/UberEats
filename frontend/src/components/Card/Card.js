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
    return(<div className="cardBody">
            <img className="card-img-top" src={image1} alt="Card image cap"/>
                <div className="card-body">
                <h5 className="card-title">{props.item.restaurant}</h5>
                            <div className="d-flex justify-content-between align-items-center p-2"><span className="card-text">{props.item.dishName}</span> 
                                     <span className="card-text">{props.item.price + '$'}</span></div>
                            
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex">
                                    <IconButton className="addToCart" aria-label="add to favorites" onClick={addToCart}>
                                        <AddShoppingCartIcon />
                                    </IconButton>
                                    
                                    <IconButton className="favoriteButton" aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                </div>

                                {props.item.dishType ? <CircleIcon style={{color: 'green', fontSize: '20px', right: 0}}/> : <CircleIcon style={{color: 'red', fontSize: '20px'}}/>}
                            </div>
                            </div>
                    </div>   
    )
    
    }