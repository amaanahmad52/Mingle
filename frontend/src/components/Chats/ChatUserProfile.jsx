import { useState, useContext } from "react";
import { SidebarContext } from "../../Context/SideBarContext";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CallIcon from "@mui/icons-material/AddIcCall";

const ChatUserProfile = () => {
  const { Userselected } = useContext(SidebarContext);
  const [openImageModal, setOpenImageModal] = useState(false);

  return (
    <>
      <div className="flex flex-col space-y-3 text-sm overflow-hidden">
        {/* Profile Image */}
        <div
          className="relative w-27 h-27 rounded-full overflow-hidden flex justify-center items-center mx-auto group max-sm:w-20 max-sm:h-20 cursor-pointer"
          onClick={() => setOpenImageModal(true)}
        >
          <img
            src={
              Userselected.avatar.url ||
              "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
            }
            alt="Profile"
            className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
          />
        </div>

        {/* Video & Voice Call Icons */}
        <div className="flex flex-row justify-around">
          <div className="flex flex-col items-center space-y-2">
            <VideoCallIcon className="text-[#F7AE1E] text-5xl transition duration-300 hover:text-[#F69213] cursor-pointer scale-150" />
          </div>
          <div className="flex flex-col items-center space-y-2">
            <CallIcon className="text-[#F7AE1E] text-5xl transition duration-300 hover:text-[#F69213] cursor-pointer scale-140" />
          </div>
        </div>

        {/* Name Section */}
        <div className="flex items-center w-full justify-center">
          <p className="font-bold text-gray-200 truncate text-xl">
            {Userselected.firstname + " " + Userselected.lastname}
          </p>
        </div>

        {/* About Section */}
        <div className="flex justify-between items-center w-full ml-4">
          <div className="flex flex-col w-2/3">
            <p className="text-gray-400">About</p>
            <p className="text-gray-200 truncate">{Userselected.about}</p>
          </div>
        </div>

        {/* Phone Section */}
        <div className="ml-4">
          <p className="text-gray-400">Phone number</p>
          <div className="flex justify-between max-sm:flex-col">
            <p className="text-gray-200 text-sm">{Userselected.phoneNumber}</p>
          </div>
        </div>

        <hr className="my-4 border-t border-gray-600 ml-4" />

        <div className="flex justify-center ml-4">
          <button className="font-Poppins bg-[#F7AE1E] hover:bg-[#F69213] text-black border-none rounded-2xl text-xs px-4 py-2 transition duration-300 cursor-pointer">Block</button>
        </div>
      </div>

      {/* Modal for Enlarged Profile Image */}
      <Dialog
        open={openImageModal}
        onClose={() => setOpenImageModal(false)}
        maxWidth="lg"
        sx={{
            "& .MuiPaper-root": {
              background: "transparent",
              backdropFilter: "blur(10px)",
              borderRadius: "12px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.9)",
              //make size large
              width: "50%",
              height: "50%",
            },
          }}
      >
        <DialogContent className="p-0">
          <div className="flex justify-center items-center w-full h-full">
            <img
              src={
                Userselected.avatar.url ||
                "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
              }
              alt="Profile"
              className="w-full h-auto max-w-96 max-h-96"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatUserProfile;
