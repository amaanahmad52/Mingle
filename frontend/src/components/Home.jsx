import Logoicon from "@mui/icons-material/WhatsApp";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import { MultiAvatars } from "../assets/utilityComponents/MultiAvatars";
import DuoIcon from "@mui/icons-material/Duo";
import CallIcon from "@mui/icons-material/Call";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { motion } from "framer-motion";
import MessageInput from "./Chats/messageBox";
import MessageContainer from "./Chats/MessageContainer";
import { useRef, useState, useEffect, useContext, use } from "react";
import Sidebar from "../assets/utilityComponents/Sidebar";
import SimpleDialogDemo from "./Chats/DialogBox";
import ViewListIcon from "@mui/icons-material/ViewList";
import axios from "axios";
import { useSelector } from "react-redux";
import Spinner from "../assets/utilityComponents/Spinner";
import { SidebarContext } from "../Context/SideBarContext";
import MessagesBar from "../components/Chats/MessagesBar";
import SettingsBar from "../assets/utilityComponents/SettingsBar";
import DashBoardBar from "../assets/utilityComponents/DashBoardBar";
import CallsBar from "../assets/utilityComponents/CallsBar";
import FilesBar from "../assets/utilityComponents/FilesBar";
import { Button, Box } from "@mui/material";
import { MailOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import ToggleBars from "../assets/utilityComponents/ToggleBars";
import RequestsBar from "../assets/utilityComponents/RequestsBar";
import { useDispatch } from "react-redux";
import { getAllMessagesAction, setMessages } from "../slices/MessagesSlice";
import Skeleton from "../assets/utilityComponents/Skeleton";
import TitleData from "../assets/utilityComponents/TitleData";
import mingle from "/sound/mingle.wav"
const URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  //const paymentuser=localStorage.getItem('receiver')

  const dispatch = useDispatch();
  const {
    SideBarselected,
    Userselected,
    setUserSelected,
    RequestUserselected,
    setRequestUserSelected,
  } = useContext(SidebarContext);
  const switcher = useRef();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("");
  const { user } = useSelector((state) => state.userReducer);
  const [users, setUsers] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [requestClick, setRequestClick] = useState(false);
  const { messages, successAll, loadingSend, successSend } = useSelector(
    (state) => state.messagesReducer
  );

  const clickSidebar = () => setSidebarOpen(!sidebarOpen);
const [audio] = useState(new Audio(mingle));
const playSound = () => {
  audio.currentTime = 0; // Reset audio to start
  audio.play();
};
  useEffect(() => {
    audio.load(); // Preload the audio when the component mounts
  }, [audio]);


  //to fetch all users from backend
  useEffect(() => { 

   
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${URL}/getalluser`, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        console.log("API Response:", response.data); // Debugging
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  //to show login message when user is not logged in
  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setShowLoginPopup(true);
      }, 10000);

      return () => clearTimeout(timer); // Cleanup on unmount or user login
    } else {
      
      setShowLoginPopup(false);
    }
  }, [user]);

  //handling search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      setSearchOpen(false);
    }
  };

  //to get messages between two users (MESSAGES)
  useEffect(() => {
    if (Userselected) {
      dispatch(getAllMessagesAction({ receiverId: Userselected._id }));
    }
  }, [Userselected, successSend]);

  //to scroll automatically to bottom of chat container
  const showLastMessageDiv = useRef();

  useEffect(() => {
    if (showLastMessageDiv.current) {
      showLastMessageDiv.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  //to get messages between two users (REQUESTS)
  useEffect(() => {
    if (RequestUserselected) {
      dispatch(getAllMessagesAction({ receiverId: RequestUserselected._id }));
    }
  }, [RequestUserselected, successSend]);

  let kon = RequestUserselected || Userselected;

  //to again switch to null messaegs when clicked on messages tab at bottom
  useEffect(() => {
    if (RequestUserselected) {
      setRequestUserSelected(null);
    }
    if (Userselected) {
      setUserSelected(null);
    }

    dispatch(setMessages([]));
  }, [requestClick]);

  //for date
  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  let previousDate = null;


  /// for search bar 

  const searchRef = useRef(null);

  // Function to handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);
/// 
  useEffect(() => {
    const storedUser = localStorage.getItem('receiver');
    if (storedUser) {
     
        setUserSelected(JSON.parse(storedUser));
        //if home render first time with out any payment then also this work thats why we need to remove it 
        localStorage.removeItem('receiver');
    
    }
  }, []);
  //.......................
  return (
    <>
      
      {!user ? (
        <>
          {!showLoginPopup ? (
            <Spinner />
          ) : (
            <motion.div
              className="fixed top-1/3 left-1/2 transform -translate-x-1/2 bg-[#f43098] text-white p-4 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              Please{" "}
              <Link to={"/login"} className="underline hover:text-[#301b25]">
                login
              </Link>
              . You are not logged in.
            </motion.div>
          )}
        </>
      ) : (
        <>
          <TitleData data={`Welcome ${user.firstname} to Mingle`} />
          <div
            className="w-full h-screen overflow-hidden font-mono"
            style={{ fontFamily: "Poppins" }}
          >
            <div className="flex flex-row w-full h-16">
              <div
                className={`text-center ${
                  sidebarOpen ? "w-1/5 p-4" : "w-1/15 p-5"
                } flex ${
                  sidebarOpen ? "justify-between" : "flex-col items-start"
                }`}
                ref={switcher}
              >
                <Logoicon className="text-cyan-600 mx-3 hover:text-cyan-800 cursor-pointer" />
                {sidebarOpen && <span>Mingle</span>}
                <ViewListIcon
                  className="text-cyan-600 mx-3 hover:text-cyan-800 cursor-pointer"
                  onClick={clickSidebar}
                />
              </div>

              <div className="items-center text-center w-1/3 p-4 flex justify-between max-sm:hidden">
                {!searchOpen &&
                  (requestClick ? (
                    <span className="text-xl font-extrabold flex-grow text-center truncate">
                      Requests
                    </span>
                  ) : (
                    <span className="text-xl font-extrabold flex-grow text-center truncate">
                      {SideBarselected}
                    </span>
                  ))}

                <div className="relative" ref={searchRef}>
                  {searchOpen ? (
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onKeyDown={handleSearchSubmit}
                      className="border border-gray-400 rounded px-2 py-1 focus:outline-none"
                      placeholder="Search..."
                    />
                  ) : 
                  (
                    SideBarselected === "Messages" && (
                      <SearchIcon
                        className="hover:text-cyan-600 cursor-pointer ml-4"
                        onClick={() => setSearchOpen(true)}
                      />
                    )
                  )
                    
                  }
                </div>
                <MultiAvatars count={`+${user?.friends?.length}`} />
              </div>

              {/* navbar of chatbox */}
              {/* Navbar of chatbox */}
              <div className="rounded-1xl text-center w-2/3 p-4 flex justify-between border-b border-gray-400 mx-4 max-sm:h-full max-sm:w-full items-center">
                {kon && (
                  <div className="flex items-center gap-3">
                    <img
                      src={kon.avatar?.url || "https://i.pravatar.cc/200"}
                      className="w-12 h-12 object-cover rounded-full"
                      alt="user avatar"
                    />
                    <span
                      className={`text-xl text-cyan-600 font-bold font-sans hover:text-cyan-700`}
                    >
                      {kon.firstname}
                    </span>
                  </div>
                )}
                <div className={`${!kon ? "hidden" : "flex"} items-center`}>
                  <DuoIcon className="mt-1 hover:text-cyan-700 mx-1 cursor-pointer" />
                  <CallIcon className="mt-1 hover:text-cyan-700 mx-1 cursor-pointer" />
                  <SimpleDialogDemo id={kon?._id} />
                </div>
              </div>
            </div>

            <div className="flex w-full h-[calc(100vh-4rem)]">
              <Sidebar st={sidebarOpen} />

              <div className="w-1/3 p-4 flex flex-wrap gap-2">
                <div className="py-2 gap-2 w-full flex flex-col overflow-y-scroll scrollbar-hidden relative ">
                  {SideBarselected === "Messages" && (
                    <>
                      {!requestClick ? (
                        <MessagesBar
                          setSelectedSearch={setSelectedSearch}
                          searchQuery={searchQuery}
                          users={users}
                        />
                      ) : (
                        <RequestsBar allusers={users.user} />
                      )}

                      <ToggleBars
                        setClick={setRequestClick}
                        requestClick={requestClick}
                      />
                    </>
                  )}
                  {SideBarselected === "Settings" && <SettingsBar />}
                  {SideBarselected === "Dashboard" && (
                    <DashBoardBar friend={users.user} />
                  )}
                  {SideBarselected === "Calls" && <CallsBar />}
                  {SideBarselected === "Files" && <FilesBar />}
                </div>
              </div>

              <div className="w-2/3 p-4 flex flex-col justify-between max-sm:h-full max-sm:w-full">
                {!kon ? (
                  <div className="flex flex-col justify-center items-center h-full p-40">
                    <h1 className="text-3xl font-semibold text-center text-gray-300">
                      Start Messaging Now
                    </h1>
                  </div>
                ) : !successAll ? (
                  <div className="w-full h-screen flex items-center justify-center">
                    <Skeleton />
                  </div>
                ) : (
                  <>
                    <motion.div className="flex flex-col gap-2 overflow-y-scroll scrollbar-hidden">
                      {!messages?.length ? (
                        <div className="flex flex-col justify-center items-center h-full p-40">
                          <h1 className="text-3xl font-semibold text-center text-gray-300 ">
                            No message content
                          </h1>
                        </div>
                      ) : (
                        messages.map((m, index) => {
                          let messageDate = new Date(m.createdAt).setHours(0, 0, 0, 0);
                          let shouldShowDate = previousDate === null || messageDate > previousDate;
          
                          previousDate = messageDate; // Update for next iteration
          
                          return (
                              <div key={index} ref={showLastMessageDiv}>
                                  {shouldShowDate && (
                                      <div className="text-center text-gray-500 text-xs my-2">
                                          {getFormattedDate(m.createdAt)}
                                      </div>
                                  )}
                                  <MessageContainer message={m} user={user} />
                              </div>
                          );
                        })
                      )}
                    </motion.div>
                    <MessageInput />
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
