import React from "react";
import { useContext } from "react";
import { SidebarContext } from "../../Context/SideBarContext";
const RequestProfileTile = ({user, onClick, imageUrl }) => {
  const isOnline = true;
  
  const { Userselected } = useContext(SidebarContext);
  const isUser=Userselected && user._id===Userselected._id?true:false
  // const isUser=false

  return (
    <div 
    className={isUser
      ? "flex gap-2 items-center hover:bg-cyan-600 rounded-2xl p-2 py-1 cursor-pointer bg-[#f43098] max-sm:w-12 max-sm:rounded-full max-sm:bg-transparent"
      : "flex gap-2 items-center hover:bg-cyan-600 rounded-2xl p-2 py-1 cursor-pointer bg-cyan-700 max-sm:w-12 max-sm:rounded-full max-sm:bg-transparent"
  }
      onClick={onClick}
    >
      <div className="avatar">
        <div className={`w-12 rounded-full object-cover ${isOnline ? "online" : ""}`}>
          <img 
            className="scale-100 rounded-full"
            
            src={imageUrl} 
            alt="user avatar"
            onError={(e) => { e.target.src = "https://i.pravatar.cc/100"; console.log("Image failed to load:", imageUrl); }}
          />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex gap-3 justify-between">
          <p className="font-bold text-gray-200 max-sm:hidden">
            {user !== "you" ? user.firstname : user}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequestProfileTile;

