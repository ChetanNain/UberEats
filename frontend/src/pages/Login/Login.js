import React , { Component}  from 'react';
import './Login.css'
import Register from "../Register/Register";
import Home from '../home/home';
import { useSelector, useDispatch } from 'react-redux'
import { setMobileNumber, setPassword, setUserType } from '../../redux/reducers/login';
import axios from 'axios';

export default function Login(props) {
    const [errorMsg, setErrorMsg] = React.useState();
    const loginData = useSelector((state) => state.login.loginData);
    const registeredData = useSelector((state)=>state.signUp.registrationData);
    const dispatch = useDispatch();

    function validateForm(){
        if( loginData.mobileNumber &&  loginData.mobileNumber.payload.length < 10){
            setErrorMsg('Enter a valid mobile number');
            return false;
        }
        else if(loginData.password && loginData.password.payload.length < 8){
            setErrorMsg('Enter a valid password');
            return false;
        }else{
            axios.post('http://localhost:3001/login', {mobileNumber: loginData.mobileNumber.payload, password: loginData.password.payload, role: loginData.userType.payload}).then(res=>{
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('role', res.data.role);
                props.history.push('/');
            }).catch(err=>{
                setErrorMsg('Invalid username & Password combination');
            })
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
            <div>
            <button class='btn btn-success w-100' onClick={validateForm}>Login</button>
                <div class="d-flex justify-content-center mt-3">
                <h6>New to Uber?</h6> <a class="link" onClick={()=>props.history.push('/register')}>Create an account</a>
                </div>
            </div>
        </div>
    )
}