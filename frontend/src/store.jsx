import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/UserSlices'
import authReducer from './slices/authSlice'
export const store = configureStore({
  reducer: {
<<<<<<< HEAD
    userReducer:userReducer ,
    auth: authReducer , 
    //this name will be used in use selector
=======
    userReducer:userReducer, //this name will be used in use selector
    auth: authReducer ,
>>>>>>> upstream/main
  },
})