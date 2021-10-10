export default function Checkout(){
    return (
        <div id="RegisterPage" style={{background: '#F5F5F5'}}>
            <div>
                <center><button class='btn btn-success w-100'>Place Order</button></center>
                <p style={{borderBottom: '1px solid gray', fontSize:'12px'}} class="py-3">
                    If you are not around when the delivery person arrives, they will leave your order at the door.
                    By Placing your order you agree to take full responsibility to it once delivered.
                </p>

                <div class="d-flex justify-content-between">
                    <h6>Subtotal</h6>
                    <p>$35</p>
                </div>

                <div class="d-flex justify-content-between">
                    <h6>Delivery Fee</h6>
                    <p>$2.49</p>
                </div>

                <div class="d-flex justify-content-between">
                    <h6>Service Fee</h6>
                    <p>$5</p>
                </div>

                <div class="d-flex justify-content-between">
                    <h6>CA Driver Benifits</h6>
                    <p>$2</p>
                </div>

                <div class="d-flex justify-content-between">
                    <h6>Taxes</h6>
                    <p>$3.19</p>
                </div>

                <div class="d-flex justify-content-between">
                    <h6>Add a tip</h6>
                    <p>$8.22</p>
                </div>

                <div class="d-flex justify-content-between" style={{borderBottom: '1px solid gray'}}>
                    <p style={{fontSize:'12px'}}> Delivery people are critical to our communities at this time. Adda tip to say thanks.</p>
                </div>
    
                <div class="d-flex justify-content-between py-3" style={{borderTop: '1px solid gray'}}>
                    <h6>Total</h6>
                    <p>$55.90</p>
                </div>

            </div>
        </div>
    )
}
