import React, { useEffect, useState,useRef } from "react"; 
import SendIcon from "@mui/icons-material/Send";
import PendingIcon from "@mui/icons-material/Pending";
import EmojiIcon from "@mui/icons-material/SentimentVerySatisfied";
import BasicSpeedDial from "./SpeedDial";
import Backdrop from "@mui/material/Backdrop";
import { EmojiKeyboard } from "reactjs-emoji-keyboard";
import { AnimatePresence, motion } from "framer-motion";
import MicNoneIcon from '@mui/icons-material/MicNone';
import { useSpeechRecognition } from 'react-speech-recognition';
import SpeechRecognition from 'react-speech-recognition';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { useDispatch, useSelector } from "react-redux";
import { sendMessageAction } from "../../slices/MessagesSlice";
import { useContext } from "react";
import { SidebarContext } from "../../Context/SideBarContext";

const MessageInput = () => {
  const {loadingSend,successSend}=useSelector((state)=>state.messagesReducer)
  const dispatch=useDispatch()
  const [open, setOpen] = useState(false); // SpeedDial state
  const [open1, setOpen1] = useState(false); // Emoji picker state
  const [message, setMessage] = useState(""); // Input value state
  const [isListening, setIsListening] = useState(false); // Microphone state
  const {Userselected}=useContext(SidebarContext);

  // Speech Recognition Hook
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  // Ensure Speech Recognition is supported
  if (!browserSupportsSpeechRecognition) {
    return <p>Speech Recognition is not supported in this browser.</p>;
  }

  // Toggle Speech Recognition
  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
      resetTranscript();
    } else {
      setMessage(""); // Clears input only when restarting listening
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
      setIsListening(true);
    }
  };
  
  

  // Update message when transcript changes
  useEffect(() => {
    if (transcript) {
      setMessage(transcript); // Continuously update message field
    }
  }, [transcript,isListening]);

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.character); // Append emoji to input
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    dispatch(sendMessageAction({messageBody:message,receiverId:Userselected._id}))
    setMessage(""); // Clear input after sending message
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

      <form className="px-4 my-3" onSubmit={handleSendMessage} >
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

          {/* Input Box */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="pl-16 pr-19 border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white truncate"
            placeholder="Send a message"
          />

          {/* Send Button */}
          <button
            
            type="submit" 
            className="absolute inset-y-0 end-0 flex items-center pe-3 transition duration-150 ease-in-out hover:scale-110 cursor-pointer hover:text-cyan-600"
          >
            {loadingSend ? <PendingIcon /> : <SendIcon />}
          </button>

          {/* Microphone Button */}
          <button
            type="button"
            onClick={toggleListening}
            className="absolute inset-y-0 end-8 flex items-center pe-3 transition duration-150 ease-in-out hover:scale-110 cursor-pointer hover:text-cyan-600"
            
          >
            {!isListening?(<MicNoneIcon />):(<SettingsVoiceIcon className="text-orange-800 text-blink" />)}
          </button>

          {/* SpeedDial Positioned Absolutely */}
          <div className="absolute bottom-1/8 ml-20 bg-transparent">
            <BasicSpeedDial open={open} setOpen={setOpen} />
          </div>
        </div>
      </form>
     
      
    </>
  );
};

export default MessageInput;
