import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Help from "@mui/icons-material/Info";
import ThreeDotMenu from "./Modal";
import { useDispatch } from "react-redux";
import { LogoutAction } from "../../slices/UserSlices";
import { useNavigate } from "react-router-dom";
const SettingsBar = () => {
    const [nameUpdate, setNameUpdate] = useState(false);
    const [aboutUpdate, setAboutUpdate] = useState(false);
    const about = "Can't talk, Text only!";
    const { user } = useSelector((s) => s.userReducer);
    const [updatedName, setUpdatedName] = useState(user.firstname);
    const [updatedAbout, setUpdatedAbout] = useState(about);
    const[profilePicModal, setProfilePicModal] = useState(false);
    const [reference, setReference] = useState(null);
    const dispatch = useDispatch();
    const nav=useNavigate();

    const{logoutdone}=useSelector(state=>state.userReducer)

    const handleNameUpdate = () => {
        setNameUpdate(!nameUpdate);
    };

    const handleAboutUpdate = () => {
        setAboutUpdate(!aboutUpdate);
    };

    const handleNameDone = (e) => {
        setNameUpdate(false);
        setUpdatedName(e.target.value);
        // dispatch action
    };

    const handleAboutDone = (e) => {
        setAboutUpdate(false);
        setUpdatedAbout(e.target.value);
        // dispatch action
    };
    
    const handleprofilePicDone = (e) => {
        setProfilePicModal(!profilePicModal);
       setReference(e.currentTarget);
        // dispatch action
    };

    const handleLogout = () => {
        // dispatch action
        dispatch(LogoutAction());
        
    };

    // useEffect(() => {
    //     if (logoutdone) {
    //         nav('/login')
    //     }
    // }, [logoutdone, nav]);
    
    return (
        <>
            
            {!user ? (
                <Spinner />
            ) : (
                
                <div className="flex flex-col space-y-3 text-sm overflow-hidden">
                    {/* Profile Image with Edit Icon */}
                    <div className="relative w-27 h-27 rounded-full overflow-hidden flex justify-center items-center mx-4 group">
                        {/* Profile Image */}
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            alt="Profile"
                            className="w-full h-full object-cover transition duration-300 group-hover:blur-sm"
                            onClick={handleprofilePicDone}
                        />
                        {/* Edit Icon */}
                        <EditIcon
                            className="cursor-pointer absolute text-[#f457a8] hover:text-[#f43098] opacity-0 group-hover:opacity-100 transition duration-300"
                            onMouseEnter={(e) => e.currentTarget.previousSibling.classList.add("blur-sm")}
                            onMouseLeave={(e) => e.currentTarget.previousSibling.classList.remove("blur-sm")}
                            onClick={handleprofilePicDone}
                        />
                            <ThreeDotMenu handleclick={profilePicModal} r={reference} sr={setReference}/>
                    </div>

                    <div className="flex flex-col my-2 space-y-3">
                        {/* Name Section */}
                        <div className="flex items-center w-full ml-4">
                            {nameUpdate ? (
                                <div className="flex w-full items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder={user.firstname}
                                        value={updatedName}
                                        onChange={(e) => setUpdatedName(e.target.value)}
                                        className="p-1 border-2 border-gray-300 rounded w-2/3 shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition"
                                    />
                                    <TaskAltIcon
                                        className="cursor-pointer text-[#f457a8] hover:text-[#f43098] scale-70"
                                        onClick={handleNameDone}
                                    />
                                </div>
                            ) : (
                                <div className="flex justify-between items-center w-full">
                                    <p className="font-bold text-gray-200 truncate">{user.firstname}</p>
                                    <EditIcon
                                        onClick={handleNameUpdate}
                                        className="cursor-pointer text-[#f457a8] hover:text-[#f43098] mr-4 scale-70"
                                    />
                                </div>
                            )}
                        </div>

                        {/* About Section */}
                        <div className="flex items-center w-full ml-4">
                            {aboutUpdate ? (
                                <div className="flex w-full items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder={about}
                                        value={updatedAbout}
                                        onChange={(e) => setUpdatedAbout(e.target.value)}
                                        className="p-1 border-2 border-gray-300 rounded w-2/3 shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition"
                                    />
                                    <TaskAltIcon
                                        className="cursor-pointer text-[#f457a8] hover:text-[#f43098] scale-70"
                                        onClick={handleAboutDone}
                                    />
                                </div>
                            ) : (
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex flex-col w-2/3">
                                        <p className="text-gray-400">About</p>
                                        <p className="text-gray-200 truncate">{about}</p>
                                    </div>
                                    <EditIcon
                                        onClick={handleAboutUpdate}
                                        className="cursor-pointer text-[#f457a8] hover:text-[#f43098] mr-4 scale-70"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Phone Section */}
                        <div className="ml-4">
                            <p className="text-gray-400 flex-1 truncate">Phone number</p>
                            <p className="text-gray-200 flex-1 truncate">{user.phoneNumber}</p>
                        </div>

                        <hr className="my-4 border-t border-gray-600 ml-4" />
                        <div className="flex justify-start ml-4">
                            <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
                        </div>
                        <p className="ml-4 text-xs text-gray-400">
                            Chat History on this computer will be erased when you log out.
                        </p>
                        <Help className="ml-4 text-gray-400 cursor-pointer hover:text-[#f43098]" />
                    </div>
                </div>
            )}
        </>
    );
};

export default SettingsBar;
