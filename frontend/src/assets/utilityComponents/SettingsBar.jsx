import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Spinner from "./Spinner";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Help from "@mui/icons-material/Info";
import ThreeDotMenu from "./Modal";
import { LogoutAction, NameAboutUpdate, UpdateProfilePicAction } from "../../slices/UserSlices";
import{sendotpbysms} from '../../slices/authSlice'
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import VerifyIcon from '@mui/icons-material/CheckCircleOutline';
import VerifyPhone from "../../components/User/VerifyPhone";
import { AiFillDatabase } from "react-icons/ai";

const SettingsBar = () => {
    const [nameUpdate, setNameUpdate] = useState(false);
    const [aboutUpdate, setAboutUpdate] = useState(false);
    const [profilePicModal, setProfilePicModal] = useState(false);
    const [reference, setReference] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, logoutdone,loadingP } = useSelector((state) => state.userReducer,shallowEqual);
    const { isverify} = useSelector((state) => state.auth,shallowEqual);

    const [updatedFirstName, setUpdatedFirstName] = useState(user?.firstname || "");
    const [updatedLastName, setUpdatedLastName] = useState(user?.lastname || "");
    const [updatedAbout, setUpdatedAbout] = useState(user?.about || "");

    const[updatedProfilePic, setUpdatedProfilePic] = useState(user?.avatar?.url || "");
     
    useEffect(() => {
        if (logoutdone) {
            navigate("/login");
        }
    }, [logoutdone, navigate]);

    

    const handleNameUpdate = () => setNameUpdate(true);
    const handleAboutUpdate = () => setAboutUpdate(true);

    
    const handleLogout = () => {
        dispatch(LogoutAction());
    };
    
    const handleNameDone = () => {
        setNameUpdate(false);
        dispatch(NameAboutUpdate({ firstname: updatedFirstName, lastname: updatedLastName, about: user.about }));
    };
    
    const handleAboutDone = () => {
        setAboutUpdate(false);
        dispatch(NameAboutUpdate({ firstname: user.firstname, lastname: user.lastname, about: updatedAbout }));
    };
    
    const handleProfilePicDone = (e) => {
        setProfilePicModal(!profilePicModal);
        setReference(e.currentTarget);


    };

    const handlProfileRemove = (option) => {
        // console.log("Selected Option:", option);
        setUpdatedProfilePic(""); 
        dispatch(UpdateProfilePicAction({ avatar: "" })); // Update Redux state
        

        setProfilePicModal(false); // Close modal
    };

    const handleProfileFileChange = (option, file) => {
        if (!file) return;
    
        const reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onload = () => {
            const base64Image = reader.result;
            setUpdatedProfilePic(URL.createObjectURL(file));
            dispatch(UpdateProfilePicAction({ avatar: base64Image }));
            setProfilePicModal(false);
        };
    
        reader.onerror = (error) => {
            console.error("Error converting image to Base64:", error);
        };
    };
    
    //verify phone 
    //verify state
    const [verify, setverify] = useState(false);

    const handleVerifyPhone=()=>{
        setverify(true);
        //backend call for sms to get otp 
       
       dispatch(sendotpbysms({phoneNumber:user.phoneNumber}))
        //  navigate('verifyphone')

    }

    useEffect(() => {
        setUpdatedFirstName(user?.firstname || "");
        setUpdatedLastName(user?.lastname || "");
        setUpdatedAbout(user?.about || "");
        setUpdatedProfilePic(user?.avatar?.url || "");
        
        if (isverify)  {
            setverify(false); 
        }
       
    }, [user,isverify]);
    // console.log(user.isPhoneVerified);

    return (
        <>
            {!user ? (
                <Spinner />
            ) : (
                <div className="flex flex-col space-y-3 text-sm overflow-hidden">
                    {/* Profile Image with Edit Icon */}
                    <div className="relative w-27 h-27 rounded-full overflow-hidden flex justify-center items-center mx-4 group max-sm:w-20 max-sm:h-20">
                        {loadingP ? <CircularProgress color="secondary" /> :<img
                            src={user?.avatar?.url || "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"}
                            alt="Profile"
                            className="w-full h-full object-cover transition duration-300 group-hover:blur-sm"
                            onClick={handleProfilePicDone}
                        />}
                         
                        <EditIcon
                            className="cursor-pointer absolute text-[#f457a8] hover:text-[#f43098] opacity-0 group-hover:opacity-100 transition duration-300"
                            onClick={handleProfilePicDone}
                        />
                        {profilePicModal && (
                            <ThreeDotMenu 
                                r={reference} 
                                sr={setReference} 
                                handleOptionClick={handlProfileRemove} 
                                handleProfileFileChange={handleProfileFileChange}
                                user={user}
                            />
                        )}
                    </div>

                    <div className="flex flex-col my-2 space-y-3">
                        {/* Name Section */}
                        <div className="flex items-center w-full ml-4">
                            {nameUpdate ? (
                                <div className="flex w-full items-center gap-2">
                                    <input
                                        type="text"
                                        value={updatedFirstName}
                                        onChange={(e) => setUpdatedFirstName(e.target.value)}
                                        className="p-1 border-2 border-gray-300 rounded w-2/3 shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition"
                                    />
                                    <input
                                        type="text"
                                        value={updatedLastName}
                                        onChange={(e) => setUpdatedLastName(e.target.value)}
                                        className="p-1 border-2 border-gray-300 rounded w-2/3 shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition"
                                    />
                                    <TaskAltIcon
                                        className="cursor-pointer text-[#f457a8] hover:text-[#f43098] scale-70 mr-16 max-sm:mr-4"
                                        onClick={handleNameDone}
                                    />
                                </div>
                            ) : (
                                <div className="flex justify-between items-center w-full">
                                    <p className="font-bold text-gray-200 truncate">{`${user.firstname} ${user.lastname}`}</p>
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
                                        value={updatedAbout}
                                        onChange={(e) => setUpdatedAbout(e.target.value)}
                                        className="p-1 border-2 border-gray-300 rounded w-2/3 shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition"
                                    />
                                    <TaskAltIcon
                                        className="cursor-pointer text-[#f457a8] hover:text-[#f43098] scale-70 max-sm:mr-4"
                                        onClick={handleAboutDone}
                                    />
                                </div>
                            ) : (
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex flex-col w-2/3">
                                        <p className="text-gray-400">About</p>
                                        <p className="text-gray-200 truncate">{user.about}</p>
                                    </div>
                                    <EditIcon
                                        onClick={handleAboutUpdate}
                                        className="cursor-pointer text-[#f457a8] hover:text-[#f43098] mr-4 scale-70"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Phone Section */}
                        {verify && <VerifyPhone isOpen={verify} onClose={()=>{setverify(false)}}/>}
                        <div className="ml-4">
                            <p className="text-gray-400">Phone number</p>
                            <div className="flex  justify-between max-sm:flex-col ">
                                <p className="text-gray-200 text-sm">{user.phoneNumber}</p>

                                {user &&user.isPhoneVerified ? (
                                    <div className="flex flex-row-reverse items-center gap-2">
                                        <TaskAltIcon className="text-green-500 scale-[0.7]" />
                                        <p className="text-gray-400 text-sm">Verified</p>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={handleVerifyPhone} 
                                        className="btn btn-secondary text-sm ml-auto scale-60 h-2/3"
                                    >
                                        Verify Phone
                                    </button>
                                )}
                            </div>

                        </div>

                        <hr className="my-4 border-t border-gray-600 ml-4" />
                        <div className="flex justify-start ml-4">
                            <button onClick={handleLogout} className="btn btn-secondary">
                                Logout
                            </button>
                        </div>
                        <p className="ml-4 text-xs text-gray-400">
                            Chat history on this computer will be erased when you log out.
                        </p>
                        <Help className="ml-4 text-gray-400 cursor-pointer hover:text-[#f43098]" />
                    </div>
                </div>
            )}
        </>
    );
};

export default SettingsBar;
