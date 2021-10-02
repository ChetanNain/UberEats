import { createSlice } from '@reduxjs/toolkit'

export const login = createSlice({
  name: 'login',
  initialState: {
    mobileNumber: '',
    password:'',
    userType: ''
  },
  reducers: {
    setMobileNumber: (state, mobileNumber) => {
      state.mobileNumber = mobileNumber
    },
    setPassword: (state, password)=>{
      state.password = password
    },
    setUserType: (state, userType)=>{
      state.userType = userType
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMobileNumber, setPassword, setUserType } = login.actions

export default login.reducer