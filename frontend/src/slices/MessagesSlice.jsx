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

// 2 send message to a user

export const sendMessageAction = createAsyncThunk("sendMessageAction",async ({messageBody,receiverId}) => {
        const { data } = await axios.post(
            `${URL}/sendMessage/${receiverId}`,
            {messageBody},
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
       
        return data;
    }
)
//3 clear the messages between two users
export const clearMessagesAction = createAsyncThunk("clearMessagesAction",async ({receiverId}) => {
        const { data } = await axios.delete(
            `${URL}/clearMessages/${receiverId}`,
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
        return data;
    }
)

//4 clear the one message between two user with message id
export const clearMultipleMessagesAction = createAsyncThunk(
    "clearMultipleMessagesAction",
    async ({ receiverId, messageIds }) => {
        const { data } = await axios.delete(
            `${URL}/clearMultipleMessages`, 
            { 
                data: { receiverId, messageIds }, 
                withCredentials: true, 
                headers: { "Content-Type": "application/json" } 
            }
        );
        return data;
    }
);

const messagesSlice = createSlice({
    name: "messages",
    initialState: {
        successAll: false,
        loadingAll: false,
        successSend:false,
        messages: [],
    },
    reducers: {

        setMessages: (state, action) => { //this is for clearing the chat messages
            state.messages = action.payload;
        }
    },
    extraReducers: (builder) => {
        //handling get all messages
        builder
            .addCase(getAllMessagesAction.pending, (state) => {
                state.loadingAll = true;
            })
            .addCase(getAllMessagesAction.fulfilled, (state, action) => {
                state.loadingAll = false;
                state.successAll = action.payload.success;
                state.messages = action.payload.messages;
            })
            .addCase(getAllMessagesAction.rejected, (state) => {
                state.loadingAll = false;
                state.successAll = false;
            });
        //handling send message
        builder
            .addCase(sendMessageAction.pending, (state) => {
                state.loadingSend = true;
                state.successSend = false;
            })
            .addCase(sendMessageAction.fulfilled, (state, action) => {
                state.loadingSend = false;
                state.successSend = true;
               
            })
            .addCase(sendMessageAction.rejected, (state) => {
                state.loadingSend = false;
                state.successSend = false;
            });

           
           
    },
});
export const { setMessages} = messagesSlice.actions;
export default messagesSlice.reducer;