import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import Backdrop from '@mui/material/Backdrop';
import { Typography } from '@mui/material';

const options = ['Remove image', 'View image', 'Change image'];

export default function ThreeDotMenu({handleclick,r,sr}) {
  
  const open = Boolean(r);

  const handleClick = (event) => sr(event.currentTarget);
  const handleClose = () => sr(null);

  return (
    <div className="flex">
     
      {/* Backdrop */}
      <Backdrop
        open={open}
        onClick={handleClose}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer - 1,
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      />

      {/* Popover */}
      <Popover
        open={open}
        anchorEl={r}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top: 100", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "top" }}
        sx={{
          mt: 2,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          "& .MuiPaper-root": {
            backgroundColor: "transparent", // Transparent background
            boxShadow: "none",
            backdropFilter: "blur(10px)", // Adds a frosted glass effect
            
          },


          
        }}
      >
        <List>
          {options.map((option) => (
            <ListItem disablePadding key={option}>
              <ListItemButton onClick={handleClose}>
                
              
                <Typography 
                sx={{ 
                    color: "rgb(244, 87, 168)", 
                    fontSize: "17px",
                    //  fontWeight: "bold",
                    "&:hover": { color: "rgb(244, 48, 152)" } 
                }}
                >
                {option}
                </Typography>
            
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </div>
  );
}

