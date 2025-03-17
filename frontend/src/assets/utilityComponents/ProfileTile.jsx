import React from 'react';

const ProfileTile = React.memo(({ user}) => {
  const isOnline = true;

  return (
    <>
      <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer bg-blue-400">
        <div className={`avatar${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src={
                
                   "https://avatar.iran.liara.run/public/46"
              }
              alt="user avatar"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{user.firstname}</p>
            {/* <span className='text-xl'>{emoji}</span> */}
          </div>
        </div>
      </div>

      {/* {!lastIndex && <div className={'divider h-1 my-0 py-0'} />} */}
    </>
  );
});

export default ProfileTile;
