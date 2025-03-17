import CallIcon from '@mui/icons-material/Call';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Me from '@mui/icons-material/Person2';
import { motion } from "framer-motion";
import { useEffect, useRef } from 'react';

const Sidebar = ({st}) => {
    const switcher = useRef();

    useEffect(() => {
        if (!st) {
            switcher.current.classList.remove("w-1/5");
            switcher.current.classList.add("w-1/15", "items-center");
            switcher.current.querySelectorAll("span").forEach(span => span.remove());
        } else {
            switcher.current.classList.remove("w-1/15", "items-center");
            switcher.current.classList.add("w-1/5");
        }
    }, [st]);

    return (
        <div className={`flex flex-col border-0.5 p-4   border-t-0 h-full justify-around max-md:hidden transition-all duration-300`} ref={switcher}>
            <motion.div className="flex items-center gap-x-2 cursor-pointer hover:text-cyan-700 p-2 rounded-lg" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <DashboardIcon className="text-cyan-600 mx-2" />
                {st && <span>Dashboard</span>}
            </motion.div>

            <motion.div className="flex items-center gap-x-2 cursor-pointer hover:text-cyan-700 p-2 rounded-lg" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <InsertDriveFileIcon className="text-cyan-600 mx-2" />
                {st && <span>Files</span>}
            </motion.div>

            <motion.div className="flex items-center gap-x-2 cursor-pointer hover:text-cyan-700 p-2 rounded-lg" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <MessageIcon className="text-cyan-600 mx-2" />
                {st && <span>Messages</span>}
            </motion.div>

            <motion.div className="flex items-center gap-x-2 cursor-pointer hover:text-cyan-700 p-2 rounded-lg" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <CallIcon className="text-cyan-600 mx-2" />
                {st && <span>Call</span>}
            </motion.div>

            <motion.div className="flex items-center gap-x-2 cursor-pointer hover:text-cyan-700 p-2 rounded-lg" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <SettingsIcon className="text-cyan-600 mx-2" />
                {st && <span>Settings</span>}
            </motion.div>

            <div className='flex justify-between'>
                <motion.div className="flex justify-between gap-x-2 cursor-pointer hover:text-cyan-700 p-2 rounded-lg" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Me/>
                </motion.div>
                <motion.div className="flex gap-x-2 cursor-pointer hover:text-cyan-700 p-2 rounded-lg" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <LogoutIcon/> 
                </motion.div>
            </div>
        </div>
    );
};

export default Sidebar;
