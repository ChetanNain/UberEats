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
