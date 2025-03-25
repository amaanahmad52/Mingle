import * as React from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Backdrop from "@mui/material/Backdrop";
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setMessages, clearMessagesAction } from "../../slices/MessagesSlice";
import { toast } from "react-toastify";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ChatUserProfile from "./ChatUserProfile"; // Import the ChatUserProfile component
import { motion } from "framer-motion";


const options = ["Select Messages", "Clear Chat", "User Profile"];

export default function ThreeDotMenu({ id }) {
 
  const [reference, setReference] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [openProfileModal, setOpenProfileModal] = React.useState(false); // New state for user profile modal
  const open = Boolean(reference);
  const dispatch = useDispatch();

  const handleClick = (event) => setReference(event.currentTarget);
  const handleClose = () => setReference(null);

  const handleOptionClick = (option) => {
    if (option === "Clear Chat") {
      if (id) {
        setOpenModal(true);
      } else {
        toast.error("Select a chat to clear");
      }
    } else if (option === "User Profile") {
      setOpenProfileModal(true); // Open the profile modal
    }

    handleClose();
  };

  const handleConfirmClearChat = () => {
    dispatch(setMessages([]));
    dispatch(clearMessagesAction({ receiverId: id }));
    setOpenModal(false);
  };

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
            backgroundColor: "transparent",
            boxShadow: "none",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            padding: "5px",
          },
        }}
      >
        <List>
          {options.map((option) => (
            <ListItem disablePadding key={option}>
              <ListItemButton onClick={() => handleOptionClick(option)}>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        color: "rgb(247,174,30)",
                        ":hover": { color: "rgb(246,146,19)" },
                        fontSize: "17px",
                      }}
                    >
                      {option}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>

      {/* Confirmation Modal for chat delete */}
      <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          sx={{
            "& .MuiPaper-root": {
              background: "transparent",
              backdropFilter: "blur(10px)",
              borderRadius: "12px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.9)",
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "rgb(247,174,30)",
              fontFamily: "Poppins",
            }}
          >
            <WarningAmberIcon sx={{ color: "red" }} /> Are you sure ?
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ color: "rgb(247,174,30)", fontFamily: "Poppins" }}>
              Do you really want to clear the chat?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenModal(false)}
              variant="outlined"
              sx={{
                backgroundColor: "rgba(8, 145, 178, 1)",
                "&:hover": { backgroundColor: "rgba(14, 116, 144, 1)" },
                color: "white",
                fontFamily: "Poppins",
              }}
            >
              No
            </Button>
            <Button
              onClick={handleConfirmClearChat}
              variant="contained"
              sx={{
                backgroundColor: "rgba(8, 145, 178, 1)",
                "&:hover": { backgroundColor: "rgba(14, 116, 144, 1)" },
                color: "white",
                fontFamily: "Poppins",
              }}
            >
              Yes
            </Button>
          </DialogActions>
      </Dialog>

      {/* User Profile Modal */}


      <Dialog
  open={openProfileModal}
  onClose={() => setOpenProfileModal(false)}
  sx={{
    "& .MuiBackdrop-root": {
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Adjust backdrop opacity
    },
    "& .MuiPaper-root": {
      background: "transparent",
      backdropFilter: "blur(10px)",
      borderRadius: "12px",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.9)",
      width: "350px",
      transform: "translate(30%, 3%)",
      "@media (max-width: 600px)": {
        transform: "translateX(0%)",
      },
    },
  }}
>
  {/* <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  > */}
    <DialogTitle
      sx={{
        color: "rgb(247,174,30)",
        fontFamily: "Poppins",
        textAlign: "center",
        scale: "1.2",
      }}
    >
      User Profile
    </DialogTitle>
    <DialogContent sx={{overflow: "hidden"}} >
      <ChatUserProfile />
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() => setOpenProfileModal(false)}
        variant="contained"
        sx={{
          backgroundColor: "rgb(247,174,30)",
          "&:hover": { backgroundColor: "rgb(246,146,19)" },
          color: "black",
          fontFamily: "Poppins",
        }}
      >
        Close
      </Button>
    </DialogActions>
  {/* </motion.div> */}
</Dialog>

    </div>
  );
}
