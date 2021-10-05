import { createSlice } from "@reduxjs/toolkit";

export const signUp = createSlice({
  name: "signUp",
  initialState: {
    registrationData: {
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
      confirmPassword: "",
      userType: "",
    },
  },
  reducers: {
    stateChangeHandler: (state, payload) => {
      const data = payload.payload;
      state.registrationData[data.name] = data.value;
    },
  },
});

export const { stateChangeHandler } = signUp.actions;

export default signUp.reducer;



//, dateOfBirthHandler, emailHandler, languageHandler, mobileNumberHandler, userNameHandler, fullNameHandler, addressHandler, cityHandler, stateHandler, countryHandler, passwordHandler, confirmPasswordHandler, userTypeHandler
// ,
//     dateOfBirthHandler: (state, dateOfBirth) =>{
//         state.registrationData.dateOfBirth = dateOfBirth
//     },
//     emailHandler: (state, email) => {
//        state.registrationData.email = email
//     },
//     languageHandler: (state, language)=> {
//         state.registrationData.language = language
//     },
//     mobileNumberHandler: (state, mobileNumber)=> {
//         state.registrationData.mobileNumber = mobileNumber
//     },
//     userNameHandler: (state, userName) =>{
//         state.registrationData.userName = userName
//     },
//     fullNameHandler: (state, fullName) =>{
//         state.registrationData.fullName = fullName
//     },
//     addressHandler: (state, address)=> {
//         state.registrationData.address = address
//       },
//     cityHandler: (state, city) =>{
//         state.registrationData.city = city
//     },
//     stateHandler: (state,provience) =>{
//         state.registrationData.provience = provience
//     },
//     countryHandler: (state, country)=> {
//         state.registrationData.country = country
//       },
//     passwordHandler: (state, password) => {
//           state.registrationData.password = password
//       },
//     confirmPasswordHandler: (state, confirmPassword)=>{
//         state.registrationData.confirmPassword = confirmPassword;
//     },
//     userTypeHandler: (state, userType)=> {
//         state.registrationData.userType = userType;
//     }