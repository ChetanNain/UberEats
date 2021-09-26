import React from "react"
import axios from "axios"
export default function RestaurantOrders() {
    async function  UpdateOrderStatus (id, e) {
            const data = {
                            orderStatus : e.target.value , 
                            orderID : id
                        }
            await axios.post('http://localhost:3001/updateOrderStatus',data)
            alert(id);
    }
    const [orders, setOrders] = React.useState([]);
    React.useEffect(() => {
        console.log("use effect");
        axios.get('http://localhost:3001/getRestaurantOrders/1').then(res => {
        setOrders(res.data);
    })
  }, [])

    return <div >
            {orders.map(order => {
                return <div style={{borderBottom: '1px solid black'}}>
                        <div style={{justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                            <span>{order.orderID}</span> 
                            <span>{order.customerID}</span>
                            <span>{order.dishName}</span>
                            <span>{order.orderStatus == 1 ? "Received" : order.orderStatus==2 ? "Preparing Now" : "Delivered" }</span>
                            <select onChange={(event)=>UpdateOrderStatus(order.orderID, event)}>
                                <option value="1">Received</option>
                                <option value="2">Preparing Now</option>
                                <option value="3">Delivered</option>
                            </select>
                        </div><br/>
                    </div>
            })}      
        </div>
}