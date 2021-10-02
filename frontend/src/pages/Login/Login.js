import CarouselFunc from "../../components/Carousel";
import React , { Component}  from 'react';
import './Login.css'
import Register from "../Register/Register";
import Home from '../home/home';
import { useSelector, useDispatch } from 'react-redux'
import { setMobileNumber, setPassword, setUserType } from '../../redux/reducers/login';
 
export default function Login(props) {
    const [errorMsg, setErrorMsg] = React.useState();
    const mobileNumber = useSelector((state) => state.login.mobileNumber);
    const password  = useSelector((state) => state.login.password);
    const userType = useSelector((state) => state.login.userType);
    const savedMobileNumber = useSelector((state) => state.signUp.mobileNumber);
    const savedPassword = useSelector((state) => state.signUp.password);
    const savedUserType = useSelector((state)=> state.signUp.userType);
    const dispatch = useDispatch();

    function validateForm(){
        if( mobileNumber.payload &&  mobileNumber.payload.length < 10){
            setErrorMsg('Enter a valid mobile number');
            return false;
        }
        else if(password.payload && password.payload.length < 8){
            setErrorMsg('Enter a valid password');
            return false;
        }else if(['Customer', 'Restaurant'].findIndex((role)=> role == userType.payload) == -1){
            setErrorMsg("Please select the user type.");
            return false;
        }else{
            if(mobileNumber.payload == savedMobileNumber.payload && password.payload == savedPassword.payload && userType.payload== savedUserType.payload){
                    props.loadPage(<Home/>);
                }  
                else {
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
            <div class="d-flex justify-content-around">
            <div class="res">
            <input type="radio" id="userType" name="userType" value="Restaurant" onChange={(e)=>dispatch(setUserType(e.target.value))}/><span> Restaurant</span>
            </div>
            <div class="res">
            <input type="radio" id="userType" name="userType" value="Customer" onChange={(e)=>dispatch(setUserType(e.target.value))}/><span> Customer</span>
            </div>
            </div>
            <div>
            <button class='btn btn-success w-100'onClick={()=>validateForm()}>Login</button>
                <div class="d-flex justify-content-around mt-3">
                <h6>New to Uber?</h6> <a class="link" onClick={()=>props.loadPage(<Register/>)}>Create an account</a>
                </div>
            </div>
        </div>
    )
}