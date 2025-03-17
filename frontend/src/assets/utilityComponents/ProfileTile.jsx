import React from "react";

const ProfileTile = React.memo(({ user }) => {
  const isOnline = true;

  return (
    <div className="flex gap-2 items-center hover:bg-cyan-600 rounded-2xl p-2 py-1 cursor-pointer bg-cyan-700 max-sm:w-12 max-sm:rounded-full max-sm:bg-transparent">
      <div className="avatar">
        <div className={`w-12 rounded-full object-cover ${isOnline ? "online" : ""}`}>
          <img  src="https://avatar.iran.liara.run/public/46" alt="user avatar" />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex gap-3 justify-between">
          <p className="font-bold text-gray-200 max-sm:hidden">{user.firstname} </p>
        </div>
      </div>
    </div>
  );
});

export default ProfileTile;
