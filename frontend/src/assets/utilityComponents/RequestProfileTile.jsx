import React, { useContext } from "react";
import { SidebarContext } from "../../Context/SideBarContext";
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const RequestProfileTile = ({ user, onClick, imageUrl, requestClick }) => {
  const { RequestUserselected } = useContext(SidebarContext);
  const isUser = RequestUserselected && user._id === RequestUserselected._id;

  return (
    <div
      className={`flex gap-2 items-center hover:bg-cyan-600 rounded-2xl p-2 py-1 cursor-pointer 
        ${isUser ? "bg-[#f43098]" : "bg-cyan-700"} 
        max-sm:w-12 max-sm:rounded-full max-sm:bg-transparent`}
      onClick={onClick}
    >
      <div
        className={`avatar h-12 w-12 rounded-full ${isUser && "ring-4 ring-[rgb(244,179,49)]"}`}
      >
        <img
          className="scale-100 rounded-full"
          src={imageUrl}
          alt="user avatar"
          onError={(e) => {
            e.target.src = "https://i.pravatar.cc/100";
            console.log("Image failed to load:", imageUrl);
          }}
        />
      </div>

      <div className="flex flex-row w-2/3 gap-3 justify-between">
        <p className="font-bold text-gray-200 max-sm:hidden">
          {user !== "you" ? user.firstname : user}
        </p>

        {isUser && (
          <div className="flex flex-row justify-end gap-3">
            {/* Accept Button with Hover Tooltip */}
            <div className="relative group">
              <ThumbUpAltIcon 
                onClick={() => requestClick("Accept")} 
                className="text-white hover:text-[#f43098] cursor-pointer" 
              />
              <span className="absolute bottom-5 right-0 translate-x-3 w-max bg-transparent font-Poppins font-bold text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Accept
              </span>
            </div>

            {/* Reject Button with Hover Tooltip */}
            <div className="relative group">
              <ThumbDownAltIcon 
                onClick={() => requestClick("Reject")} 
                className="text-white hover:text-red-900 cursor-pointer" 
              />
              <span className="absolute bottom-5 right-0 translate-x-3 w-max bg-transparent font-Poppins font-bold text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Reject
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestProfileTile;
