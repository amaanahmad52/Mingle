import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

// Logging in by OTP
export const LoginByPhoneAction = createAsyncThunk("LoginByPhoneAction",async (phoneNumber) => {
    const { data } = await axios.post(
      `${URL}/loginByPhone`,
      { phoneNumber: phoneNumber },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    return data;
  }
);

//logging in by email
export const LoginByEmailAction = createAsyncThunk("LoginByEmailAction",async (email,password) => {
  const { data } = await axios.post(
    `${URL}/loginByEmail`,
    { email: email ,
      password:password
    },
    { withCredentials: true, headers: { "Content-Type": "application/json" } }
  );
  return data;
}
);

// Confirming OTP
export const ConfirmOTPAction = createAsyncThunk("ConfirmOTPAction",
  async ({ otp, phoneNumber }) => {
    console.log(otp, phoneNumber);
    const { data } = await axios.post(
      `${URL}/otpConfirm`,
      { userOtp: otp, phoneNumber: phoneNumber },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    return data;
  }
);

// Combined user slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    successP: false,
    successO:false,
    phoneNumber: "",
    email:"",
    password:"",
    loadingP: false,
    loadingO: false,
    user: null,
  },
  extraReducers: (builder) => {
    // Handling LoginByPhone
    builder.addCase(LoginByPhoneAction.pending, (state) => {
      state.loadingP = true;
    });
    builder.addCase(LoginByPhoneAction.fulfilled, (state, action) => {
      state.successP = action.payload.success;
      state.phoneNumber = action.payload.phoneNumber;
      state.loadingP = false;
    });
    builder.addCase(LoginByPhoneAction.rejected, (state) => {
      state.successP = false;
      state.loadingP = false;
    });
//login by email
builder.addCase(LoginByEmailAction.pending, (state) => {
  state.loadingP = true;
});
builder.addCase(LoginByEmailAction.fulfilled, (state, action) => {
  state.successP = action.payload.success;
  state.email = action.payload.email;
  state.password = action.payload.password;
  state.loadingP = false;
});
builder.addCase(LoginByEmailAction.rejected, (state) => {
  state.successP = false;
  state.loadingP = false;
});
    // Handling ConfirmOTP
    builder.addCase(ConfirmOTPAction.pending, (state) => {
      state.loadingO = true;
    });
    builder.addCase(ConfirmOTPAction.fulfilled, (state, action) => {
      state.successO = action.payload.success;
      state.user = action.payload.user;
      state.loadingO = false;
    });
    builder.addCase(ConfirmOTPAction.rejected, (state) => {
      state.successO = false;
      state.loadingO = false;
      state.user = null;
    });
  },
});

export default userSlice.reducer;
