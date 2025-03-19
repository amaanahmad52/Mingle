import Logoicon from '@mui/icons-material/WhatsApp';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import { MultiAvatars } from '../assets/utilityComponents/MultiAvatars';
import DuoIcon from '@mui/icons-material/Duo';
import CallIcon from '@mui/icons-material/Call';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { motion } from "framer-motion";
import MessageInput from '../assets/utilityComponents/messageBox';
import MessageContainer from '../assets/utilityComponents/MessageContainer';
import { useRef, useState ,useEffect} from 'react';
import Sidebar from '../assets/utilityComponents/Sidebar';
import SimpleDialogDemo from '../assets/utilityComponents/DialogBox';
import ViewListIcon from '@mui/icons-material/ViewList';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import axios from 'axios';
import ProfileTile from '../assets/utilityComponents/ProfileTile';
import { useSelector } from 'react-redux';
import Spinner from '../assets/utilityComponents/Spinner';
const URL = import.meta.env.VITE_BACKEND_URL;
const Home = () => {
    const switcher = useRef();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSearch, setSelectedSearch] = useState("Pankaj Nunnu");
   
  const { user } = useSelector((state) => state.userReducer);
    const [users, setUsers] = useState([]);
    

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${URL}/getalluser`, {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" }
                });
                console.log("API Response:", response.data); // Debugging
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);
      
   console.log(users.user);
    
    
    
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
        {!user?(
            <Spinner/>
        ):(<>
            <div className="w-full h-screen overflow-hidden font-mono" style={{ fontFamily: 'Poppins' }}>
                <div className="flex flex-row w-full h-16">
                    <div className={`text-center ${sidebarOpen ? "w-1/5 p-4" : "w-1/15 p-5"} flex ${sidebarOpen ? "justify-between" : "flex-col items-start"}`} ref={switcher}>
                        <Logoicon className="text-cyan-600 mx-3 hover:text-cyan-800 cursor-pointer" />
                        {sidebarOpen && <span>Mingle</span>}
                        <ViewListIcon className="text-cyan-600 mx-3 hover:text-cyan-800 cursor-pointer" onClick={clickSidebar} />
                    </div>
                    <div className="items-center text-center w-1/3 p-4 flex justify-between max-sm:hidden">
                        {!searchOpen && <span className="text-xl font-extrabold">{selectedSearch}</span>}
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
                                <SearchIcon className="hover:text-cyan-600 cursor-pointer" onClick={() => setSearchOpen(true)} />
                            )}
                          
                        </div>
                        <MultiAvatars count={`+${user?.friends?.length}`} />
                    </div>
                
    
                    <div className="rounded-1xl text-center w-2/3 p-4 flex justify-between border-1 border-solid max-sm:h-full max-sm:w-full">
                        <Avatar className="text-cyan-600 cursor-pointer" />
                        <span>{selectedSearch}</span>
                        <div className='flex'>
                            <DuoIcon className="hover:text-cyan-700 mx-1 cursor-pointer" />
                            <CallIcon className="hover:text-cyan-700 mx-1 cursor-pointer" />
                            <SimpleDialogDemo friend={users.user}/>
                        </div>
                    </div>
                </div>
                <div className="flex w-full h-[calc(100vh-4rem)]">
                    <Sidebar st={sidebarOpen} />
                    <div className="w-1/3 p-4 flex flex-wrap gap-2">
                    
                    <div className='py-2 gap-2 w-full flex flex-col overflow-auto'>
                        {users?.user?.filter((item) => {
                            return searchQuery.trim() === '' ? item : item.firstname.toLowerCase().startsWith(searchQuery.toLowerCase());
                        }).map((u, index) => (
                            (user.friends?.includes(u._id)) ? 
                                <ProfileTile key={index} user={u} onClick={() => setSelectedSearch(u.name)} /> 
                            : (u?.email === user?.email) ? 
                                <ProfileTile key={index} user={"you"} onClick={() => setSelectedSearch(u.name)} /> 
                            : null  
                        ))}
                    </div>
    
                    
                    </div>
                    <div className="w-2/3 p-4 flex flex-col justify-between max-sm:h-full max-sm:w-full">
                        <motion.div className="flex flex-col gap-2 overflow-y-scroll scrollbar-hidden" animate={{ y: [0, -100, 0] }} transition={{ ease: "easeInOut", duration: 0.5 }}>
                            <MessageContainer message={"hi what are u doing"} fromMe={true} />
                            <MessageContainer message={"nothing"} fromMe={false} />
                            <MessageContainer message={"ohk"} fromMe={true} />
                            <MessageContainer message={"i am now at home by the way"} fromMe={false} />
                        </motion.div>
                        <MessageInput />
                    </div>
                </div>
            </div>
            </>)}
        </>
    );
};

export default Home;


