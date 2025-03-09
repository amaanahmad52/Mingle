import React from "react";
import SendIcon from "@mui/icons-material/Send";
import PendingIcon from "@mui/icons-material/Pending";
import Emoji from "@mui/icons-material/SentimentVerySatisfied";
import BasicSpeedDial from "./SpeedDial";

const MessageInput = () => {
  const success = false;

  return (
    <>
      <form className="px-4 my-3">
        <div className="w-full relative">
          {/* Emoji Button */}
          <button
            type="button"
            className="absolute inset-y-0 start-1 flex items-center pe-3 transition delay-150 duration-50 ease-in-out hover:scale-110 cursor-pointer hover:text-cyan-600"
          >
            <Emoji />
          </button>

          {/* Input Box */}
          <input
            type="text"
            className="pl-25 border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
            placeholder="Send a message"
          />

          {/* Send Button */}
          <button
            type="submit"
            className="absolute inset-y-0 end-0 flex items-center pe-3 transition delay-150 duration-50 ease-in-out hover:scale-110 cursor-pointer hover:text-cyan-600"
          >
            {success ? <PendingIcon /> : <SendIcon />}
          </button>

          {/* Speed Dial Positioned Absolutely */}
          <div className="absolute bottom-1/8  left-20 bg-transparent">
            <BasicSpeedDial />
          </div>
        </div>
      </form>
    </>
  );
};

export default MessageInput;
