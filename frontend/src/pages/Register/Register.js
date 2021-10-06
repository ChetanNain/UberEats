import "./Register.css";
import React, { Component } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {stateChangeHandler} from "../../redux/reducers/signUp";
import Restaurant from "@mui/icons-material/Restaurant";

export default function Register(props) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState("US");
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
    loadBasicDetails();
  }, []);

  function loadBasicDetails() {
    axios.get("http://localhost:3001/customerBasicDetail/" + "").then((res) => {
      if (res.data && res.data.length > 0) {
        dispatch(stateChangeHandler({ name: "userName", value: res.data[0].userName }));
        dispatch(stateChangeHandler({ name: "fullName", value: res.data[0].fullName }));
        dispatch(stateChangeHandler({ name: "mobileNumber", value: res.data[0].mobileNumber }));
        dispatch(stateChangeHandler({ name: "country", value: res.data[0].country }));
        dispatch(stateChangeHandler({ name: "provience", value: res.data[0].state }));
        dispatch(stateChangeHandler({ name: "address", value: res.data[0].address }));
        dispatch(stateChangeHandler({ name: "email", value: res.data[0].email }));
        dispatch(stateChangeHandler({ name: "dateOfBirth", value: res.data[0].dateOfBirth }));
        dispatch(stateChangeHandler({ name: "language", value: res.data[0].language }));
        dispatch(stateChangeHandler({ name: "password", value: res.data[0].password }));
        dispatch(stateChangeHandler({ name: "userType", value: res.data[0].userType }));
        // dispatch(userNameHandler(res.data[0].userName));
        // dispatch(fullNameHandler(res.data[0].fullName));
        // dispatch(mobileNumberHandler(res.data[0].mobileNumber));
        // dispatch(countryHandler(res.data[0].country));
        // dispatch(stateHandler(res.data[0].state));
        // dispatch(cityHandler(res.data[0].city));
        // dispatch(addressHandler(res.data[0].address));
        // dispatch(emailHandler(res.data[0].email));
        // dispatch(dateOfBirthHandler(res.data[0].dateOfBirth));
        // dispatch(languageHandler(res.data[0].language));
        // dispatch(passwordHandler(res.data[0].password));
        // dispatch(userTypeHandler(res.data[0].userType));
      }
    });
  }

  function valdiate() {
    if (!registrationData.fullName) {
      //console.log(registrationData);
      setErrorMessage("Name can't be empty");
      return false;
    } else if (
      registrationData.userName &&
      registrationData.userName.length < 6
    ) {
      setErrorMessage("Username must be between 6-20 characters.");
      return false;
    } else if (
      registrationData.password &&
      registrationData.password.length < 6
    ) {
      setErrorMessage("Password must be between 6-20 characters.");
      return false;
    } else if (
      registrationData.email &&
      registrationData.email.length < 6
    ) {
      setErrorMessage("Enter a valid email.");
      return false;
    } else if (
      registrationData.mobileNumber &&
      registrationData.mobileNumber.length < 10
    ) {
      setErrorMessage("Enter a valid mobile number.");
      return false;
    } else if (!registrationData.address) {
      setErrorMessage("Address field is required.");
      return false;
    } else if (!registrationData.city) {
      setErrorMessage("City field is required.");
      return false;
    } else if (
      registrationData.confirmPassword !=
      registrationData.password
    ) {
      setErrorMessage("Passwords does not match");
      return false;
    } else if (
      ["Customer", "Restaurant"].findIndex(
        (role) => role == registrationData.userType
      ) == -1
    ) {
      setErrorMessage("Please select the user type.");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  }
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function savecustomerData() {
    if (!valdiate()) return;
    const basicDetails = { ...registrationData };
    console.log(basicDetails.userType);
    if(basicDetails.userType=='Customer'){
    axios
      .post("http://localhost:3001/addCustomerDetail", basicDetails)
      .then((res) => {
        console.log("hit customer");
        props.history.push('');
      });
    }else{
      axios
      .post("http://localhost:3001/addRestaurantBasicDetail", basicDetails)
      .then((res) => {
        console.log("hit restaurant");
        localStorage.setItem("restaurantID", res.data);
        props.history.push('');
      });
    }
  }

  function handleCountryChange(e) {
    setSelectedCountry(e.target.value);
    dispatch(stateChangeHandler({ name: "country", value: e.target.value }))
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
          name="fullName"
          onChange={(e) =>
            dispatch(
              stateChangeHandler({ name: "fullName", value: e.target.value })
            )
          }
        />
        <input
          type="text"
          placeholder="Username"
          name="userName"
          onChange={(e) =>
            dispatch(
              stateChangeHandler({ name: "userName", value: e.target.value })
            )
          }
        />
      </div>
      <div class="d-flex justify-content-around align-items-center">
        <input
          type="password"
          placeholder="Password"
          name="password"
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
          type="text"
          placeholder="Date of Birth"
          name="dateOfBirth"
          onChange={(e) =>
            dispatch(
              stateChangeHandler({ name: "dateOfBirth", value: e.target.value })
            )
          }
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={(e) =>
            dispatch(
              stateChangeHandler({ name: "email", value: e.target.value })
            )
          }
        />
      </div>
      <div class="d-flex justify-content-around align-items-center">
        <input
          type="number"
          placeholder="Mobile Number"
          name="mobileNumber"
          onChange={(e) =>
            dispatch(
              stateChangeHandler({
                name: "mobileNumber",
                value: e.target.value,
              })
            )
          }
        />
        <select
          name="language"
          onChange={(e) =>dispatch(stateChangeHandler({ name: "language", value: e.target.value }))
          }
        >
          <option>English</option>
          <option>French</option>
          <option>Spanish</option>
        </select>
      </div>
      <div class="d-flex justify-content-around align-items-center">
        <input
          type="text"
          placeholder="Address"
          name="address"
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
          onChange={(e)=>handleCountryChange(e)}
        >
          <option value="US">United States</option>
          <option value="CA">Canada</option>
        </select>

        <select
          placeholder="Select Province"
          name="provience"
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

      <div class="d-flex justify-content-center">
        <button class="btn btn-success w-100" onClick={savecustomerData}>
          Register
        </button>
      </div>
    </div>
  );
}







// ,
//   dateOfBirthHandler,
//   emailHandler,
//   languageHandler,
//   mobileNumberHandler,
//   userNameHandler,
//   fullNameHandler,
//   addressHandler,
//   cityHandler,
//   stateHandler,
//   countryHandler,
//   passwordHandler,
//   confirmPasswordHandler,
//   userTypeHandler,