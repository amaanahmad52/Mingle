import React, { useContext } from 'react';


const Message = ({ message,fromMe}) => {
 const avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
 const hisAvatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//   const fromMe = true;
  const chatClass = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? avatar : hisAvatar;
  const bubbleColor = fromMe ? 'bg-blue-500' : 'bg-gray-500';

  return (
    <div className={`chat ${chatClass}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Profile" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleColor}`}>
        {message || 'No message content'}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {new Date(Date.now()).toLocaleTimeString()} {/* Format the timestamp */}
      </div>
    </div>
  );
};

export default Message;
