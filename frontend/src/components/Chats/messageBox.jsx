import React, { useEffect, useState, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import PendingIcon from "@mui/icons-material/Pending";
import EmojiIcon from "@mui/icons-material/SentimentVerySatisfied";
import BasicSpeedDial from "../../assets/utilityComponents/SpeedDial";
import Backdrop from "@mui/material/Backdrop";
import { EmojiKeyboard } from "reactjs-emoji-keyboard";
import { AnimatePresence, motion } from "framer-motion";
import MicNoneIcon from "@mui/icons-material/MicNone";
import { useSpeechRecognition } from "react-speech-recognition";
import SpeechRecognition from "react-speech-recognition";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
import { useDispatch, useSelector } from "react-redux";
import {
  setMessages,
  sendMessageAction,
  clearMultipleMessagesAction,
} from "../../slices/MessagesSlice";
import { useContext } from "react";
import { SidebarContext } from "../../Context/SideBarContext";
import { MesssageContext } from "../../Context/MessageContext";
import sendsound from "../../assets/sound/sendsound.mp3";
import DeleteIcon from "@mui/icons-material/Delete";
import ForwardIcon from "@mui/icons-material/Forward";
import PaymentBox from "../Payments/PaymentBox";
const MessageInput = () => {
  const { opencheckbox, setopencheckbox } = useContext(MesssageContext);
  const { loadingSend, successSend, messages } = useSelector(
    (state) => state.messagesReducer
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false); // SpeedDial state
  const [open1, setOpen1] = useState(false); // Emoji picker state
  const [message, setMessage] = useState(""); // Input value state
  const [isListening, setIsListening] = useState(false); // Microphone state
  const { Userselected } = useContext(SidebarContext);
  const { selectedMessages, setSelectedMessages } = useContext(MesssageContext);

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
  }, [transcript, isListening]);

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.character); // Append emoji to input
  };
  const [audio] = useState(new Audio(sendsound));

  useEffect(() => {
    audio.load(); // Preload the audio when the component mounts
  }, [audio]);

  const playSound = () => {
    audio.currentTime = 0; // Reset audio to start
    audio.play();
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    playSound();
    dispatch(
      sendMessageAction({ messageBody: message, receiverId: Userselected._id })
    );
    setMessage(""); // Clear input after sending message
  };

  //...............deleting the selected user::
  const deleteMessages = () => {
    // Get the current messages from Redux which are going to be showed on frontend
    const updatedMessages = messages.filter(
      (msg) => !selectedMessages.has(msg._id)
    );

   
    dispatch(setMessages(updatedMessages)); //updade frintend state (redux)
    dispatch(
      clearMultipleMessagesAction({ //clear the rest of the messages that were selected
        receiverId: Userselected._id,
        messageIds: Array.from(selectedMessages),
      })
    );
         
    // Clear selected messages (of context)
    setSelectedMessages(new Set());

    setopencheckbox(false); //to turnoff the checkbox after deletion
  };

  useEffect(() => { //to close the chaeckbox of deletion when clicked on the other user
    setopencheckbox(false)
  }, [Userselected]);

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
      {opencheckbox ? (
        <div className="relative w-full">
        <div className="absolute bottom-0 left-0 w-full flex items-center justify-between bg-gray-700 border-gray-600 rounded-2xl p-2.5">
          <button
            className="bg-cyan-600 text-white px-2 py-1 rounded-lg hover:bg-cyan-700 cursor-pointer"
            onClick={() => setopencheckbox(false)}
          >
            Cancel
          </button>
          <div className="flex items-center gap-2 justify-around">
            <DeleteIcon
              onClick={deleteMessages}
              className="text-cyan-600 hover:text-cyan-700 cursor-pointer"
            />
            <ForwardIcon className="text-cyan-600 hover:text-cyan-700 cursor-pointer" />
          </div>
        </div>
      </div>
     
      ) : (
        <form className=" my-3" onSubmit={handleSendMessage}>
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
            <div className=" absolute inset-y-0 end-15 flex items-center pe-3 ">
              <PaymentBox/>
            </div>
            
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="pl-16 pr-25 border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white truncate"
              placeholder="Send a message"
            />

             {/* payment button */}
             
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
              {!isListening ? (
                <MicNoneIcon />
              ) : (
                <SettingsVoiceIcon className="text-orange-800 text-blink" />
              )}
            </button>

            {/* SpeedDial Positioned Absolutely */}
            
            <div className="absolute bottom-1/8 ml-20 bg-transparent">
              <BasicSpeedDial open={open} setOpen={setOpen} />
              
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default MessageInput;
