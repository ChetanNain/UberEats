import CarouselFunc from "../../components/Carousel";
import React , { Component}  from 'react';
import './Register.css'
 
export default function Register() {
    return (
        <div>
            <h1><span style={{color: 'black', margin:'0px' }}>Uber</span>
                <span style={{color: '#06c167', margin:'0px' }}> Eats</span></h1>
            <br/>
            <br/>
            <h2>Welcome Back</h2>
            <br></br>
            <p >Sign in with your email address or mobile number.</p>
            <div>
                <form action="/action_page.php">
                    <input type="text" id="userid" name="userid" placeholder="Email or mobile number"/><br/>
                    <input type="submit" value="Next"/>
                </form>
            </div>
        </div>
    )
}