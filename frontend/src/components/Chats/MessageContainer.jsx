import React, { useContext, useEffect } from "react";
import { SidebarContext } from "../../Context/SideBarContext";
import { useSelector } from "react-redux";
import { MesssageContext } from "../../Context/MessageContext";

const Message = ({ message, user }) => {
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
  const iscolour=selectedMessages.has(message._id)?"transparent bg-cyan-200":""
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
    <div className={`chat ${chatClass} ${iscolour} `}>
      {opencheckbox && (
        <div className={`flex items-center h-full ${checkboxAlign} `}>
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={selectedMessages.has(message._id)}
            onChange={() => toggleSelection(message._id)}
          />
        </div>
      )}

      <div>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Profile" src={profilePic} />
          </div>
        </div>
        <div
          className={`chat-bubble text-white ${bubbleColor} break-words max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl whitespace-pre-wrap ${
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
  );
};

export default Message;
