import React from "react";

const ProfileTile = ({ user, onClick, imageUrl }) => {
  const isOnline = true;

  return (
    <div 
      className="flex gap-2 items-center hover:bg-cyan-600 rounded-2xl p-2 py-1 cursor-pointer bg-cyan-700 max-sm:w-12 max-sm:rounded-full max-sm:bg-transparent"
      onClick={onClick}
    >
      <div className="avatar">
        <div className={`w-12 rounded-full object-cover ${isOnline ? "online" : ""}`}>
          <img 
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

export default ProfileTile;

