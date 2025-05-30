import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const URL = import.meta.env.VITE_BACKEND_URL;

// 1 Logging in by OTP
export const LoginByPhoneAction = createAsyncThunk("LoginByPhoneAction",async (phoneNumber) => {
    const { data } = await axios.post(
      `${URL}/loginByPhone`,
      { phoneNumber: phoneNumber },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    return data;
  }
);

// Confirming OTP
export const ConfirmOTPAction = createAsyncThunk("ConfirmOTPAction",
  async ({ otp, phoneNumber }) => {
    // console.log(otp, phoneNumber);
    const { data } = await axios.post(
      `${URL}/otpConfirm`,
      { userOtp: otp, phoneNumber: phoneNumber },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    return data;
  }
);


//2 Logging in by Email and password

export const LoginByEmailAction = createAsyncThunk("LoginByEmailAction",async ({email,password}) => {
  
    const { data } = await axios.post(
      `${URL}/login`,
      { email: email ,password:password},
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    console.log(data);

    if(data.message==="Invalid Credentials"){

    
      toast.error(data.message)}
    return data;
  }
);


// 4 getting user details (will be used from home page details rendering)

export const getUserDetailsAction = createAsyncThunk("getUserDetailsAction",async () => {
    const { data } = await axios.get(
      `${URL}/me`,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    return data;
  }
)
//5 logout user
export const LogoutAction = createAsyncThunk("LogoutAction", async () => {
    await axios.post(
        `${URL}/logout`,
        {}, // Empty body
        { withCredentials: true, headers: { "Content-Type": "application/json" } } // Config object
    );
});


// 6 add to friend  --> No builder
export const AddToFriend = createAsyncThunk("addtofriend",async ({id,email}) => {
  try{

    const { data } = await axios.post(
      `${URL}/addfriend`,
      {id, email},
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    if(data.message==="Already a friend" ){
      toast.success(data.message)

    
    }
    else{
      
      toast.success("Friend added successfully")
    }
    return data;
  }catch(err){
    console.error(err);
    toast.error("could not add friend")
    
  }
 
}
);

//7 name about update  -->no builder
export const NameAboutUpdate = createAsyncThunk("nameAboutUpdate",async ({firstname,lastname,about}) => {
  const { data } = await axios.put(
      `${URL}/nameAboutUpdate`,
      {firstname,lastname,about},
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    return data;
  }
);

//8 profile pic update
export const UpdateProfilePicAction = createAsyncThunk("UpdateProfilePicAction",async ({avatar}) => {
  // console.log("ok",avatar);
  const { data } = await axios.put(
      `${URL}/updateProfilePic`,
      {avatar},
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    return data;
  }
)

//verify phone number
export const VerifyPhoneNumber = createAsyncThunk("VerifyPhoneNumber",async ({otp,phoneNumber}) => {
  const { data } = await axios.post(
      `${URL}/otpConfirm`,
      {userOtp:otp,phoneNumber},
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    return data;
  }
)

//check if non friend user sent message to user
export const CheckNonFriendUserAction = createAsyncThunk("CheckNonFriendUserAction",async ({receiverUsers}) => {
  const { data } = await axios.post(
      `${URL}/requestNonFriends`,
      {receiverUsers},
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    return data;
  } 
)

// Combined user slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    successP: false,
    successO:false,
    successDetails:false,
    phoneNumber: "",
    loadingP: false,
    loadingO: false,
    user: null,
    logoutdone:false,
    nameaboutupdate:false,
    friendadded:false,
    nonfriendusers:[]

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

    // Handling LoginByEmail
    builder.addCase(LoginByEmailAction.pending, (state) => {
      state.loadingO = true;
    });
    builder.addCase(LoginByEmailAction.fulfilled, (state, action) => {
      state.successO = action.payload.success;
      state.user = action.payload.user;
      state.loadingO = false;
    });
    builder.addCase(LoginByEmailAction.rejected, (state) => {
      state.successO = false;
      state.loadingO = false;
      state.user = null;
    });

    // Handling getUserDetails
    builder.addCase(getUserDetailsAction.pending, (state) => {
      state.loadingO = true;
    });
    builder.addCase(getUserDetailsAction.fulfilled, (state, action) => {
      state.successDetails = action.payload.success;
      state.user = action.payload.user;
      state.loadingO = false;
    });
    builder.addCase(getUserDetailsAction.rejected, (state) => {
      state.successDetails = false;
      state.loadingO = false;
      state.user = null;
    });
    //handling logout
    builder.addCase(LogoutAction.fulfilled,(state,action)=>{
      state.user=null;
      state.logoutdone=true;
      window.location.reload();
    })
    builder.addCase(LogoutAction.rejected,(state,action)=>{
      state.logoutdone=false;
    })

    //handling name about update
    builder.addCase(NameAboutUpdate.fulfilled,(state,action)=>{
      state.nameaboutupdate=true;
      state.user=action.payload.user;
    })
    builder.addCase(NameAboutUpdate.rejected,(state,action)=>{
      state.nameaboutupdate=false;
    })

    //handling profile pic update
    builder.addCase(UpdateProfilePicAction.pending,(state,action)=>{
      state.loadingP=true;
    })
    builder.addCase(UpdateProfilePicAction.fulfilled,(state,action)=>{
      state.user=action.payload.user;
      state.loadingP=false;
    })
    builder.addCase(AddToFriend.fulfilled,(state,action)=>{
     // state.user=action.payload.user;
      state.friendadded=true;
    })

    //handling non friends (For request messages)
    builder.
      addCase(CheckNonFriendUserAction.fulfilled, (state, action) => {
        state.nonfriendusers=action.payload.nonFriends
       
      })
  },
});

export default userSlice.reducer;
