import Logoicon from "@mui/icons-material/WhatsApp";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import { MultiAvatars } from "../assets/utilityComponents/MultiAvatars";
import DuoIcon from "@mui/icons-material/Duo";
import CallIcon from "@mui/icons-material/Call";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { motion } from "framer-motion";
import MessageInput from "../assets/utilityComponents/messageBox";
import MessageContainer from "../assets/utilityComponents/MessageContainer";
import { useRef, useState, useEffect, useContext } from "react";
import Sidebar from "../assets/utilityComponents/Sidebar";
import SimpleDialogDemo from "../assets/utilityComponents/DialogBox";
import ViewListIcon from "@mui/icons-material/ViewList";
import axios from "axios";
import { useSelector } from "react-redux";
import Spinner from "../assets/utilityComponents/Spinner";
import { SidebarContext } from "../Context/SideBarContext";
import MessagesBar from "../assets/utilityComponents/MessagesBar";
import SettingsBar from "../assets/utilityComponents/SettingsBar";
import DashBoardBar from "../assets/utilityComponents/DashBoardBar";
import CallsBar from "../assets/utilityComponents/CallsBar";
import FilesBar from "../assets/utilityComponents/FilesBar";
import { Button, Box } from "@mui/material";
import { MailOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import MessagesRequest from "../assets/utilityComponents/MessagesRequest";
const URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
    const { SideBarselected ,Userselected} = useContext(SidebarContext);
    const switcher = useRef();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSearch, setSelectedSearch] = useState("Pankaj Nunnu");
    const { user } = useSelector((state) => state.userReducer);
    const [users, setUsers] = useState([]);
    const [showLoginPopup, setShowLoginPopup] = useState(false);

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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        if (e.key === "Enter") {
            setSearchOpen(false);
        }
    };

    const clickSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <>
            {!user ? (
                <>
                    
                    {!showLoginPopup?(<Spinner />) : (
                        <motion.div
                            className="fixed top-1/3 left-1/2 transform -translate-x-1/2 bg-[#f43098] text-white p-4 rounded-lg shadow-lg"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            Please <Link to={"/login"} className="underline hover:text-[#301b25]">login</Link>. You are not logged in.
                        </motion.div>
                    )}
                </>
            ) : (
                <>
                    <div className="w-full h-screen overflow-hidden font-mono" style={{ fontFamily: "Poppins" }}>
                        <div className="flex flex-row w-full h-16">
                            <div
                                className={`text-center ${
                                    sidebarOpen ? "w-1/5 p-4" : "w-1/15 p-5"
                                } flex ${sidebarOpen ? "justify-between" : "flex-col items-start"}`}
                                ref={switcher}
                            >
                                <Logoicon className="text-cyan-600 mx-3 hover:text-cyan-800 cursor-pointer" />
                                {sidebarOpen && <span>Mingle</span>}
                                <ViewListIcon className="text-cyan-600 mx-3 hover:text-cyan-800 cursor-pointer" onClick={clickSidebar} />
                            </div>

                            <div className="items-center text-center w-1/3 p-4 flex justify-between max-sm:hidden">
                                {!searchOpen && (
                                    <span className="text-xl font-extrabold flex-grow text-center truncate">
                                        {SideBarselected}
                                    </span>
                                )}
                                <div className="relative">
                                    {searchOpen ? (
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            onKeyDown={handleSearchSubmit}
                                            className="border border-gray-400 rounded px-2 py-1 focus:outline-none"
                                            placeholder="Search..."
                                        />
                                    ) : (
                                        <SearchIcon className="hover:text-cyan-600 cursor-pointer ml-4" onClick={() => setSearchOpen(true)} />
                                    )}
                                </div>
                                <MultiAvatars count={`+${user?.friends?.length}`} />
                            </div>
                               {/* //container to display the selected user */}
                            <div className="rounded-1xl text-center w-2/3 p-4 flex justify-between border-1 border-solid max-sm:h-full max-sm:w-full">
                               {Userselected?<img src={Userselected.avatar.url} className="rounded-full scale-130" alt="user avatar" /> : <Avatar className="text-cyan-600 cursor-pointer" />}
                                <span className="text-2xl text-cyan-600 font-bold font-sans hover:text-cyan-700">{Userselected?Userselected.firstname :selectedSearch}</span>
                                <div className="flex">
                                    <DuoIcon className="mt-1 hover:text-cyan-700 mx-1 cursor-pointer" />
                                    <CallIcon className="mt-1 hover:text-cyan-700 mx-1 cursor-pointer" />
                                    <SimpleDialogDemo />
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full h-[calc(100vh-4rem)]">
                            <Sidebar st={sidebarOpen} />

                            <div className="w-1/3 p-4 flex flex-wrap gap-2">
                                <div className="py-2 gap-2 w-full flex flex-col overflow-y-scroll scrollbar-hidden relative ">
                                    {SideBarselected === "Messages" && (
                                        <>
                                        <MessagesBar setSelectedSearch={setSelectedSearch} searchQuery={searchQuery} users={users} />
                                        <MessagesRequest/>
                                      </>
                                    )}
                                    {SideBarselected === "Settings" && <SettingsBar />}
                                    {SideBarselected === "Dashboard" && <DashBoardBar friend={users.user} />}
                                    {SideBarselected === "Calls" && <CallsBar />}
                                    {SideBarselected === "Files" && <FilesBar />}
                                </div>
                            </div>

                            <div className="w-2/3 p-4 flex flex-col justify-between max-sm:h-full max-sm:w-full">
                                <motion.div
                                    className="flex flex-col gap-2 overflow-y-scroll scrollbar-hidden"
                                    animate={{ y: [0, -100, 0] }}
                                    transition={{ ease: "easeInOut", duration: 0.5 }}
                                >
                                    <MessageContainer message={"hi what are u doing"} fromMe={true} />
                                    <MessageContainer message={"nothing"} fromMe={false} />
                                </motion.div>
                                <MessageInput />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Home;
