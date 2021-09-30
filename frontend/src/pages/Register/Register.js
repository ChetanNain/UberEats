import "./Register.css";
import React, { Component } from "react";
import image1 from "../../images/carousel1.jpg";
import { useState } from "react";
import axios from "axios";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      fullName: "",
      dateOfBirth: "",
      address: "",
      city: "",
      state: "",
      mobileNumber: "",
      language: "",
      errorMsg: "",
      email: "",
      country: "",
    //   password: "",
    //   confirmPassword:""
    };
    this.userNameHandler = this.userNameHandler.bind(this);
    this.mobileNumberHandler = this.mobileNumberHandler.bind(this);
    this.locationHandler = this.locationHandler.bind(this);
    this.languageHandler = this.languageHandler.bind(this);
    this.emailHandler = this.emailHandler.bind(this);
    this.fullNameHandler = this.fullNameHandler.bind(this);
    this.dateOfBirthHandler = this.dateOfBirthHandler.bind(this);
    this.addressHandler = this.addressHandler.bind(this);
    this.cityHandler = this.cityHandler.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
    this.countryHandler = this.countryHandler.bind(this);
    this.savecustomerData =  this.savecustomerData.bind(this);
    this.password = this.passwordHandler.bind(this);
    this.confirmPassword= this.confirmPasswordHandler.bind(this);
  }

  componentDidMount() {
    this.loadBasicDetails();
  }
  async loadBasicDetails() {
    const res = await axios.get(
      "http://localhost:3001/customerBasicDetail/"  + localStorage.getItem("userName")
        //localStorage.getItem("customerID")
    );
    this.setState({
      userName: res.data[0].userName,   
      mobileNumber: res.data[0].mobileNumber,
      country: res.data[0].country,
      state: res.data[0].state,
      city: res.data[0].city,
      address: res.data[0].address,
      email: res.data[0].email,
      fullName: res.data[0].fullName,
      dateOfBirth: res.data[0].dateOfBirth,
      language: res.data[0].language,
      password: res.data[0].password
    });
  }

  savecustomerData() {
    const basicDetails = {
      userName: this.state.userName,
      mobileNumber: this.state.mobileNumber,
      country: this.state.country,
      state: this.state.state,
      city: this.state.city,
      address: this.state.address,
      email: this.state.email,
      fullName: this.state.fullName,
      dateOfBirth: this.state.dateOfBirth,
      language: this.state.language,
      password: this.state.password
    };
    axios
      .post("http://localhost:3001/addCustomerDetail", basicDetails)
      .then((res) => {
        const userName = res.data;
        localStorage.setItem("userName", userName);
        alert("Basic details has been saved");
      });
  }
  
  dateOfBirthHandler(e) {
    this.setState({ dateOfBirth: e.target.value });
  }
  emailHandler(e) {
    this.setState({ email: e.target.value });
  }
  languageHandler(e) {
    this.setState({ language: e.target.value });
  }
  locationHandler(e) {
    this.setState({ location: e.target.value });
  }

  mobileNumberHandler(e) {
    this.setState({ mobileNumber: e.target.value });
  }

  userNameHandler(e) {
      console.log("username", e.target.value);
    this.setState({ userName: e.target.value });
  }

  fullNameHandler(e) {
    this.setState({ fullName: e.target.value });
  }
  addressHandler(e) {
    this.setState({ address: e.target.value });
  }
  cityHandler(e) {
    this.setState({ city: e.target.value });
  }
  stateHandler(e) {
    this.setState({ state: e.target.value });
  }
  countryHandler(e) {
    this.setState({ country: e.target.value });
  }
  passwordHandler(e) { 
      this.passwordHandler({ password: e.target.value});
  }
  confirmPasswordHandler(e) {
      this.confirmPasswordHandler({ confirmPassword: e.target.value});
  }


  render() {
    return (
      <div class="container">
        <h5>Basic Details</h5>
        <span class="mandatory">* All Fields are mandatory</span>
        <p class="error">{this.state.errorMessage}</p>
        <div class="d-flex justify-content-around">
          <input
            type="text"
            placeholder="Full Name"
            value={this.state.fullName}
            onChange={this.fullNameHandler}
          />
          <input
            type="text"
            placeholder="Username"
            value={this.state.userName}
            onChange={this.userNameHandler}
          />
        </div>
        {/* <div class="d-flex justify-content-around">
          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.passwordHandler}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={this.state.confirmPassword}
            onChange={this.confirmPasswordHandler}
          />
        </div> */}
        <div class="d-flex justify-content-around">
          <input
            type="text"
            placeholder="Date of Birth"
            value={this.state.dateOfBirth}
            onChange={this.dateOfBirthHandler}
          />
          <input
            type="text"
            placeholder="email"
            value={this.state.email}
            onChange={this.emailHandler}
          />
        </div>
        <div class="d-flex justify-content-around">
          <input
            type="text"
            placeholder="Mobile Number"
            value={this.state.mobileNumber}
            onChange={this.mobileNumberHandler}
          />
          <input
            type="text"
            placeholder="Language"
            value={this.state.language}
            onChange={this.languageHandler}
          />
        </div>
        <div class="d-flex justify-content-around">
          <input
            type="text"
            placeholder="Address"
            value={this.state.address}
            onChange={this.addressHandler}
          />
          <input
            type="text"
            placeholder="City"
            value={this.state.city}
            onChange={this.cityHandler}
          />
        </div>
        <div class="d-flex justify-content-around">
          <input
            type="text"
            placeholder="State"
            value={this.state.state}
            onChange={this.stateHandler}
          />
          <input
            type="text"
            placeholder="Country"
            value={this.state.country}
            onChange={this.countryHandler}
          />
        </div>
        <br />
        <br />

        <div class="d-flex justify-content-evenly">
          <button class="btn btn-success" onClick={this.savecustomerData}>
            Save Basic Details
          </button>
        </div>
      </div>
    );
  }
}

{
  /* <div id="ProfilePage">
            <img src={image1} alt="Avatar" style= {{borderRadius: '50%', width:'180px', height: '180px', textAlign:'left'}}/><br/><br/>
            <p>{errMsg}</p>
            <label> Username : </label> <input type="text" onChange={handleUserName}></input><br/>
            <label> Full Name : </label> <input type="text" onChange={handleUserName}></input><br/>
            <label> Date of Birth : </label> <input type="text" onChange={handleUserName}></input><br/>
            <label> Address : </label> <input type="text" onChange={handleLocation}></input><br/>
            <label> City: </label> <input type="text" onChange={handleUserName}></input><br/>
            <label> State: </label> <input type="text" onChange={handleUserName}></input><br/>
            <label> Mobile Number : </label> <input type="number" name="mobile_number" id="phone_number" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
           required="required" onChange={handleMobileNumber}></input><br/>
            <label> Country: </label> <input type="text" onChange={handleUserName}></input><br/>
            <label> Language : </label> <input type="text" onChange={handleLanguage}></input><br/>
            <label> Email: </label> <b><input type="text" disabled="disabled" onChange={handleEmail}/></b><br/><br/>
            <button id="buttonSaveChanges" type="button" onClick={validateForm}>Save Changes</button><br/><br/><br/>
                <h4>Authorized applications</h4>
                    <h5>You do not have any authorized applications</h5><br/><br/>
            <button id="buttonLogout" type="button">Logout</button>
        </div> */
}
