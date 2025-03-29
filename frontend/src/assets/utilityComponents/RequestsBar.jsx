import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RequestProfileTile from "./RequestProfileTile";
import { clearMessagesAction, getAllMessagesAction, setMessages } from "../../slices/MessagesSlice";
import { AddToFriend, CheckNonFriendUserAction } from "../../slices/UserSlices";
import { useContext } from "react";
import { SidebarContext } from "../../Context/SideBarContext";
const RequestsBar = ({ allusers = [] }) => {
    const dispatch = useDispatch();
    const {RequestUserselected,setRequestUserSelected,userselected,setUserSelected}=useContext(SidebarContext);
    const { user,nonfriendusers } = useSelector((state) => state.userReducer);
    const {messages}=useSelector((state)=>state.messagesReducer);

    const filteredUsers = Array.isArray(allusers)
        ? allusers.filter((u) => !user?.friends?.includes(u._id))
        : [];

    //check if non-friend user has sent some message to user
  
    filteredUsers.splice(filteredUsers.findIndex((u) => u._id === user._id), 1);

    useEffect(() => {
        if (filteredUsers.length > 0) {
            dispatch(CheckNonFriendUserAction({ receiverUsers: filteredUsers}));
        }
    }, [dispatch]); 
    
    
    const handleClick = (u) => {
        setRequestUserSelected(u); //set user on context
        setUserSelected(null);
    };
    
    const handleReqClick = (action) => {
        if(action === "Accept"){
            //delte this user from non friend array
            filteredUsers.splice(filteredUsers.findIndex((u) => u._id === RequestUserselected._id), 1);
            dispatch(CheckNonFriendUserAction({ receiverUsers: filteredUsers}));

            //add this user as a friend
            dispatch(AddToFriend({ id: RequestUserselected._id, email: user.email }));
            
            
        }
        if(action === "Reject"){
            dispatch(clearMessagesAction({ receiverId: RequestUserselected._id }));
        }
        setRequestUserSelected(null);

        dispatch(setMessages([]));
        window.location.reload();
    };

    useEffect(() => {
       
    }, [messages]);

    return (
        <div >
            {/* No message requests UI */}
            {nonfriendusers.length === 0 ? (
                <div className="flex flex-col items-center gap-2 justify-center w-full h-full mb-25">
                    <img
                        className="w-20 h-20 object-contain"
                        src="https://www.iconpacks.net/icons/2/free-facebook-messenger-icon-2880-thumb.png"
                        alt=""
                    />
                    <h1 className="text-center text-white text-xl font-extrabold">
                        No Message Requests
                    </h1>
                    <p className="ml-15 mr-15 text-xs text-center text-gray-400">
                        You don't have any message requests.
                    </p>
                </div>
            ) : (
                // Display users with ProfileTile component
                <div className="flex flex-col gap-2 overflow-y-scroll scrollbar-hidden">
                {nonfriendusers && nonfriendusers.map((user) => (
                    <RequestProfileTile
                        key={user._id}
                        user={user}
                        onClick={() => handleClick(user)}
                        imageUrl={user.avatar?.url}
                        requestClick={handleReqClick}
                    />
                ))}
                </div>
            )}
        </div>
    );
};

export default RequestsBar;
