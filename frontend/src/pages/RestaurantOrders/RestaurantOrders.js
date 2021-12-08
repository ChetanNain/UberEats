import React from "react";
import axios from "axios";
import "./RestaurantOrders.css";
import { GET_ORDERS } from "../../graphQL/query";

export default function RestaurantOrders() {
  async function UpdateOrderStatus(id, e) {
    const data = {
      orderStatus: e.target.value,
      orderId: id,
    };
    console.log("data", data);
    await axios.post(
      `http://${window.location.hostname}:4000/updateOrderStatus`,
      data
    );
    alert("Status Updated");
    reload();
  }

  const headerConfig = {
    headers: {
        'x-authentication-header': localStorage.getItem('token')
      }
  }
  const [orders, setOrders] = React.useState([]);
  const [recordPerPage, setRecordPerPage] = React.useState(5);
  const [startIndex, setStartIndex] = React.useState(0);
  const [refresh, setRefresh] = React.useState(false);
  const reload = () => {
    setRefresh(!refresh);
  };
  React.useEffect(() => {
    loadOrder();
  }, [refresh]);


  function loadOrder(){
    axios.post(`http://${window.location.hostname}:4000/graphql`, {
      query: GET_ORDERS
    }, headerConfig).then(res=>{
      setOrders(res.data.data.getOrders ? res.data.data.getOrders : []);
    })
  }

  async function cancelOrder(id) {
    await axios.post(
      `http://${window.location.hostname}:4000/updateOrderStatus`,
      { orderStatus: 4, orderId: id }
    );
    loadOrder();
  }

  function handleRecordPerPage(e) {
    setStartIndex(0);
    setRecordPerPage(e.target.value);
  }

  function handlePagination(attribute) {
    if (attribute === "prev") {
      setStartIndex(parseInt(startIndex) - parseInt(recordPerPage));
    } else {
      setStartIndex(parseInt(startIndex) + parseInt(recordPerPage));
    }
  }
  return (
    <div>
      <div style={{ height: "90vh", overflow: "scroll" }}>
        {orders
          .slice(
            parseInt(startIndex),
            parseInt(startIndex) + parseInt(recordPerPage)
          )
          .map((order, index) => {
            return (
              <div class="orderList">
                <div style={{ alignItems: "center", padding: "20px" }}>
                  {console.log("recordPerPage", recordPerPage)}
                  {console.log("startIndex", startIndex)}
                  <span style={{ width: "5%", display: "inline-block" }}>
                    {parseInt(startIndex) + parseInt(index) + 1}
                  </span>
                  {localStorage.getItem("role") === 1 ? (
                    <span>{order.customerMobile}</span>
                  ) : (
                    ""
                  )}
                  {localStorage.getItem("role") === 0 ? (
                    <span>{order.restaurantMobile}</span>
                  ) : (
                    ""
                  )}
                  <span style={{ width: "10%", display: "inline-block" }}>
                    {order.dishName}
                  </span>
                  <span style={{ width: "10%", display: "inline-block" }}>
                    $ {order.itemPrice}
                  </span>
                  <span style={{ width: "10%", display: "inline-block" }}>
                    Qnt. {order.quantity}
                  </span>
                  <span
                    style={{ width: "10%", display: "inline-block" }}
                    class="py-3"
                  >
                    {order.status == 0
                      ? "Recieved"
                      : order.status == 1
                      ? "Preparing Now"
                      : order.status == 2
                      ? "Delivered"
                      : order.status == 3
                      ? "Rejected"
                      : "Canceled"}
                  </span>
                  <span style={{ width: "15%", display: "inline-block" }}>
                    {order.date.substring(0, 10)}
                  </span>
                  <span
                    style={{
                      display:
                        order.status !== 0 || localStorage.getItem("role") == 1
                          ? "none"
                          : "inline-block",
                      width: "15%",
                    }}
                  >
                    <span
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                      onClick={() => cancelOrder(order._id)}
                    >
                      Cancel Order
                    </span>
                  </span>
                  <span style={{ width: "15%", display: "inline-block" }}>
                    {localStorage.getItem("role") == 1 && order.status != 4 ? (
                      <select
                        style={{ width: "80%" }}
                        onChange={(event) =>
                          UpdateOrderStatus(order._id, event)
                        }
                      >
                        <option value="0">Received</option>
                        <option value="1">Preparing Now</option>
                        <option value="2">Delivered</option>
                        <option value="3">Reject</option>
                      </select>
                    ) : null}
                  </span>
                  <span style={{ width: "10%", display: "inline-block" }}>
                    {order.specialInstruction}
                  </span>
                </div>
              </div>
            );
          })}
        <div
          class="d-flex justify-content-between align-items-center"
          style={{ margin: "0px 80px" }}
        >
          <div>
            <button
              type="button"
              disabled={
                parseInt(startIndex) < parseInt(recordPerPage) ? true : false
              }
              onClick={() => handlePagination("prev")}
              class="btn btn-link"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={
                parseInt(startIndex) + parseInt(recordPerPage) >= orders.length
                  ? true
                  : false
              }
              onClick={() => handlePagination("next")}
              class="btn btn-link"
            >
              Next
            </button>
          </div>
          {/* <div><span>Showing {parseInt(startIndex+1)}- {parseInt(startIndex+recordPerPage)} out of {orders.length}</span></div> */}
          <div>
            <select onChange={handleRecordPerPage}>
              <option>2</option>
              <option selected>5</option>
              <option>10</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
