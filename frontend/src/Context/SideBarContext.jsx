import { createContext,useState } from "react";
export const SidebarContext = createContext();

export const SidebarProvider = (props) => {
  const [SideBarselected, setSideBarSelected] = useState("Messages");
  
  
  return (
    <SidebarContext.Provider value={{SideBarselected,setSideBarSelected}}>
      {props.children}
    </SidebarContext.Provider>
  );
};
