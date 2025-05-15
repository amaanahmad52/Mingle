import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Docs from '../../components/Chats/Docs';
import { MesssageContext } from '../../Context/MessageContext';

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

export default function BasicSpeedDial({ open, setOpen }) {
  const {
       docsOpen,
      setDocsOpen,
   
    } = React.useContext(MesssageContext);
    const inputRef = React.useRef(null);
 
    const [file, setFile] = React.useState(null);
  
    
  
    const handleFileChange = (e) => {
      const selected = e.target.files[0];
      if (selected) {
        setFile(selected);
        setDocsOpen(true);
      }
    };
  

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleIcon = (key,e) => {
    e.stopPropagation();
    console.log(key);
    if (key == 'Print') {
      inputRef.current.click();
    }
  };

  return (
    <>
     {docsOpen && file && (   <Docs  file={file} setfile={setFile}/>   )}

       <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          onClick={handleToggle}
          open={open}
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 10,
            zIndex: (theme) => theme.zIndex.drawer + 2
          }}
          icon={
            <SpeedDialIcon
              sx={{
                fontSize: 30,
                size: "small",
                marginBottom: "8px",
                "&:hover": { color: "#0891b2" }
              }}
            />
          }
          FabProps={{
            sx: {
              size: "small",
              bgcolor: "transparent",
              border: "none",
              boxShadow: "none",
              "&:hover": { bgcolor: "transparent" }
            }
          }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              onClick={(e) => handleIcon(action.name,e)}
              sx={{
                transform: "scale(0.8)",
                bgcolor: "#0891b2",
                "&:hover": { bgcolor: "cyan",cursor: "pointer" },
              cursor: "cursor-pointer"
              }}
            />
          ))}
        </SpeedDial>
      </Box>
    </>
  );
}
