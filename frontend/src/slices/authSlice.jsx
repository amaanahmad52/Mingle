import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const URL = import.meta.env.VITE_BACKEND_URL;

//const nav=useNavigate();
// Async thunk to send OTP
export const sendOtp = createAsyncThunk(
    "sendOtpEmail",
    async ({email,phoneNumber}, { rejectWithValue }) => {
      const toastId = toast.loading("Loading...");
      try {
        const { data } = await axios.post(
          `${URL}/sendOtpByEmail`,
          { email,phoneNumber },
          { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
  
        toast.success("OTP Sent Successfully");
       // nav('/verify-email');

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
    "signUp",
    async (  {firstName, lastName, email,phoneNumber, password, confirmPassword, otp} ,{ rejectWithValue }) => {
      console.log("SIGNUP PAYLOAD:", {firstName, lastName, email,phoneNumber, password, confirmPassword, otp});
      const toastId = toast.loading("Loading...");
      try {
        const response = await axios.post( `${URL}/register`, {
        
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
          confirmPassword,
          otp,
        }, { withCredentials: true, headers: { "Content-Type": "application/json" } });
        console.log("SIGNUP API RESPONSE:", response);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
        
        toast.success("Signup Successful");
     
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
  // otpsend ke liye call
  export const sendotpbysms = createAsyncThunk(
    "sendOtpbysms",
    async ({phoneNumber}, { rejectWithValue }) => {
      const toastId = toast.loading("Loading...");
      try {
        const { data } = await axios.post(
          `${URL}/loginByPhone`,
          { phoneNumber },
          { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
  
        toast.success("OTP Sent Successfully");
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
/// otp send for verificatio og phone number
export const verifyPhoneNumber = createAsyncThunk(
  "verifyPhoneNumber",
  async ({otp,phoneNumber}, { rejectWithValue }) => {
    const toastId = toast.loading("Loading...");
    try {
      const { data } = await axios.post(
        `${URL}/verifyphone`,
        { userOtp:otp,phoneNumber },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      toast.success("Phone Number Verified Successfully");
      return data;
    } catch (error) {
      console.error("VERIFY PHONE NUMBER ERROR:", error);
      toast.error(error.response?.data?.message || "Could Not Verify Phone Number");
      return rejectWithValue(error.response?.data);
    } finally {
      toast.dismiss(toastId);
    }
  }
);
const initialState = {
 
  signUpdata:null,
  invite_data:null,
  loading: false,
  error: null,
  successotp:false,
  success:false,
  isverify:false
};

const authSlice = createSlice({
  name: "auth",
initialState,
  reducers: {
  
    setSignupData: (state, action) => {
      state.signUpdata = action.payload;
    },
    setInvite: (state, action) => {
      state.invite_data = action.payload;
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
        state.successotp=true;
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
        state.success=true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendotpbysms.fulfilled, (state) => {
       // state.loading = false;
        state.successotp=true;
      })
      .addCase(verifyPhoneNumber.fulfilled, (state) => {
        // state.loading = false;
         state.isverify=true;
       })
  },
});

export const { setSignupData, setLoading,  setInvite} = authSlice.actions;
export default authSlice.reducer;
