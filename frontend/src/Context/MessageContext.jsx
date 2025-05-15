import { createContext,useState } from "react";
export const MesssageContext = createContext();

export const MessageProvider = (props) => {
    const [opencheckbox, setopencheckbox] = useState(false);
    const [docsOpen, setDocsOpen] = useState(false);
    const [selectedMessages, setSelectedMessages] = useState(new Set());
  return (
    <MesssageContext.Provider value={{opencheckbox,setopencheckbox,selectedMessages,setSelectedMessages,docsOpen,setDocsOpen}}>
      {props.children}
    </MesssageContext.Provider>
  );
};