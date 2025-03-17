import React, { useState } from "react"; 
import SendIcon from "@mui/icons-material/Send";
import PendingIcon from "@mui/icons-material/Pending";
import Emoji from "@mui/icons-material/SentimentVerySatisfied";
import BasicSpeedDial from "./SpeedDial";
import Backdrop from "@mui/material/Backdrop";

const MessageInput = () => {
  const success = false;
  const [open, setOpen] = useState(false); // State for Backdrop & SpeedDial

  return (
    <>
      {/* Backdrop covering the whole UI when SpeedDial is open */}
      <Backdrop
        open={open}
        onClick={() => setOpen(false)} // Clicking Backdrop closes SpeedDial
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: (theme) => theme.zIndex.drawer + 1, // Ensures it covers UI
          backgroundColor: "rgba(0, 0, 0, 0.4)", // Dim background effect
        }}
      />

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
             
          {/* SpeedDial Positioned Absolutely */}
          <div className="absolute bottom-1/8 left-20 bg-transparent">
            <BasicSpeedDial open={open} setOpen={setOpen} />
          </div>
        </div>
      </form>
    </>
  );
};

export default MessageInput;

