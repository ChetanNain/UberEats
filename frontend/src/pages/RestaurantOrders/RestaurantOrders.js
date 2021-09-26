import React from "react"
import axios from "axios"
export default function RestaurantOrders() {
    function  UpdateOrderStatus (id, e) {
        alert(id);
        alert(e.target.value);
    }
    const [orders, setOrders] = React.useState();

//     const data = [{
//             OrderID: 1,
//             CustomerID: 1,
//             dishName: "Burger",
//             dishStatus: 1,
//     },
//     {
//         OrderID: 1,
//         CustomerID: 1,
//         dishName: "Burger",
//         dishStatus: 1,
//     }
// ]

    React.useEffect(() => {
        axios.get("http://localhost:3001/getRestaurantOrders", {
            params:{
                restaurantID: 1
            }
        })
        .then(
            res => {
                setOrders(res.data);
            }
        )
    })


    return <div >
            {orders.map(order => {
                return <div style={{borderBottom: '1px solid black'}}>
                        <div style={{justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                            <span>{order.OrderID}</span> 
                            <span>{order.CustomerID}</span>
                            <span>{order.dishName}</span>
                            <span>{order.dishStatus == 1 ? "Received" : "Inprogress" }</span>
                            <select onChange={(event)=>UpdateOrderStatus(order.OrderID, event)}>
                                <option>Received</option>
                                <option>Cooking in progress</option>
                                <option>Delivered</option>
                            </select>
                        </div><br/>
                    </div>
            })}      
        </div>
}