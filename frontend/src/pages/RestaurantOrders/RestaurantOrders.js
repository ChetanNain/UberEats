import React from "react"
import axios from "axios"
import './RestaurantOrders.css'
export default function RestaurantOrders() {
    async function  UpdateOrderStatus (id, e) {
            const data = {
                            orderStatus : e.target.value , 
                            orderID : id
                        }
            await axios.post('http://localhost:3001/updateOrderStatus',data)
            alert("Status Updated");
    }
    const [orders, setOrders] = React.useState([]);
    React.useEffect(() => {
        console.log("use effect");
        const headerConfig = {
            headers: {
                'x-authentication-header': localStorage.getItem('token')
              }
          }
        axios.get('http://localhost:3001/orders', headerConfig).then(res => {
        setOrders(res.data);
    })
  }, [])

    return <div >
            {orders.map(order => {
                return <div class="orderList">
                        <div style={{justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                            <span>{order.orderID}</span> 
                            <span>{order.customerMobile}</span>
                            <span>{order.restaurantMobile}</span>
                            <span>{order.dishID}</span>
                            <span class="py-3">{order.orderStatus == 0 ? 'Recieved' : order.orderStatus == 1 ? 'Preparing Now': order.orderStatus == 2 ? 'Delivered' :order.orderStatus == 3 ?  'Rejected' : ''}</span>
                            <div class="w-30">
                                {localStorage.getItem("role") ==1 ? <select onChange={(event)=>UpdateOrderStatus(order.orderID, event)}>
                                    <option value="0">Received</option>
                                    <option value="1">Preparing Now</option>
                                    <option value="2">Delivered</option>
                                    <option value="3">Reject</option>
                                </select> : null}
                            </div>
                        </div>
                    </div>
            })}      
        </div>
}