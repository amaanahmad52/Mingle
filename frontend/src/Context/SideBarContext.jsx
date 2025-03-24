import { createContext,useState } from "react";
export const SidebarContext = createContext();

export const SidebarProvider = (props) => {
  const [SideBarselected, setSideBarSelected] = useState("Messages");
  
  const [Userselected, setUserSelected] = useState(null);
  return (
    <SidebarContext.Provider value={{SideBarselected,setSideBarSelected,Userselected,setUserSelected}}>
      {props.children}
    </SidebarContext.Provider>
  );
};
