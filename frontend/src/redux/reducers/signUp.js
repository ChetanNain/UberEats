import { createSlice } from '@reduxjs/toolkit'

export const signUp = createSlice({
  name: 'signUp',
  initialState: {
      userName: "",
      fullName: "",
      dateOfBirth: "",
      address: "",
      city: "",
      provience: "AL",
      mobileNumber: "",
      language: "English",
      errorMsg: "",
      email: "",
      country: "US",
      password: "",
      confirmPassword:"",
      userType: ""
  },
  reducers: {
    dateOfBirthHandler: (state, dateOfBirth) =>{
        state.dateOfBirth = dateOfBirth
    },
    emailHandler: (state, email) => {
       state.email = email
    },
    languageHandler: (state, language)=> {
        state.language = language
    },
    mobileNumberHandler: (state, mobileNumber)=> {
        state.mobileNumber = mobileNumber
    },
    userNameHandler: (state, userName) =>{
        state.userName = userName
    },
    fullNameHandler: (state, fullName) =>{
        state.fullName = fullName
    },
    addressHandler: (state, address)=> {
        state.address = address
      },
    cityHandler: (state, city) =>{
        state.city = city
    },
    stateHandler: (state,provience) =>{
        state.provience = provience
    },
    countryHandler: (state, country)=> {
        state.country = country
      },
    passwordHandler: (state, password) => { 
          state.password = password
      },
    confirmPasswordHandler: (state, confirmPassword)=>{
        state.confirmPassword = confirmPassword;
    },
    userTypeHandler: (state, userType)=> {
        state.userType = userType;
    }
  },
})

// Action creators are generated for each case reducer function
export const {dateOfBirthHandler, emailHandler, languageHandler, mobileNumberHandler, userNameHandler, fullNameHandler, addressHandler, cityHandler, stateHandler, countryHandler, passwordHandler, confirmPasswordHandler, userTypeHandler} = signUp.actions

export default signUp.reducer