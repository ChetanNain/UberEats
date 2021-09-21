import CarouselFunc from "../../components/Carousel";
import React , { Component}  from 'react';
import './Register.css'


 
export default function Register(props) {
    const [isMobileSubmitted, setIsMobileSubmitted] = React.useState(false);
    const [validPassword, validatePassword] = React.useState(false);

    function validateForm(inputId){
        if(inputId == 'emailOrPhone'){
            setIsMobileSubmitted(true);
        }
        else if(inputId == 'password'){
                props.validateRegister(true);
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
            <div>
                {isMobileSubmitted ?
                        <input type="text" placeholder="Enter Password"/> :
                     <input type="text" placeholder="Email or mobile number"/>
                     }
                    <br/><input type="submit" value="Next" onClick={()=>validateForm(isMobileSubmitted ? 'password' : 'emailOrPhone')}/>
                <h6>New to Uber?<a href="">Create an account</a></h6>
            </div>
        </div>
    )
}