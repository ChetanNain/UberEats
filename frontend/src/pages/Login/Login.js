import CarouselFunc from "../../components/Carousel";
import React , { Component}  from 'react';
import './Login.css'
import Register from "../Register/Register";
import Home from '../home/home';


 
export default function Login(props) {
    const [mobileNumber, setMobileNumber] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState();


    function mobileNumberChangeHandler(e) {
        setMobileNumber(e.target.value);
    }

    function passwordChangeHandler(e){
        setPassword(e.target.value)
    }
    function validateForm(){
        if(mobileNumber.length < 10){
            setErrorMsg('Enter a valid mobile number');
            return false;
        }
        else if(password.length < 8){
            setErrorMsg('Enter a valid password');
            return false;
        }else{
            props.loadPage(<Home/>);
        }

    } 

    return (
        <div id="RegisterPage">
            <h1><span style={{color: 'black', margin:'0px' }}>Uber</span>
                <span style={{color: '#06c167', margin:'0px' }}> Eats</span></h1>
            <br/>
            <br/>
            <h2>Welcome Back</h2>
            <br/>
            <p>Sign in with your email address or mobile number.</p>
            <p class="error">{errorMsg}</p>
            <div>
            <input type="text" placeholder="Email or mobile number" onChange={mobileNumberChangeHandler}/><br/>
            <input type="text" placeholder="Enter Password" onChange={passwordChangeHandler}/>
            <br/><span class="mandatory">Password must be atlast 8 length long</span>
            <br/>
            <input type="submit" value="Next" onClick={()=>validateForm()}/>
                <h6>New to Uber?<a class="link" onClick={()=>props.loadPage(<Register/>)}>Create an account</a></h6>
            </div>
        </div>
    )
}