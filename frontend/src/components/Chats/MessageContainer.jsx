import React, { useContext, useEffect } from "react";
import { SidebarContext } from "../../Context/SideBarContext";
import { useSelector } from "react-redux";
import { MesssageContext } from "../../Context/MessageContext";

const Message = ({ message, user }) => {
  const {
    opencheckbox,
    setSelectedMessages,
    selectedMessages,
  } = useContext(MesssageContext);
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

  const profilePic = fromMe ? avatar : hisAvatar;
  const bubbleColor = fromMe ? "bg-cyan-600" : "bg-gray-500";

  useEffect(() => {
    setSelectedMessages(new Set());
  }, [Userselected]);

  // Format date and time
  const messageTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`chat ${fromMe ? "chat-end" : "chat-start"} `}>
      {/* Wrap everything inside a flex container for proper alignment */}
      <div className={`flex items-center mb-1 relative w-full ${fromMe ? "flex-row-reverse" : "flex-row"}`}>
        {/* Checkbox (conditionally rendered) */}
        {opencheckbox && (
          <input
            type="checkbox"
            className="cursor-pointer mb-1 "
            checked={selectedMessages.has(message._id)}
            onChange={() => toggleSelection(message._id)}
          />
        )}

        {/* Avatar Image */}
        <div className="chat-image avatar mb-6">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img alt="Profile" src={profilePic} className="object-cover w-full h-full" />
          </div>
        </div>

        {/* Message Content (Bubble + Footer) */}
        <div className="flex flex-col">
          {/* Message Bubble */}
          <div
            className={`chat-bubble  text-white ${bubbleColor} break-words max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl whitespace-pre-wrap ${
              selectedMessages.has(message._id) ? "bg-opacity-80 ring-3 ring-[rgb(247,174,30)]" : ""
            }`}
          >
            {message.messageBody || "No message content"}
          </div>

          {/* Footer with timestamp - Keep inside the same flex column to avoid shifting */}
          <div className="chat-footer opacity-50 text-xs flex justify-end">
            {messageTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
