import * as React from 'react';
import PropTypes from 'prop-types';
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
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';

const options = ['Select Messages', 'Group Info', 'Leave Chat'];

export default function ThreeDotMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className='flex '>
      <IconButton onClick={handleClick} >
        <MoreVertIcon sx={{color:"black", scale: 1.5,  // Correct way to scale
    cursor: "pointer", // Enables pointer on hover
    "&:hover": {
      color: "blue", // Changes color on hover
    }}} />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{mt:2}}
      >
        <List sx={{ }}>
          {options.map((option) => (
            <ListItem disablePadding key={option}>
              <ListItemButton onClick={handleClose}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={option} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton onClick={handleClose}>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Add to Favourites" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}
