import "./Register.css";
import React, { Component, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {stateChangeHandler} from "../../redux/reducers/signUp";
import Restaurant from "@mui/icons-material/Restaurant";
import Card from "../../components/Card/Card";
import PopUp from "../../components/Popup/Popup";

export default function Register(props) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState("US");
  const [open, setOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = React.useState('');
  const [profilePic, setProfilePic] = React.useState('');
  const [cartData, setCartData] = useState([]);
  const [usProvience, setUsProvience] = React.useState(
    useSelector((state) => state.masterData.usProvience)
  );
  const [caProvience, setCaProvience] = React.useState(
    useSelector((state) => state.masterData.caProvience)
  );

  const registrationData = useSelector(
    (state) => state.signUp.registrationData
  );


  React.useEffect(() => {
    const headerConfig = {
      headers: {
          'x-authentication-header': localStorage.getItem('token')
        }
    }
    loadBasicDetails();
    axios.get(`http://${window.location.hostname}:3001/cart`, headerConfig).then((res) => {
      setCartData(res.data);
    });
  }, []);

  function loadBasicDetails() {
    const headerConfig = {
      headers: {
          'x-authentication-header': localStorage.getItem('token')
        }
    }
    axios.get(`http://${window.location.hostname}:3001/customerBasicDetail`, headerConfig).then((res) => {
      if (res.data) {
        dispatch(stateChangeHandler({ name: "fullName", value: res.data.fullName }));
        dispatch(stateChangeHandler({ name: "mobileNumber", value: res.data.mobileNumber }));
        dispatch(stateChangeHandler({ name: "country", value: res.data.country }));
        dispatch(stateChangeHandler({ name: "provience", value: res.data.state }));
        dispatch(stateChangeHandler({ name: "address", value: res.data.address[0].address }));
        dispatch(stateChangeHandler({ name: "email", value: res.data.email }));
        dispatch(stateChangeHandler({ name: "dateOfBirth", value: res.data.dateOfBirth }));
        dispatch(stateChangeHandler({ name: "language", value: res.data.language }));
        dispatch(stateChangeHandler({ name: "password", value: res.data.password }));
        dispatch(stateChangeHandler({ name: "userType", value: res.data.userType }));
        dispatch(stateChangeHandler({ name: "city", value: res.data.address[0].city }));
        setProfilePic(`http://${window.location.hostname}:3001${res.data.profilePicture}`);
      }
    });
  }

  function valdiate() {
    if (!registrationData.fullName) { 
      setErrorMessage("Name can't be empty");
      return false;
    } else if(!ValidateDOB(registrationData.dateOfBirth)){
      //setErrorMessage("Please enter a correct date of birth");
    }    
    else if (registrationData.password && registrationData.password.length < 6) {
      setErrorMessage("Password must be between 6-20 characters.");
      return false;
    } else if (registrationData.email && !validateEmail(registrationData.email)) {
      setErrorMessage("Enter a valid email.");
      return false;
    } else if (registrationData.mobileNumber && registrationData.mobileNumber.length < 10) {
      setErrorMessage("Enter a valid mobile number.");
      return false;
    } else if (!registrationData.address) {
      setErrorMessage("Address field is required.");
      return false;
    } else if (!registrationData.city) {
      setErrorMessage("City field is required.");
      return false;
    } else if (registrationData.confirmPassword != registrationData.password) {
      setErrorMessage("Passwords does not match");
      return false;
    } else if ( !localStorage.getItem('role') &&
      ["Customer", "Restaurant"].findIndex(
        (role) => role == registrationData.userType
      ) == -1
    ) {
      setErrorMessage("Please select the user type.");
      return false;
    } else {
      setErrorMessage("");
      setOpen(true);
      setTimeout(()=>{
        setOpen(false);
      }, 2000)
      return true;
    }
  }
  function validateEmail(email) {
    console.log(email);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function ValidateDOB(dob) {
    var dateString = dob;
    var regex = /(((0|1)[0-9]|2[0-9]|3[0-1])\-(0[1-9]|1[0-2])\-((19|20)\d\d))$/;
    if (regex.test(dateString)) {
        var parts = dateString.split("-");
        var dtDOB = new Date(parts[1] + "-" + parts[0] + "-" + parts[2]);
        var dtCurrent = new Date();
        setErrorMessage("Eligibility 14 years ONLY.")
        if (dtCurrent.getFullYear() - dtDOB.getFullYear() < 14) {
            return false;
        }
        if (dtCurrent.getFullYear() - dtDOB.getFullYear() == 14) {
            if (dtCurrent.getMonth() < dtDOB.getMonth()) {
                return false;
            }
            if (dtCurrent.getMonth() == dtDOB.getMonth()) {
                if (dtCurrent.getDate() < dtDOB.getDate()) {
                    return false;
                }
            }
        }
        setErrorMessage("");
        return true;
    } else {
        setErrorMessage("Please enter a correct date and in dd-mm-yyyy format.");
        return false;
    }
  }



  function savecustomerData() {
    if (!valdiate()) return;
    const basicDetails = { ...registrationData, uploadedFile };
    axios
      .post(`http://${window.location.hostname}:3001/addCustomerDetail`, basicDetails)
      .then((res) => {
        if(!localStorage.getItem('role')){
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('role', res.data.data.role);
          props.history.push('/');
        }
      });
  }

  function handleCountryChange(e) {
    setSelectedCountry(e.target.value);
    dispatch(stateChangeHandler({ name: "country", value: e.target.value }))
  }

  function uploadImage(e){
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  };
  const formData = new FormData();
  formData.append('myImage', e.target.files[0]);
      axios.post(`http://${window.location.hostname}:3001/upload`,formData,config)
          .then((res) => {
           setUploadedFile(res.data.fileName);
          }).catch((error) => {
      });
  }

  return (
    <div>
    <div id="RegisterPage">
    <h5>Basic Details</h5>
      <span class="mandatory">* All Fields are mandatory</span>
      <div class="profilePic">
          <img src={profilePic}/>
      </div>
      <input
        type="file"
        id="img"
        name="img"
        accept="image/*"
        onChange={uploadImage}
      />
      <p class="error">{errorMessage}</p>
      <div class="d-flex justify-content-around align-items-center">
        <input
          type="text"
          placeholder="Full Name"
          name="fullName"
          value = {registrationData.fullName}
          onChange={(e) =>
            dispatch(
              stateChangeHandler({ name: "fullName", value: e.target.value })
            )
          }
        />
        <input
          type="text"
          placeholder="Date of Birth"
          name="dateOfBirth"
          value = {registrationData.dateOfBirth}
          onChange={(e) =>
            dispatch(
              stateChangeHandler({ name: "dateOfBirth", value: e.target.value })
            )
          }
        />
      </div>
      <div class="d-flex justify-content-around align-items-center">
        <input
          type="password"
          placeholder="Password"
          name="password"
          //value = {registrationData.password}
          onChange={(e) =>
            dispatch(
              stateChangeHandler({ name: "password", value: e.target.value })
            )
          }
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) =>
            dispatch(
              stateChangeHandler({
                name: "confirmPassword",
                value: e.target.value,
              })
            )
          }
        />
      </div>
      <div class="d-flex justify-content-around align-items-center">
      <input
          type="number"
          placeholder="Mobile Number"
          name="mobileNumber"
          disabled={localStorage.getItem("role") ? true : false}
          value = {registrationData.mobileNumber}
          onChange={(e) =>
            dispatch(
              stateChangeHandler({
                name: "mobileNumber",
                value: e.target.value,
              })
            )
          }
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          value = {registrationData.email}
          disabled={localStorage.getItem("role") ? true : false}
          onChange={(e) =>
            dispatch(
              stateChangeHandler({ name: "email", value: e.target.value })
            )
          }
        />
      </div>
      <div class="d-flex justify-content-around align-items-center">

      </div>
      <div class="d-flex justify-content-around align-items-center">
        <input
          type="text"
          placeholder="Address"
          name="address"
          value = {registrationData.address}
          onChange={(e) =>
            dispatch(
              stateChangeHandler({ name: "address", value: e.target.value })
            )
          }
        />
        <input
          type="text"
          placeholder="City"
          name="city"
          value = {registrationData.city}
          onChange={(e) =>
            dispatch(
              stateChangeHandler({ name: "city", value: e.target.value })
            )
          }
        />
      </div>
      <div class="d-flex justify-content-around align-items-center">
        <select
          placeholder="Select Country"
          name="country"
          value = {registrationData.country}
          onChange={(e)=>handleCountryChange(e)}
        >
          <option value="US">United States</option>
          <option value="CA">Canada</option>
        </select>
        <select
          placeholder="Select Province"
          name="provience"
          value = {registrationData.provience}
          onChange={(e) =>
            dispatch(
              stateChangeHandler({ name: "provience", value: e.target.value })
            )
          }
        >
          {selectedCountry == "US"
            ? usProvience.map((provience) => {
                return (
                  <option value={provience.abbreviation}>
                    {provience.name}
                  </option>
                );
              })
            : caProvience.map((provience) => {
                return (
                  <option value={provience.abbreviation}>
                    {provience.name}
                  </option>
                );
              })}
        </select>
      </div>
      <div class="d-flex justify-content-start align-items-center my-3">
        <select
          name="language"
          value = {registrationData.language}
          onChange={(e) =>dispatch(stateChangeHandler({ name: "language", value: e.target.value }))
          }
        >
          <option>English</option>
          <option>French</option>
          <option>Spanish</option>
        </select>
        <div  className={localStorage.getItem('role') ? 'd-none' : 'd-block'}>
        <div class="res">
          <input
            type="radio"
            id="userType"
            name="userType"
            value="Restaurant"
            onChange={(e) =>
              dispatch(
                stateChangeHandler({ name: "userType", value: e.target.value })
              )
            }
          />
          <span> Restaurant</span>
        </div>
        <div class="res">
          <input
            type="radio"
            id="userType"
            name="userType"
            value="Customer"
            onChange={(e) =>
              dispatch(
                stateChangeHandler({ name: "userType", value: e.target.value })
              )
            }
          />
          <span> Customer</span>
        </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <button class="btn btn-success w-100" onClick={savecustomerData}>
          {localStorage.getItem("role") ? 'Update' : 'Register' }
        </button>
      </div>
    </div>
    <div style={{display: localStorage.getItem('role') ? 'block' : 'none'}}>
    <p>Favorites</p>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr'}}>
        {cartData.map(item=>{
            item.dishName = item.dishId.dishName;
            item.dishTag = item.dishId.dishTag;
            item.dishImage = item.dishId.dishImage;
            item.mobileNumber = item.restaurantMobileNumber;
            return item.checkedOut === 2 ? <Card item={item}/> : ''
        })}
    </div>
    </div>
    <PopUp open={open} message={"Details Saved."}/>
    </div>
  );
}

