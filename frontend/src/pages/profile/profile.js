import './profile.css'
import React from 'react';
import image1 from '../../images/carousel1.jpg'
import {useState} from 'react';
export default function Profile() {
    const[errMsg,setErrMsg] = useState();
    const [userName, setuserName] = useState();
    const [mobileNumber, setMobileNumber] = useState();
    const [location, setLocation] = useState();
    const [language, setLanguage] = useState();
    const [email, setEmail] = useState();
    function handleUserName(e) {
        setuserName(e.target.value);
    }
    function handleMobileNumber(e) {
        setMobileNumber(e.target.value);
    }
    function handleLocation(e) {
        setLocation(e.target.value);
    }
    function handleLanguage(e) {
        setLanguage(e.target.value);
    }
    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function validateForm(){
        if(userName=='' || userName.length<6 || userName.length>20 ){
            setErrMsg('User number must be from 6 to 20 characters.')
        }else{
            setErrMsg('');
           const  requestBody =  {
                userName,
                mobileNumber,
                location,
                language,
                email
            }
            console.log(requestBody);
            alert("Profile Updated.")
        }
    }
    return (
        <div id="ProfilePage">
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
        </div>
    )
}