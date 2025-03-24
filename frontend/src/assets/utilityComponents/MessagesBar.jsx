import { useSelector } from "react-redux";
import ProfileTile from "./ProfileTile";
import { useEffect, useContext } from "react";
import { SidebarContext } from "../../Context/SideBarContext";


const MessagesBar = ({ setSelectedSearch, searchQuery, users }) => {
  const { user, friendadded } = useSelector((state) => state.userReducer);
  const { setUserSelected } = useContext(SidebarContext);

  useEffect(() => {
    if (friendadded) {
      // setSelectedSearch("Pankaj Nunnu")
    }
  }, [friendadded]);

  const handleClick = (u) => {
    setUserSelected(u);
    setSelectedSearch(u.firstname);
  };

  return (
   
    <>
      {users?.user
        ?.filter((item) => {
          return searchQuery.trim() === ""
            ? item
            : item.firstname.toLowerCase().startsWith(searchQuery.toLowerCase());
        })
        .map((u, index) =>
          user.friends?.includes(u._id) ? (
            <ProfileTile
              key={index}
              user={u}
              onClick={() => handleClick(u)}
              imageUrl={"https://i.pravatar.cc/100"}
            />
          ) : u?.email === user?.email ? (
            <ProfileTile
              key={index}
              user={"you"}
              onClick={() => handleClick(u)}
              imageUrl={"https://i.pravatar.cc/100"}
            />
          ) : null
        )}

      {/* Button Wrapper */}
      
       
     </>
   
   
  );
};

export default MessagesBar;
