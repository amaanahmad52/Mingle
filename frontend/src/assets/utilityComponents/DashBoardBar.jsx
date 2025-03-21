import { useDispatch, useSelector } from "react-redux";
import React from "react";
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import { AddToFriend } from "../../slices/UserSlices";
import CloseIcon from '@mui/icons-material/HighlightOff';
import { Typography } from "@mui/material";

const DashBoardBar = ({ friend }) => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  
  const [isopen, setIsopen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [filteredUsers, setFilteredUsers] = React.useState([]);
  const [inviteDialog, setInviteDialog] = React.useState(false);
  const [inviteNumber, setInviteNumber] = React.useState("");

  const handlefriend = () => {
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
    
    const results = friend?.filter((u) =>
      u.email !== user.email && u.phoneNumber.toLowerCase() === value.toLowerCase()
    );
    
    setFilteredUsers(results);
    if (results.length === 0) setInviteNumber(value);
  };

  const handleAddFriend = async (u) => {
    alert(`${u.firstname} added as a friend!`);
    const email = user.email;
    const id = u._id;
    dispatch(AddToFriend({ id, email }));
    closeModal();
  };

  const handleInvite = () => setInviteDialog(true);
  
  const sendInviteSMS = async () => {
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
    <>
      <Modal
        open={isopen}
        onClose={closeModal}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            bgcolor: "transparent", // Semi-transparent background
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            minWidth: 350,
            textAlign: "center",
            position: "relative",
            color: "rgb(128,127,255)", 
            backdropFilter: "blur(10px)"
          }}
        >
          <h2 style={{ color: "rgb(128,127,255)", fontWeight: "bold" }}>Add Friends</h2>
          <TextField
            fullWidth
            label="Search user by Phone number"
            variant="outlined"
            value={search}
            onChange={handleSearch}
            sx={{ 
              mt: 2, 
              mb: 2, 
              input: { color: "rgb(128,127,255)", fontWeight: "bold" }, 
              label: { color: "rgb(128,127,255)" },
              fieldset: { borderColor: "rgb(128,127,255)", fontWeight: "bold" }
            }}
          />

          {filteredUsers.length > 0 ? (
            <List>
              {filteredUsers.map((u) => (
                <ListItem key={u.phoneNumber} disablePadding>
                  <ListItemButton onClick={() => handleAddFriend(u)}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: ["rgb(128,127,255)"], color: [blue] }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                    primary={<Typography sx={{ color: "rgb(128,127,255)", fontWeight: "bold",":hover":{color:"rgb(14, 116, 144)"} }}>{u.firstname}</Typography>}/>

                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            search &&search?.length===10 && (
              <div>
                <p style={{ color: "rgb(128,127,255)" }}>No user found.</p>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "rgb(128,127,255)", color: "black", "&:hover": { bgcolor: "darkcyan" } }}
                  onClick={handleInvite}
                >
                  Send Invite
                </Button>
              </div>
            )
          )}
          <IconButton onClick={closeModal} sx={{ position: "absolute", top: 8, right: 8, color: "rgb(128,127,255)" }}>
            <CloseIcon className=" rgb(128,127,255) hover:text-cyan-700"/>
          </IconButton>
        </Box>
      </Modal>

      <Dialog open={inviteDialog} onClose={() => setInviteDialog(false)}>
        <DialogTitle sx={{ color: "#0092b8" }}>Send Invitation</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#0092b8" }}>
            No user found. Would you like to send an invitation link to {inviteNumber}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInviteDialog(false)} sx={{ color: "#0092b8" }}>Cancel</Button>
          <Button onClick={sendInviteSMS} sx={{ bgcolor: "#0092b8", color: "black", "&:hover": { bgcolor: "#0e7490" } }}>
            Send SMS
          </Button>
        </DialogActions>
      </Dialog>

      <button
        onClick={handlefriend}
        className=" btn btn-info text-white bg-[#f43098] rounded-2xl hover:bg-[#c02078] hover:shadow-[0_4px_10px_rgba(0,0,0,0.2)]"

      >
        Add new Friend
      </button>
    </>
  );
};

export default DashBoardBar;
