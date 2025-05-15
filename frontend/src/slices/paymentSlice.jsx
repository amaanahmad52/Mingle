import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const URL = import.meta.env.VITE_BACKEND_URL;

//getting all payment History
export const getPaymentHistoryAction = createAsyncThunk("getPaymentHistoryAction",async () => {
       
        const { data } = await axios.get(
            `${URL}/getPaymentHistory`,
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
        return data;
    }
)
//add balance
export const addBalanceAction = createAsyncThunk("addBalanceAction",async ({amount}) => {
       
        const { data } = await axios.put(
            `${URL}/addBalance`,
            {amount},
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
        return data;
    }
)


const PaymentSlice = createSlice({
    name: "paymentSlice",
    initialState: {
        loading: false,
        paymentHistory: null,
        filteredPaymentHistory:null,
        error: null,
    },
    reducers: {
        setFilteredPaymentHistory:(state,action)=>{
            state.filteredPaymentHistory=action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPaymentHistoryAction.pending, (state) => {
            state.loading = true;
        })
        .addCase(getPaymentHistoryAction.fulfilled, (state, action) => {
            state.loading = false;
            state.paymentHistory = action.payload.payments;
        })
        .addCase(getPaymentHistoryAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        });

        builder.addCase(addBalanceAction.fulfilled, (state, action) => {
            state.balanceAdded=true
        });
    }
});
export const { setFilteredPaymentHistory} = PaymentSlice.actions;
export default PaymentSlice.reducer;