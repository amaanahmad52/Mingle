import React, { useContext, useEffect } from "react";
import { SidebarContext } from "../../Context/SideBarContext";
import { useSelector } from "react-redux";
import { MesssageContext } from "../../Context/MessageContext";
import useListenMessages from "../../../hooks/useListenMessage";

const Message = ({ message, user }) => {
  useListenMessages()
  const shakeClass = message.shouldShake ? "shake" : "";
  const {
    opencheckbox,
    setopencheckbox,
    setSelectedMessages,
    selectedMessages,
  } = useContext(MesssageContext);
  const { successSend, loadingSend } = useSelector(
    (state) => state.messagesReducer
  );
  const { Userselected, RequestUserselected } = useContext(SidebarContext);

  const selectedUser = RequestUserselected || Userselected;
  const fromMe = message.senderId === user._id;

  const toggleSelection = (id) => {
    setSelectedMessages((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const avatar =
    user.avatar?.url ||
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
  const hisAvatar =
    selectedUser?.avatar?.url ||
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  const chatClass = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? avatar : hisAvatar;
  const bubbleColor = fromMe ? "bg-cyan-600" : "bg-gray-500";
  const checkboxAlign = fromMe ? "order-0 mr-auto" : "order-1 ml-auto"; // Ensure checkbox is positioned correctly
  const iscolour=selectedMessages.has(message._id)?"transparent ":""
useEffect(()=>{

setSelectedMessages(new Set())
},[Userselected])
  // Format date and time
  const messageDate = new Date(message.createdAt).toLocaleDateString();
  const messageTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
    <div className={`${opencheckbox?'h-24':""}`}>
    <div className={`chat ${chatClass} relative pb-60px`}>
      {opencheckbox && (
       <input
       type="checkbox"
       className={`w-4 h-4 appearance-none border-2  rounded-md border-cyan-600  
        transition-all duration-200 ease-in-out 
        hover:scale-110  hover:shadow-sm
        focus:ring-3
      checked:bg-cyan-700 
        checked:border-cyan-600 focus:ring-[rgb(247,174,30)]
        absolute top-1/2 cursor-pointer transform -translate-y-1/2 
        ${fromMe ? "left-2" : "right-2"}`}       checked={selectedMessages.has(message._id)}
       onChange={() => toggleSelection(message._id)}
     />
     
      )}

      
       
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Profile" src={profilePic} />
            </div>
          </div>
          <div
            className={`chat-bubble text-white ${bubbleColor} ${shakeClass} break-words max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl whitespace-pre-wrap ${
              selectedMessages.has(message._id) ? "bg-opacity-80 ring-3 ring-[rgb(247,174,30)]" : ""
            }`}
          >
            {message.messageBody || "No message content"}
          </div>
          <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
            {messageTime}
          </div>
       
    </div>
    </div>
    </>
  );
};

export default Message;