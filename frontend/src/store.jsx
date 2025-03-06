import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/UserSlices'
import authReducer from './slices/authSlice'
export const store = configureStore({
  reducer: {
    userReducer:userReducer, //this name will be used in use selector
    auth: authReducer ,
  },
})