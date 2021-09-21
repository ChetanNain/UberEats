import React from "react"
import "./slick.css";
import image1 from '../images/carousel1.jpg'
export default function Card(props){

    return(<div class="card" style={{width: '18rem' , marginLeft:'10px', marginBottom:'10px'}}>
            <img class="card-img-top" src={image1} alt="Card image cap"/>
                <div class="card-body">
                <h5 class="card-title">{props.item.restaurant}</h5>
                            <p class="card-text">{props.item.dishName+ " " + props.item.price}</p>
                            <a href="#" class="btn btn-primary">Add to Cart</a>
                        </div>
                    </div>   
    )
}