import "./Register.css";
import React, { Component } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { dateOfBirthHandler, emailHandler, languageHandler, mobileNumberHandler, userNameHandler, fullNameHandler, addressHandler, cityHandler, stateHandler, countryHandler, passwordHandler, confirmPasswordHandler, userTypeHandler } from '../../redux/reducers/signUp';
import Home from '../home/home.js'

export default function Register(props) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [selectedCountry, setSelectedCountry] = React.useState('US');
  const [usProvience, setUsProvience] = React.useState(useSelector((state) => state.masterData.usProvience));
  const [caProvience, setCaProvience] = React.useState(useSelector((state) => state.masterData.caProvience));

  const userName = useSelector((state) => state.signUp.userName);
  const mobileNumber = useSelector((state) => state.signUp.mobileNumber);
  const country =  useSelector((state) => state.signUp.country);
  const state =  useSelector((state) => state.signUp.state);
  const city =  useSelector((state) => state.signUp.city);
  const  address = useSelector((state) => state.signUp.address);
  const  email = useSelector((state) => state.signUp.email);
  const  fullName = useSelector((state) => state.signUp.fullName);
  const  dateOfBirth = useSelector((state) => state.signUp.dateOfBirth);
  const  language = useSelector((state) => state.signUp.language);
  const  password = useSelector((state) => state.signUp.password);
  const  confirmPassword = useSelector((state) => state.signUp.confirmPassword);
  const userType = useSelector((state)=> state.signUp.userType);

  React.useEffect(() => {
    loadBasicDetails();
  }, [])

  function loadBasicDetails() {
    axios.get(
      "http://localhost:3001/customerBasicDetail/"  + ''
    ).then(res=>{
      if(res.data && res.data.length > 0) {
      dispatch(userNameHandler(res.data[0].userName));
      dispatch(fullNameHandler(res.data[0].fullName));
      dispatch(mobileNumberHandler(res.data[0].mobileNumber));
      dispatch(countryHandler(res.data[0].country));
      dispatch(stateHandler(res.data[0].state));
      dispatch(cityHandler(res.data[0].city));
      dispatch(addressHandler(res.data[0].address));
      dispatch(emailHandler(res.data[0].email));
      dispatch(dateOfBirthHandler(res.data[0].dateOfBirth));
      dispatch(languageHandler(res.data[0].language));
      dispatch(passwordHandler(res.data[0].password))
      dispatch(userTypeHandler(res.data[0].userType))
      }
    })
    
  }


  function valdiate(){
    console.log(userType.payload);
    if(userName.payload && userName.payload.length<6){
       setErrorMessage( "Username must be between 6-20 characters.");
       return false;
    }else if( password.payload && password.payload.length<6){
      setErrorMessage( "Password must be between 6-20 characters.");
      return false;
    }else if(email.payload && email.payload.length <6 ){
      setErrorMessage( "Enter a valid email.");
      return false;
    }else if(!city.payload){
      setErrorMessage("City field is required.");
      return false;
    }else if(!address.payload){
      setErrorMessage("Address field is required.");
      return false;
    }
    else if(confirmPassword.payload != password.payload){
        setErrorMessage( "Passwords does not match");
        return false;
    }else if(['Customer', 'Restaurant'].findIndex((role)=> role == userType.payload) == -1){
        setErrorMessage("Please select the user type.");
        return false;
    }else{
        setErrorMessage("");
        return true;
    }

}
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}



   function savecustomerData() {
    if(!valdiate()) return;
    const basicDetails = {
      userName,
      mobileNumber,
      country,
      state,
      city,
      address,
      email,
      fullName,
      dateOfBirth,
      language,
      password
    };
    axios
      .post("http://localhost:3001/addCustomerDetail", basicDetails)
      .then((res) => {
        const userName = res.data;
        localStorage.setItem("userName", userName);
        alert("Basic details has been saved");
      });
  }

  function handleCountryChange(e){
    setSelectedCountry(e.target.value);
    dispatch(countryHandler(e.target.value));
  }

  return (
      <div id="RegisterPage">
        <h5>Basic Details</h5>
        <span class="mandatory">* All Fields are mandatory</span>
        <p class="error">{errorMessage}</p>
        <div class="d-flex justify-content-around align-items-center">
            <div class="res">
            <input type="radio" id="userType" name="userType" value="Restaurant" onChange={(e)=>dispatch(userTypeHandler(e.target.value))}/><span> Restaurant</span>
            </div>
            <div class="res">
            <input type="radio" id="userType" name="userType" value="Customer" onChange={(e)=>dispatch(userTypeHandler(e.target.value))}/><span> Customer</span>
            </div>
        </div>   
        <div class="d-flex justify-content-around align-items-center">
          <input
            type="text"
            placeholder="Full Name"
            //value={useSelector((state) => state.signUp.fullName).payload}
            onChange={(e)=>dispatch(fullNameHandler(e.target.value))}
          />
          <input
            type="text"
            placeholder="Username"
            //value={useSelector((state) => state.signUp.userName).payload}
            onChange={(e)=>dispatch(userNameHandler(e.target.value))}
          />
        </div>
        <div class="d-flex justify-content-around align-items-center">
          <input
            type="password"
            placeholder="Password"
            //value={useSelector((state) => state.signUp.password).payload}
            onChange={(e)=>dispatch(passwordHandler(e.target.value))}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            //value={useSelector((state) => state.signUp.password).payload}
            onChange={(e)=>dispatch(confirmPasswordHandler(e.target.value))}
          />
        </div>
        <div class="d-flex justify-content-around align-items-center">
          <input
            type="text"
            placeholder="Date of Birth"
            //value={useSelector((state) => state.signUp.dateOfBirth).payload}
            onChange={(e)=>dispatch(dateOfBirthHandler(e.target.value))}
          />
          <input
            type="email"
            placeholder="email"
            value={useSelector((state) => state.signUp.email).payload}
            onChange={(e)=>dispatch(emailHandler(e.target.value))}
          />
        </div>
        <div class="d-flex justify-content-around align-items-center">
          <input
            type="number"
            placeholder="Mobile Number"
            //value={useSelector((state) => state.signUp.mobileNumber).payload}
            onChange={(e)=>dispatch(mobileNumberHandler(e.target.value))}
          />
          <select onChange={(e)=>dispatch(languageHandler(e.target.value))}>
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
          </select>
        </div>
        <div class="d-flex justify-content-around align-items-center">
          <input
            type="text"
            placeholder="Address"
            //value={useSelector((state) => state.signUp.address).payload}
            onChange={(e)=>dispatch(addressHandler(e.target.value))}
          />
          <input
            type="text"
            placeholder="City"
            value={useSelector((state) => state.signUp.city).payload}
            onChange={(e)=>dispatch(cityHandler(e.target.value))}
          />
        </div>
        <div class="d-flex justify-content-around align-items-center">
          <select
            placeholder="Select Country"
            //value={useSelector((state) => state.signUp.country).payload}
            onChange={handleCountryChange}
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
          </select>
          
          <select
            placeholder="Select Province"
           //value={useSelector((state) => state.signUp.provience).payload}
            onChange={(e)=> dispatch(stateHandler(e.target.value))}
          >
            { selectedCountry == 'US' ? 
            usProvience.map((provience) => {
              return (
                <option value={provience.abbreviation}>{provience.name}</option>
              );
            }) : 
            caProvience.map((provience) => {
              return (
                <option value={provience.abbreviation}>{provience.name}</option>
              );
            })
            }
          </select>
          </div>
        <br />
        <br />

        <div class="d-flex justify-content-center">
          <button class="btn btn-success w-100" onClick={savecustomerData}>
            Register
          </button>
        </div>
      </div>
    );
  }