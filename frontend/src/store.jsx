import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/UserSlices'
import authReducer from './slices/authSlice'
import messagesReducer from './slices/MessagesSlice'
import paymentReducer from  './slices/paymentSlice'
export const store = configureStore({
  reducer: {
    userReducer:userReducer, //this name will be used in use selector
    auth: authReducer ,
    messagesReducer:messagesReducer,
    paymentReducer:paymentReducer
  },
})