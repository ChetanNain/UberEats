import React, { useState } from "react"
import image1 from '../../images/carousel1.jpg';
import axios from "axios";
import CircleIcon from '@mui/icons-material/Circle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import PopUp from '../../components/Popup/Popup';

export default function Card(props){
    const [open, setOpen] = useState(false);
    const imageURL = `http://localhost:3001/resources/${props.item.dishImage}`;
    const [message, setMessage] = useState('Dish has been added to the cart!');
     var addToCart =(flag = 0)=>{
        const headerConfig = {
            headers: {
                'x-authentication-header': localStorage.getItem('token')
            }
        }
        if(flag === 2){
            setMessage('Dish has been added to the Favorite!');
        }
        axios.get("http://localhost:3001/addToCart/" + props.item.id+"?type="+flag, headerConfig)
        .then(
            res => {
                setOpen(true);
                setTimeout(()=>{
                    setOpen(false);
                }, 2000)
            }
        )
    }


    function addToFavorite(){
        addToCart(2);
    }
    
    return(
    <div className="cardBody">
            <img className="card-img-top" src={imageURL} alt="Card image cap"  onClick={()=>props.navigate(props.item.mobileNumber)}/>
                <div className="card-body">
                <h5 className="card-title">{props.item.restaurant}</h5>
                            <div className="d-flex justify-content-between align-items-center p-2">
                                    <span className="card-text">{props.item.dishName}</span> 
                                     <span className="card-text">{props.item.price + '$'}</span>
                            </div>

                            <div className="d-flex justify-content-between align-items-center p-2">
                                    <span  onClick={()=>props.navigate(props.item.mobileNumber)} style={{color: '#06c167', fontSize: '14px'}} className="card-text">{props.item.name}</span> 
                            </div>
                            
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex">
                                    <IconButton className="addToCart" aria-label="add to favorites" onClick={addToCart}>
                                        <AddShoppingCartIcon />
                                    </IconButton>
                                    
                                    <IconButton className="favoriteButton" onClick={addToFavorite} aria-label="add to favorites" style={{color: props.item.checkedOut  == 2 ? 'red' : ''}}>
                                        <FavoriteIcon />
                                    </IconButton>
                                </div>

                                {props.item.dishType ? <CircleIcon style={{color: 'green', fontSize: '20px', right: 0}}/> : <CircleIcon style={{color: 'red', fontSize: '20px'}}/>}
                            </div>
                            </div>
                            <PopUp open={open} message={message}/>
                    </div>   
    )
    
    }