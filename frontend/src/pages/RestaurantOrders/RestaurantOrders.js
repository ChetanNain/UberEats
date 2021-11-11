import React from "react"
import axios from "axios"
import './RestaurantOrders.css'
export default function RestaurantOrders() {
    async function  UpdateOrderStatus (id, e) {
            const data = {
                            orderStatus : e.target.value , 
                            orderID : id
                        }
            await axios.post(`http://${window.location.hostname}:3001/updateOrderStatus`,data)
            alert("Status Updated");
    }
    const [orders, setOrders] = React.useState([]);
    const [recordPerPage, setRecordPerPage] = React.useState(5);
    const [startIndex, setStartIndex] = React.useState(0);

    React.useEffect(() => {
        loadOrder();
  }, [])


  function loadOrder(){
    const headerConfig = {
        headers: {
            'x-authentication-header': localStorage.getItem('token')
          }
      }
    axios.get(`http://${window.location.hostname}:3001/orders`, headerConfig).then(res => {
    setOrders(res.data);
})

  }
  async function cancelOrder(id){
    await axios.post(`http://${window.location.hostname}:3001/updateOrderStatus`, {orderStatus: 4, orderId: id})
    loadOrder();
  }

  function handleRecordPerPage(e){
    setRecordPerPage(e.target.value);
  }

  function handlePagination(attribute){
      if(attribute === 'prev'){
        setStartIndex(startIndex - recordPerPage);
      }else {
        setStartIndex(startIndex + recordPerPage);
      }
  }

    return <div>
            <div style={{height: '90vh', overflow: 'scroll'}}>
            {orders.slice(startIndex, startIndex + recordPerPage).map((order, index) => {
                return <div class="orderList">
                        <div style={{ alignItems: 'center', padding: '20px'}}>
                            <span style={{width: '5%', display: 'inline-block'}}>{index+1}</span> 
                            {localStorage.getItem("role") === 1 ? <span>{order.customerMobile}</span> : ''}
                            {localStorage.getItem("role") === 0 ? <span>{order.restaurantMobile}</span> : ''}
                            <span style={{width: '10%', display: 'inline-block'}}>{order.dishId.dishName}</span>
                            <span style={{width: '10%', display: 'inline-block'}}>$ {order.dishId.dishPrice}</span>
                            <span style={{width: '10%', display: 'inline-block'}}>Qnt. {order.quantity}</span>
                            <span style={{width: '10%', display: 'inline-block'}} class="py-3">{order.status == 0 ? 'Recieved' : order.status == 1 ? 'Preparing Now': order.status == 2 ? 'Delivered' : order.status == 3 ?  'Rejected' : 'Canceled'}</span>
                            <span style={{width: '15%', display: 'inline-block'}}>{(order.date).substring(0, 10)}</span>
                            <span style={{display: order.status !== 0 || localStorage.getItem('role') == 1 ? 'none' : 'inline-block', width: '15%'}}><span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={()=>cancelOrder(order._id)}>Cancel Order</span></span>
                            <span style={{width: '15%', display: 'inline-block'}}>
                                {localStorage.getItem("role") == 1 && order.status != 4 ? <select style={{width: '80%'}} onChange={(event)=>UpdateOrderStatus(order._id, event)}>
                                    <option value="0">Received</option>
                                    <option value="1">Preparing Now</option>
                                    <option value="2">Delivered</option>
                                    <option value="3">Reject</option>
                                </select> : null}
                            </span>
                            <span style={{width: '10%', display: 'inline-block'}}>{order.specialInstruction}</span>
                        </div>
                    </div>
            })}   
               <div class="d-flex justify-content-between align-items-center" style={{margin: '0px 80px'}}>
                    <div><button type="button" disabled={startIndex < recordPerPage  ? true : false} onClick={()=>handlePagination('prev')} class="btn btn-link">Previous</button><button type="button"  disabled={startIndex + recordPerPage > orders.length ? true : false} onClick={()=>handlePagination('next')} class="btn btn-link">Next</button></div>
                    <div><span>Showing {parseInt(startIndex+1)}- {parseInt(startIndex+recordPerPage)} out of {orders.length}</span></div>
                    <div><select onChange={handleRecordPerPage}><option>5</option><option>10</option><option>15</option></select></div>
                </div> 
             </div>  
        </div>
}