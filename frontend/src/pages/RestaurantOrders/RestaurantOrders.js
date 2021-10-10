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

    return <div>
             <div class="orderList" style={{justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                            <h6>Id</h6> 
                            {localStorage.getItem("role") == 1 ? <h6>Customer M No.</h6> : ''}
                            {localStorage.getItem("role") == 0 ? <h6>Restaurant M No.</h6> : ''}
                            <h6>Dish Name</h6>
                            <h6>Price</h6>
                            <h6>Status</h6>
                            {localStorage.getItem("role") ==1 ? <h6>Update</h6>: ''}
            </div>
            <div style={{height: '80vh', overflow: 'scroll'}}>
            {orders.map(order => {
                return <div class="orderList">
                        <div style={{justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                            <span>{order.orderID}</span> 
                            {localStorage.getItem("role") == 1 ? <span>{order.customerMobile}</span> : ''}
                            {localStorage.getItem("role") == 0 ? <span>{order.restaurantMobile}</span> : ''}
                            <span>{order.dishName}</span>
                            <span>{order.dishPrice}</span>
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
        </div>
}