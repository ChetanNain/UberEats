import React from 'react';
import './CartList.css';
import image1 from '../../images/carousel1.jpg'

export default function CartList(props) {
    return (
        <div class ="small-container cart-page cardBody">
            <table>
                <tr>
                    <td>
                        <div className="cart-info">
                        <img src = {image1} style={{height: "75px"}}/>
                        <td><input type="number" value="1"></input></td>
                            <div>
                                <p>{props.cartItem.dishName}</p>
                                <small>Price: {props.cartItem.price}</small>
                                <a style={{color:'#06c167', cursor: 'pointer'}} onClick={()=>props.removeItem(props.cartItem.id)}>Remove</a>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    )
}

