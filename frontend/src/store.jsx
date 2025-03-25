import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/UserSlices'
import authReducer from './slices/authSlice'
import messagesReducer from './slices/MessagesSlice'
export const store = configureStore({
  reducer: {
    userReducer:userReducer, //this name will be used in use selector
    auth: authReducer ,
    messagesReducer:messagesReducer
  },
})