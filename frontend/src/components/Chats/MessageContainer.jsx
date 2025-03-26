import React, { useContext, useEffect, useState } from 'react';
import { SidebarContext } from '../../Context/SideBarContext';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { MesssageContext } from "../../Context/MessageContext";


const Message = ({ message, user }) => {
  const {opencheckbox,setopencheckbox,setSelectedMessages,selectedMessages} = useContext(MesssageContext);
  const { successSend,loadingSend } = useSelector((state) => state.messagesReducer);
  const { Userselected } = useContext(SidebarContext);
  ///funtion to hanle checkbox selection..............
  
  const toggleSelection = (id) => {
    setSelectedMessages((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });

  };
  //....................................
  const fromMe = message.senderId === user._id;

  const avatar = user.avatar?.url || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
  const hisAvatar = Userselected.avatar?.url || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  const chatClass = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? avatar : hisAvatar;
  const bubbleColor = fromMe ? 'bg-cyan-600' : 'bg-gray-500';

  // Format date and time
  const messageDate = new Date(message.createdAt).toLocaleDateString();
  const messageTime = new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  
  // useEffect(() => {
  //   console.log(loadingSend);

  // }, [loadingSend]);


  

  return (
    <>
      {/* Show date heading only when the date changes */}
      {/* {showDate && (
        <div className="text-center text-gray-500 text-xs my-2">
          {messageDate}
        </div>
      ) */}
 {opencheckbox && <input
              type="checkbox"
              className="mr-2"
              checked={selectedMessages.has(message._id)}
              onChange={() => toggleSelection(message._id)}
            />}
      <div className={`chat ${chatClass}`} >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Profile" src={profilePic} />
          </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleColor}`}>
          {message.messageBody || 'No message content'}
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
          {messageTime}
        </div>
      </div>
    </>
  );
};

export default Message;
