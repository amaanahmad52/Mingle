import { useSelector } from "react-redux";
import ProfileTile from "./ProfileTile";

const MessagesBar = ({setSelectedSearch,searchQuery,users}) => {
     const { user } = useSelector((state) => state.userReducer);
    return (
        <>
            {users?.user?.filter((item) => {
                    return searchQuery.trim() === '' ? item : item.firstname.toLowerCase().startsWith(searchQuery.toLowerCase());
                }).map((u, index) => (
                    (user.friends?.includes(u._id)) ? 
                        <ProfileTile key={index} user={u} onClick={() => setSelectedSearch(u.name)} /> 
                    : (u?.email === user?.email) ? 
                        <ProfileTile key={index} user={"you"} onClick={() => setSelectedSearch(u.name)} /> 
                    : null  
                ))}
        </>
    );
}

export default MessagesBar