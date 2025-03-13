
import Logoicon from '@mui/icons-material/WhatsApp';
import SearchIcon from '@mui/icons-material/Search';
import FaceIcon from '@mui/icons-material/Face';
import { MultiAvatars } from '../assets/utilityComponents/MultiAvatars';
import DuoIcon from '@mui/icons-material/Duo';
import CallIcon from '@mui/icons-material/Call';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import AttachmentIcon from '@mui/icons-material/Attachment';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import { motion } from "framer-motion"; // Correct import
import MessageInput from '../assets/utilityComponents/messageBox';
import Message from '../assets/utilityComponents/MessageContainer';
import MessageContainer from '../assets/utilityComponents/MessageContainer';
import { useState } from 'react';
import Sidebar from '../assets/utilityComponents/Sidebar';
import SimpleDialogDemo from '../assets/utilityComponents/DialogBox';



const Home = () => {
    const kya="Pankaj Nunnu"
    const [name,setName]=useState("Pankaj Nunnu")
    return (
        <>
            <div className="w-full h-screen overflow-hidden font-mono" style={{ fontFamily: 'Poppins' }}>
                <div className="flex flex-row w-full h-16 ">
                    <div className="rounded-1xl text-center w-1/5 p-4 border-2 border-solid flex justify-start max-md:hidden">
                        <Logoicon className="text-cyan-600 mx-3 hover:text-cyan-800 cursor-pointer" />
                        <span>Mingle</span>
                    </div>
                    <div className="items-center  text-center w-1/3 p-4 border-2 border-solid flex justify-between max-sm:hidden">
                        <span className=" text-xl font-extrabold max-md:text-sm max-sm:text-xs" >{`${kya}...`}</span>
                        <div>
                            <SearchIcon className="hover:text-cyan-600 cursor-pointer" onClick={() => alert("clicked search")} />
                        </div>
                        <MultiAvatars count={"+3"}/>
                    </div>
                    <div className="rounded-1xl text-center w-2/3 p-4 flex justify-between border-2 border-solid max-sm:h-full max-sm:w-full">
                        <FaceIcon className="text-cyan-600 cursor-pointer" />
                        <span>{name}</span>
                       
                        <div className='flex just '>
                            <DuoIcon className="hover:text-cyan-700 mx-1 cursor-pointer" />
                            <CallIcon className="hover:text-cyan-700 mx-1 cursor-pointer" />
                             <SimpleDialogDemo  />
                        </div>
                    </div>
                </div>

                {/* Main Content Wrapper */}
                <div className=" flex w-full h-[calc(100vh-4rem)]">
                    {/* Sidebar */}
                   <Sidebar/>

                    {/* Content Sections */}
                    <div className="w-1/3 border-2 text-center p-4 border-solid flex justify-center items-center max-sm:hidden">
                        sw
                    </div>


                    <div className="w-2/3 border-2 p-4 border-solid flex flex-col  justify-between max-sm:h-full max-sm:w-full">
                        
                        <motion.div className="flex flex-col gap-2 overflow-y-scroll scrollbar-hidden" animate={{ y: [0, -100, 0] }} transition={{ ease: "easeInOut", duration: 0.5 }}>
                            <MessageContainer message={"hi what are u doing"} fromMe={true}/>
                            <MessageContainer message={"nothing"} fromMe={false}/>
                            <MessageContainer message={"ohk"} fromMe={true}/>
                            <MessageContainer message={"i am now at home by the way"} fromMe={false}/>
                            <MessageContainer message={"ohk"} fromMe={true}/>
                            <MessageContainer message={"i am now at home by the way"} fromMe={false}/>
                            <MessageContainer message={"ohk"} fromMe={true}/>
                            <MessageContainer message={"i am now at home by the way"} fromMe={false}/>
                            <MessageContainer message={"ohk"} fromMe={true}/>
                            <MessageContainer message={"i am now at home by the way"} fromMe={false}/>
                            <MessageContainer message={"ohk"} fromMe={true}/>
                            <MessageContainer message={"i am now at home by the way"} fromMe={false}/>
                            <MessageContainer message={"ohk"} fromMe={true}/>
                            <MessageContainer message={"i am now at home by the way"} fromMe={false}/>
                            
                        </motion.div>
                        {/* CHAT BOX */}
                        <MessageInput/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;

