import axios from 'axios';
import React from 'react';
import './CartList.css';

export default function CartList(props) {
    const imageURL = `http://${window.location.hostname}:4000/resources/${props.cartItem.dishId.dishImage}`;

    return (
        <div className ="small-container cart-page cardBody">
            <table>
                <tr>
                    <td>
                        <div className="cart-info">
                        <img src = {imageURL} style={{height: "75px"}}/>
                        <td><button onClick={()=>props.updateCart(props.cartItem._id, 'decrease')} disabled={props.cartItem.quantity==1?true:false}>-</button> <span>{props.cartItem.quantity}</span> <button onClick={()=>props.updateCart(props.cartItem._id, 'increase')}>+</button></td>
                            <div>
                                <p>{props.cartItem.dishName}</p>
                                <small>Price: {props.cartItem?.dishId?.dishPrice}</small>
                                <p className='removeItem' style={{color:'#06c167', cursor: 'pointer'}} onClick={()=>props.removeItem(props.cartItem._id)}>Remove</p>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    )
}