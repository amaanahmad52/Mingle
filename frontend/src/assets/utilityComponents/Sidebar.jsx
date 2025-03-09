

import CallIcon from '@mui/icons-material/Call';

import DashboardIcon from '@mui/icons-material/Dashboard';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Me from '@mui/icons-material/Person2';

import { motion } from "framer-motion"; // Correct import



const Sidebar = () => {
    return (
        <div className="flex flex-col w-1/5 border-2 p-4 border-solid h-full justify-around max-md:hidden">
        {/* Motion applied to all sidebar items */}
        <motion.div
            className="flex items-center gap-x-2 cursor-pointer hover:text-cyan-700 p-2 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <DashboardIcon className="text-cyan-600 mx-2" />
            <span>Dashboard</span>
        </motion.div>

        <motion.div
            className="flex items-center gap-x-2 cursor-pointer hover:text-cyan-700 p-2 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <InsertDriveFileIcon className="text-cyan-600 mx-2" />
            <span>Files</span>
        </motion.div>

        <motion.div
            className="flex items-center gap-x-2 cursor-pointer hover:text-cyan-700 p-2 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <MessageIcon className="text-cyan-600 mx-2" />
            <span>Messages</span>
        </motion.div>

        <motion.div
            className="flex items-center gap-x-2 cursor-pointer hover:text-cyan-700 p-2 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <CallIcon className="text-cyan-600 mx-2" />
            <span>Call</span>
        </motion.div>

        <motion.div
            className="flex items-center gap-x-2 cursor-pointer hover:text-cyan-700 p-2 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <SettingsIcon className="text-cyan-600 mx-2" />
            <span>Settings</span>
        </motion.div>

        < div className='flex justify-between'>

        <motion.div
            className="flex justify-between gap-x-2 cursor-pointer hover:text-cyan-700 p-2 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            >
           
            <Me/>
            
        </motion.div>
        <motion.div
            className="flex  gap-x-2 cursor-pointer hover:text-cyan-700 p-2 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            >
           
           <LogoutIcon/> 
        </motion.div>
        </div>

        
    </div>
    )
}

export default Sidebar