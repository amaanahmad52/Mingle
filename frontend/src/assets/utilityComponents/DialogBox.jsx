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
import AddIcon from '@mui/icons-material/Add';

import { blue } from '@mui/material/colors';



const options = ['Select Messages', 'Clear Chat', 'User Profile'];

export default function ThreeDotMenu() {

  const [reference, setReference] = React.useState(null);

  const handleClick = (event) => setReference(event.currentTarget);
  const handleClose = () => setReference(null);
 
  

  return (
    <div className='flex'>
      <IconButton onClick={handleClick}>
        <MoreVertIcon sx={{ color: "white", scale: 1.2, cursor: "pointer", "&:hover": { color: "cyan" } }} />
      </IconButton>
      
      <Popover
        open={Boolean(reference)}
        anchorEl={reference}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 2, zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <List>
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
        </List>
      </Popover>

      </div>
  );
}



