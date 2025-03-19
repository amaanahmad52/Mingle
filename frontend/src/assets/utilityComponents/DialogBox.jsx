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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { blue } from '@mui/material/colors';
import { useDispatch, useSelector } from "react-redux";
import { AddToFriend } from "../../slices/UserSlices";


const options = ['Select Messages', 'Group Info', 'Leave Chat'];

export default function ThreeDotMenu({ friend }) {
  const { user } = useSelector((state) => state.userReducer);
const dispatch=useDispatch();
  const [reference, setReference] = React.useState(null);
  const [isopen, setIsopen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [filteredUsers, setFilteredUsers] = React.useState([]);
  const [inviteDialog, setInviteDialog] = React.useState(false);
  const [inviteNumber, setInviteNumber] = React.useState("");
  const [selectedUserId, setSelectedUserId] = React.useState(null);
  const handleClick = (event) => setReference(event.currentTarget);
  const handleClose = () => setReference(null);
  const handlefriend = () => {
    setReference(null);
    setIsopen(true);
  };
  const closeModal = () => {
    setIsopen(false);
    setSearch("");
    setFilteredUsers([]);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const results =  friend?.filter((u) =>
      (u.email!==user.email) &&  u.firstname.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(results);
    if (results.length === 0) setInviteNumber(value);
  };

  const handleAddFriend = async(u) => {
    alert(`${u.firstname} added as a friend!`);
    setSelectedUserId(u._id); 
    // Store selected user ID
  
    const email=user.email;
    const id=u._id;
    //now make addfriend thunk in user slice for backend call
    dispatch(AddToFriend({id, email}));
    console.log("Selected User ID:", id);
    closeModal();
  };

  const handleInvite = () => setInviteDialog(true);
  const sendInviteSMS = async() => {
    alert(`Invitation link sent to ${inviteNumber}!`);
    await fetch(`${URL}/sendOtpByEmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber: inviteNumber, email: user.email })
    })
    .then(response => response.json())
    .then(data => console.log("Success:", data))
    .catch(err => console.error(err));
    
    setInviteDialog(false);
    closeModal();
  };

  return (
    <div className='flex'>
      <IconButton onClick={handleClick}>
        <MoreVertIcon sx={{ color: "black", scale: 1.5, cursor: "pointer", "&:hover": { color: "blue" } }} />
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
          <ListItem disablePadding>
            <ListItemButton onClick={handlefriend}>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Add to Friends" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>

      <Modal
        open={isopen}
        onClose={closeModal}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ bgcolor: "white", p: 4, borderRadius: 2, boxShadow: 24, minWidth: 350, textAlign: "center", position: "relative" }}>
          <h2>Add Friends</h2>
          <TextField fullWidth label="Search user by name or phone" variant="outlined" value={search} onChange={handleSearch} sx={{ mt: 2, mb: 2 }} />
          
          {filteredUsers.length > 0 ? (
            <List>
              {filteredUsers.map((u) => (
                <ListItem key={u.phoneNumber} disablePadding>
                  <ListItemButton onClick={() => handleAddFriend(u)}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={u.firstname} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            search && (
              <div>
                <p>No user found.</p>
                <Button variant="contained" color="primary" onClick={handleInvite}>Send Invite</Button>
              </div>
            )
          )}
          <IconButton onClick={closeModal} sx={{ position: "absolute", top: 8, right: 8 }}>❌</IconButton>
        </Box>
      </Modal>

      <Dialog open={inviteDialog} onClose={() => setInviteDialog(false)}>
        <DialogTitle>Send Invitation</DialogTitle>
        <DialogContent>
          <DialogContentText>No user found. Would you like to send an invitation link to {inviteNumber}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInviteDialog(false)}>Cancel</Button>
          <Button onClick={sendInviteSMS} color="primary">Send SMS</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



