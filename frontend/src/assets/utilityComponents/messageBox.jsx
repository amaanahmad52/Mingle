import React, { useState } from "react"; 
import SendIcon from "@mui/icons-material/Send";
import PendingIcon from "@mui/icons-material/Pending";
import EmojiIcon from "@mui/icons-material/SentimentVerySatisfied";
import BasicSpeedDial from "./SpeedDial";
import Backdrop from "@mui/material/Backdrop";
import { EmojiKeyboard } from "reactjs-emoji-keyboard";
import {AnimatePresence,  motion } from "framer-motion";
const MessageInput = () => {
  const success = false;
  const [open, setOpen] = useState(false); // SpeedDial state
  const [open1, setOpen1] = useState(false); // Emoji picker state
  const [message, setMessage] = useState(""); // Input value state

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.character); // Append emoji to input
  };

  return (
    <>
      {/* Backdrop for closing Emoji Picker & SpeedDial */}
      {(open1 || open) && (
        <Backdrop
          open={true} 
          onClick={() => {
            setOpen1(false);
            setOpen(false);
          }}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Dim background effect
          }}
        />
      )}

      <form className="px-4 my-3">
        <div className="w-full relative">
          {/* Emoji Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen1(!open1);
            }}
            className="absolute inset-y-0 z-10 start-1 flex items-center pe-3 transition duration-150 ease-in-out hover:scale-110 cursor-pointer hover:text-cyan-600"
          >
            <EmojiIcon />
          </button>

          {/* Emoji Picker (Aligned with Input) */}
          {
            <AnimatePresence>
            {open1 && (
              <motion.div
                key="box"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-12 left-0 z-50 rounded-2xl overflow-hidden"
              >
                <EmojiKeyboard
                  height={200}
                  width={250}
                  theme="dark"
                  searchLabel="Search emoji"
                  searchDisabled={false}
                  onEmojiSelect={handleEmojiSelect}
                  categoryDisabled={false}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          }

          {/* Input Box */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="pl-16 border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
            placeholder="Send a message"
          />

          {/* Send Button */}
          <button
            type="submit" 
            className="absolute inset-y-0 end-0 flex items-center pe-3 transition duration-150 ease-in-out hover:scale-110 cursor-pointer hover:text-cyan-600"
          >
            {success ? <PendingIcon /> : <SendIcon />}
          </button>

          {/* SpeedDial Positioned Absolutely */}
          <div className="absolute bottom-1/8 ml-18 mb-1 bg-transparent ">
            <BasicSpeedDial open={open} setOpen={setOpen} />
          </div>
        </div>
      </form>
    </>
  );
};

export default MessageInput;

