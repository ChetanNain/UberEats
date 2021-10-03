import React , { Component}  from 'react';
import './Login.css'
import Register from "../Register/Register";
import Home from '../home/home';
import { useSelector, useDispatch } from 'react-redux'
import { setMobileNumber, setPassword, setUserType } from '../../redux/reducers/login';

export default function Login(props) {
    const [errorMsg, setErrorMsg] = React.useState();
    const loginData = useSelector((state) => state.login.loginData);
    const registeredData = useSelector((state)=>state.signUp.registeredData);
    const dispatch = useDispatch();

    function validateForm(){
        if( loginData.mobileNumber.payload &&  loginData.mobileNumber.payload.length < 10){
            setErrorMsg('Enter a valid mobile number');
            return false;
        }
        else if(loginData.password.payload && loginData.password.payload.length < 8){
            setErrorMsg('Enter a valid password');
            return false;
        }else if(['Customer', 'Restaurant'].findIndex((role)=> role == loginData.userType.payload) == -1){
            setErrorMsg("Please select the user type.");
            return false;
        }else{
            if(loginData.mobileNumber.payload == registeredData.mobileNumber.payload && loginData.password.payload == registeredData.password.payload && loginData.userType.payload== registeredData.userType.payload){
                props.history.push('/');
              }else {
                    setErrorMsg('Invalid username & Password combination');
             }
        }
    }

    return (
        <div id="RegisterPage">
            <h1><span style={{color: 'black', margin:'0px' }}>Uber</span>
                <span style={{color: '#06c167', margin:'0px' }}> Eats</span></h1>
            <br/>
            <h4>Welcome Back</h4>
            <p>Sign in with your email address or mobile number.</p>
            <p class="error">{errorMsg}</p>
            <div>
            <input type="text" placeholder="Email or mobile number" onChange={(e)=>dispatch(setMobileNumber(e.target.value))}/><br/>
            <input type="password" placeholder="Enter Password" onChange={(e)=>dispatch(setPassword(e.target.value))}/>
            <br/><span class="mandatory">Password must be atlast 8 length long</span>
            <br/>
            </div>
            <div class="d-flex justify-content-start my-3">
            <div class="res">
            <input type="radio" id="userType" name="userType" value="Restaurant" onChange={(e)=>dispatch(setUserType(e.target.value))}/><span> Restaurant</span>
            </div>
            <div class="res">
            <input type="radio" id="userType" name="userType" value="Customer" onChange={(e)=>dispatch(setUserType(e.target.value))}/><span> Customer</span>
            </div>
            </div>
            <div>
            <button class='btn btn-success w-100' onClick={validateForm}>Login</button>
                <div class="d-flex justify-content-center mt-3">
                <h6>New to Uber?</h6> <a class="link" onClick={()=>props.history.push('/register')}>Create an account</a>
                </div>
            </div>
        </div>
    )
}