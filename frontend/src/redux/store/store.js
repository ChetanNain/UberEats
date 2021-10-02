import { configureStore } from '@reduxjs/toolkit'
import login from '../reducers/login';
import signUp from '../reducers/signUp';
import masterData from '../reducers/masterData';

export default configureStore({
  reducer: {
    login: login,
    signUp: signUp,
    masterData: masterData
  },
})