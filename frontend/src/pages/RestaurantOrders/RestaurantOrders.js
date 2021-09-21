import React from "react"
export default function RestaurantOrders() {

    const data = [{

    }]
    return(
        <div style={{display: 'flex', justifyContent: 'space-between', border: '1px solid black'}}>
            <div>
                <span>Sam Pastoriza</span> 
                <span>Order Id</span>
                <span>Dish(es)</span>
                <span>Approx duration</span>
            </div>
                <div>
                    <input type="text"/>
                </div>
        </div>
    )
}