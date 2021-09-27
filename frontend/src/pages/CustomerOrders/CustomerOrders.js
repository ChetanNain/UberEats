import React from 'react';
import './CustomerOrders.css'
import image1 from '../../images/carousel1.jpg'

export default function CustomerOrders(props) {
    return (
        <div class ="small-container cart-page">
            <table>
                <tr>
                    <th>Item</th>
                    <th>Subtotal</th>
                </tr>
                <br/>
                <br/>
                <tr>
                    <td>
                        <div className="cart-info">
                        <td><input type="number" value="1"></input></td>
                            <img src = {image1} style={{height: "75px"}}/>
                            <div>
                                <p>{props.cartItem.dishName}</p>
                                <small>Price: {props.cartItem.price}</small>
                                <a onClick={()=>props.removeItem(props.cartItem.id)}>Remove</a>
                            </div>
                        </div>
                    </td>
                    
                    <td>{1 * props.cartItem.price}</td>
                </tr>
            </table>
        </div>
    )
}

