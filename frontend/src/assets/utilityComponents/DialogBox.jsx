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

const options = ['Select Messages', 'Clear Chat', 'User Profile'];

export default function ThreeDotMenu() {
  const [reference, setReference] = React.useState(null);
  const open = Boolean(reference);

  const handleClick = (event) => setReference(event.currentTarget);
  const handleClose = () => setReference(null);

  return (
    <div className="flex">
      <IconButton onClick={handleClick}>
        <MoreVertIcon
          sx={{
            color: "white",
            scale: 1.2,
            cursor: "pointer",
            "&:hover": { color: "cyan" },
          }}
        />
      </IconButton>

      {/* Backdrop */}
      <Backdrop
        open={open}
        onClick={handleClose}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer - 1,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      />

      {/* Popover */}
      <Popover
  open={open}
  anchorEl={reference}
  onClose={handleClose}
  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
  transformOrigin={{ vertical: "top", horizontal: "right" }}
  sx={{
    mt: 2,
    zIndex: (theme) => theme.zIndex.drawer + 1,
    "& .MuiPaper-root": {
      backgroundColor: "transparent", // Transparent background
      boxShadow: "none",
      backdropFilter: "blur(10px)", // Adds a frosted glass effect
      borderRadius: "12px", // Rounded border for the outer popover
      // border: "2px solid rgba(247,174,30, 0.5)", // Optional border
      padding: "5px",
    },
  }}
>

        <List>
          {options.map((option) => (
            <ListItem disablePadding key={option}>
              <ListItemButton onClick={handleClose}>
                
                <ListItemText 
                   // Deep cyan text
                  primary={<Typography sx={{ color: "rgb(247,174,30)",":hover":{color:"rgb(246,146,19)"},fontSize:"17px"}}>{option}</Typography>} 
                   // Deep cyan text
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </div>
  );
}

