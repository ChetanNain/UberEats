import React from "react";
import axios from 'axios';
import PopUp from "../../components/Popup/Popup";

export default function Checkout(props){

    const [cartData, setCartData]  = React.useState([]);
    const [open, setOpen] = React.useState(false);
    
    let subTotal = 0;
    cartData.map(item=>{
        subTotal += item.price
    })
    React.useEffect(() => {
        const headerConfig = {
            headers: {
                'x-authentication-header': localStorage.getItem('token')
              }
          }
        axios.get("http://localhost:3001/cart", headerConfig).then((res) => {
      const data = res.data.filter(e=> e.checkedOut == 0);
      setCartData(data);
    });
    }, [])

    function checkout(){
        const headerConfig = {
            headers: {
                'x-authentication-header': localStorage.getItem('token')
              }
          }
          axios.get('http://localhost:3001/checkout',headerConfig ).then(res=>{
            setOpen(true);
            setTimeout(()=>{
                setOpen(false);
                props.history.push('/')
            }, 2000)
          })
    }
    return (
        <div id="RegisterPage" style={{background: '#F5F5F5'}}>
            <div>
                <center><button class='btn btn-success w-100' onClick={checkout}>Place Order</button></center>
                <p style={{borderBottom: '1px solid gray', fontSize:'12px'}} class="py-3">
                    If you are not around when the delivery person arrives, they will leave your order at the door.
                    By Placing your order you agree to take full responsibility to it once delivered.
                </p>
                
                {cartData.map(item=>{
                    return <div class="d-flex justify-content-between">
                        <p>{item.dishName}</p>
                        <p>{item.quantity}</p>
                        <p>$ {item.price}</p>
                    </div>
                })} 
            <hr/>
                <div class="d-flex justify-content-between">
                    <h6>Subtotal</h6>
                    <p>$ {subTotal.toFixed(2)}</p>
                </div>

                <div class="d-flex justify-content-between">
                    <h6>Delivery Fee</h6>
                    <p>$2.49</p>
                </div>

                <div class="d-flex justify-content-between">
                    <h6>Service Fee</h6>
                    <p>$ {(subTotal*0.02).toFixed(2)}</p>
                </div>

                <div class="d-flex justify-content-between">
                    <h6>CA Driver Benifits</h6>
                    <p>$ {(subTotal*0.01).toFixed(2)}</p>
                </div>

                <div class="d-flex justify-content-between">
                    <h6>Taxes</h6>
                    <p>$ {(subTotal*0.05).toFixed(2)}</p>
                </div>

                <div class="d-flex justify-content-between" style={{borderBottom: '1px solid gray'}}>
                    <p style={{fontSize:'12px'}}> Delivery people are critical to our communities at this time. you may add a tip to say thanks.</p>
                </div>
    
                <div class="d-flex justify-content-between py-3" style={{borderTop: '1px solid gray'}}>
                    <h6>Total</h6>
                    <p>$ {(subTotal + subTotal*0.05 + subTotal*0.01 + subTotal*0.02 + 2.49).toFixed(2)}</p>
                </div>

            </div>
            <PopUp message={"Order Placed"} open={open}/>
        </div>
    )
}
