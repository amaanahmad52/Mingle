import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const URL = import.meta.env.VITE_BACKEND_URL;

// 1 get all messages between two users
export const getAllMessagesAction = createAsyncThunk("getAllMessagesAction",async ({receiverId}) => {
        const { data } = await axios.get(
            `${URL}/getMessages/${receiverId}`,
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
        // console.log(data);
        return data;
    }
)

const messagesSlice = createSlice({
    name: "messages",
    initialState: {
        successAll: false,
        loadingAll: false,
        messages: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllMessagesAction.pending, (state) => {
                state.loadingAll = true;
            })
            .addCase(getAllMessagesAction.fulfilled, (state, action) => {
                state.loadingAll = false;
                state.successAll = true;
                state.messages = action.payload.messages;
            })
            .addCase(getAllMessagesAction.rejected, (state) => {
                state.loadingAll = false;
                state.successAll = false;
            });
    },
});

export default messagesSlice.reducer;