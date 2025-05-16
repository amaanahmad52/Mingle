import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import ProfileTile from './ProfileTile';
import { useContext } from 'react';
import { MesssageContext } from '../../Context/MessageContext';
import{ ForwardMultipleMessagesAction } from '../../slices/MessagesSlice'

const ForwardButton = ({ onClose, users }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [selectedNames, setSelectedNames] = useState(new Set());
  const { user } = useSelector((state) => state.userReducer);
const { selectedMessages, setSelectedMessages } = useContext(MesssageContext);
const dispatch=useDispatch()
  // Toggle selection on checkbox click
  const handleToggle = (userId,username) => {
    setSelectedUsers((prevSelected) => {
      const newSelected = new Set(prevSelected); 
      // Create a new Set from the previous state
      const newNames = new Set(selectedNames);
      if (newSelected.has(userId)) {
        newNames.delete(username)
        newSelected.delete(userId); // Remove the user if already selected
      } else {
        newSelected.add(userId);
         // Add the user if not already selected
         newNames.add(username)
      }

      setSelectedNames(newNames)
      return newSelected;
    });
  };
  console.log("ffffff",selectedMessages)
  console.log("user",selectedUsers)
  const handleforward=()=>{
     dispatch(ForwardMultipleMessagesAction({receiverIds:Array.from(selectedUsers),messageIds:Array.from(selectedMessages)}))
setSelectedMessages(new Set())
    onClose()
  }

  return (
    <>
      <div className="fixed h-screen w-screen inset-0 bg-black/40 flex justify-center items-center">
        <div className="flex flex-col m-0 justify-center rounded-2xl bg-blue-50 items-center w-[30vw] h-[80vh]">
          <div className="w-full flex items-center px-2">
            <span onClick={onClose} className='p-2 cursor-pointer'>X</span>
            <span className="text-sm p-2 font-bold text-black">Forward message to</span>
          </div>

          <div className="flex items-center bg-gray-200 rounded-2xl w-full h-12 px-2 my-2">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow outline-none p-1 bg-transparent"
            />
          </div>

          <div className='h-[60vh] w-full overflow-auto'>
            {users?.user
              ?.filter((item) => {
                return searchQuery.trim() === ""
                  ? item
                  : item.firstname.toLowerCase().startsWith(searchQuery.toLowerCase());
              })
              .map((u, index) =>
                user.friends?.includes(u._id) ? (
                  <div 
                    key={u._id}
                    className="flex items-center p-2 bg-white"
                  >
                    <Checkbox
                      checked={selectedUsers.has(u._id)}
                      onChange={() => handleToggle(u._id,u.firstname)}
                      className="p-1"
                    />
                    <div className='w-full'>
                    <ProfileTile
                      user={u}
                      imageUrl={u.avatar.url}
                    />
                    </div>
                  </div>
                ) : u?.email === user?.email ? (
                  <div 
                    key={u._id}
                    className="flex items-center   flex-row justify-between p-2 bg-white hover:bg-gray-100 border-b"
                  >
                    <Checkbox
                      checked={selectedUsers.has(u._id)}
                      onChange={() => handleToggle(u._id,u.firstname)}
                      className="p-1"
                    />
                    <div className='w-full'>
                    <ProfileTile
                      user={"you"}
                      imageUrl={u.avatar.url}
                    />
                    </div>
                  </div>
                ) : null
              )}
          </div>

          <div onClick={onClose} className="bg-gray-300 h-12 relative text-black rounded-sm w-full py-2">
          <div className="w-2/3 overflow-auto p-2 text-center text-gray-700">
             {Array.from(selectedNames).join(', ') || "None"}
          </div>
            <div onClick={handleforward} className='absolute cursor-pointer mr-1 right-0 bottom-2 w-9 h-9 bg-cyan-600 rounded-full flex items-center justify-center'>
              <SendIcon className='text-white' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForwardButton;
