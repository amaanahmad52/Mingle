import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { makeStyles } from "@mui/material/styles";

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

export default function BasicSpeedDial({open, setOpen}) {
  const handleToggle = () => setOpen(!open);
  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1}}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        onClick={handleToggle}
      open={open}
        sx={{ position: 'absolute', bottom: 0, right: 10,zIndex: (theme) => theme.zIndex.drawer + 2}}
        icon={<SpeedDialIcon sx={{ fontSize: 30 ,size:"small", marginBottom: "8px","&:hover":{color:"#0891b2"}}} />} // Reduce main icon size
        FabProps={{sx:{size:"small", bgcolor:"transparent", border:"none", boxShadow:"none", "&:hover":{bgcolor:"transparent"}}}}
         // Reduce SpeedDial button size
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            sx={{ transform: "scale(0.8)" , bgcolor:" #0891b2", "&:hover":{bgcolor:"cyan"}}} // Reduce action icons size
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
