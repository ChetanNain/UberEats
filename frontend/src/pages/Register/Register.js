import "./Register.css";
import React, { Component } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { stateChangeHandler, dateOfBirthHandler, emailHandler, languageHandler, mobileNumberHandler, userNameHandler, fullNameHandler, addressHandler, cityHandler, stateHandler, countryHandler, passwordHandler, confirmPasswordHandler, userTypeHandler } from '../../redux/reducers/signUp';

export default function Register(props) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [selectedCountry, setSelectedCountry] = React.useState('US');
  const [usProvience, setUsProvience] = React.useState(useSelector((state) => state.masterData.usProvience));
  const [caProvience, setCaProvience] = React.useState(useSelector((state) => state.masterData.caProvience));

  const registrationData = useSelector((state) => state.signUp.registrationData);

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
    if(!registrationData.fullName.payload){
       setErrorMessage( "Name can't be empty");
       return false;
    }else if(registrationData.userName.payload && registrationData.userName.payload.length<6){
       setErrorMessage( "Username must be between 6-20 characters.");
       return false;
    }else if(registrationData.password.payload && registrationData.password.payload.length<6){
      setErrorMessage( "Password must be between 6-20 characters.");
      return false;
    }else if(registrationData.email.payload && registrationData.email.payload.length <6 ){
      setErrorMessage( "Enter a valid email.");
      return false;
    }else if(registrationData.mobileNumber.payload && registrationData.mobileNumber.payload.length < 10 ){
      setErrorMessage( "Enter a valid mobile number.");
      return false;
    }else if(!registrationData.address.payload){
      setErrorMessage("Address field is required.");
      return false;
    }else if(!registrationData.city.payload){
      setErrorMessage("City field is required.");
      return false;
    }else if(registrationData.confirmPassword.payload != registrationData.password.payload){
        setErrorMessage( "Passwords does not match");
        return false;
    }else if(['Customer', 'Restaurant'].findIndex((role)=> role == registrationData.userType.payload) == -1){
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
    const basicDetails = {...registrationData}
    axios
      .post("http://localhost:3001/addCustomerDetail", basicDetails)
      .then((res) => {
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
          <input
            type="text"
            placeholder="Full Name"
            //value={registrationData.fullName.payload}
            name="fullName"
            onChange={(e)=>dispatch(stateChangeHandler({name: 'fullName', value: e.target.value}))}
          />
          <input
            type="text"
            placeholder="Username"
            //value={registrationData.userName.payload}
            name="userName"
            onChange={(e)=>dispatch(stateChangeHandler({name: 'userName', value: e.target.value}))}
          />
        </div>
        <div class="d-flex justify-content-around align-items-center">
          <input
            type="password"
            placeholder="Password"
            value={registrationData.password.payload}
            onChange={(e)=>dispatch(passwordHandler(e.target.value))}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={registrationData.confirmPassword.payload}
            onChange={(e)=>dispatch(confirmPasswordHandler(e.target.value))}
          />
        </div>
        <div class="d-flex justify-content-around align-items-center">
          <input
            type="text"
            placeholder="Date of Birth"
            //value={registrationData.dateOfBirth.payload}
            onChange={(e)=>dispatch(stateChangeHandler({name: 'dateOfBirth', value: e.target.value}))}
          />
          <input
            type="email"
            placeholder="email"
            value={registrationData.email.payload}
            onChange={(e)=>dispatch(emailHandler(e.target.value))}
          />
        </div>
        <div class="d-flex justify-content-around align-items-center">
          <input
            type="number"
            placeholder="Mobile Number"
            value={registrationData.mobileNumber.payload}
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
            value={registrationData.address.payload}
            onChange={(e)=>dispatch(addressHandler(e.target.value))}
          />
          <input
            type="text"
            placeholder="City"
            value={registrationData.city.payload}
            onChange={(e)=>dispatch(cityHandler(e.target.value))}
          />
        </div>
        <div class="d-flex justify-content-around align-items-center">
          <select
            placeholder="Select Country"
            value={registrationData.country.payload}
            onChange={handleCountryChange}
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
          </select>
          
          <select
            placeholder="Select Province"
            value={registrationData.provience.payload}
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
          
          <div class="d-flex justify-content-start align-items-center my-3">
            <div class="res">
            <input type="radio" id="userType" name="userType" value="Restaurant" onChange={(e)=>dispatch(userTypeHandler(e.target.value))}/><span> Restaurant</span>
            </div>
            <div class="res">
            <input type="radio" id="userType" name="userType" value="Customer" onChange={(e)=>dispatch(userTypeHandler(e.target.value))}/><span> Customer</span>
            </div>
        </div>

        <div class="d-flex justify-content-center">
          <button class="btn btn-success w-100" onClick={savecustomerData}>
            Register
          </button>
        </div>
      </div>
    );
  }