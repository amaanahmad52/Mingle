import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const URL = import.meta.env.VITE_BACKEND_URL;


// Async thunk to send OTP
export const sendOtp = createAsyncThunk(
    "sendOtpEmail",
    async ({ email, navigate }, { rejectWithValue }) => {
      const toastId = toast.loading("Loading...");
      try {
        const { data } = await axios.post(
          `${URL}/sendOtpByEmail`,
          { email },
          { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
  
        toast.success("OTP Sent Successfully");
        useNavigate("/verify-email");
        
        return data;
      } catch (error) {
        console.error("SENDOTP ERROR:", error);
        toast.error(error.response?.data?.message || "Could Not Send OTP");
        return rejectWithValue(error.response?.data);
      } finally {
        toast.dismiss(toastId);
      }
    }
  );
  

// Async thunk for signup
export const signUp = createAsyncThunk(
    "auth/signUp",
    async ({ accountType, firstName, lastName, email, password, confirmPassword, otp, navigate }, { rejectWithValue }) => {
      const toastId = toast.loading("Loading...");
      try {
        const response = await axios.post( `${URL}/register`, {
          accountType,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          otp,
        }, { withCredentials: true, headers: { "Content-Type": "application/json" } });
        console.log("SIGNUP API RESPONSE:", response);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
        
        toast.success("Signup Successful");
        useNavigate("/loginByEmail");
        return response.data;
      } catch (error) {
        console.error("SIGNUP API ERROR:", error);
        toast.error(error.response?.data?.message || "Signup Failed");
        return rejectWithValue(error.response?.data);
      } finally {
        toast.dismiss(toastId);
      }
    }
  );

const initialState = {
 
  signUpdata:null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  
    setSignupData: (state, action) => {
      state.signUpdata = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSignupData, setLoading,  } = authSlice.actions;
export default authSlice.reducer;
