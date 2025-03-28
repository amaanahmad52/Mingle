import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Popover from "@mui/material/Popover";
import Backdrop from "@mui/material/Backdrop";
import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

export default function ThreeDotMenu({ handleOptionClick,handleProfileFileChange, r, sr, user }) {
  const open = Boolean(r);

  const handleClose = () => sr(null);

  
  const [openImageModal, setOpenImageModal] = React.useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleProfileFileChange("Change image", file);
    }
  };

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
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "top" }}
        sx={{
          mt: 2,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          "& .MuiPaper-root": {
            backgroundColor: "transparent",
            boxShadow: "none",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <List>
          {/* View Image Option */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setOpenImageModal(true)
                handleClose();
              }}
            >
              <Typography
                sx={{
                  color: "rgb(244, 87, 168)",
                  fontSize: "17px",
                  "&:hover": { color: "rgb(244, 48, 152)" },
                }}
              >
                View Image
              </Typography>
            </ListItemButton>
          </ListItem>

          {/* Change Image Option with File Input */}
          <ListItem disablePadding>
            <label
              style={{
                width: "100%",
                cursor: "pointer",
                padding: "10px",
                color: "rgb(244, 87, 168)",
                fontSize: "17px",
              }}
              onMouseEnter={(e) => (e.target.style.color = "rgb(244, 48, 152)")}
              onMouseLeave={(e) => (e.target.style.color = "rgb(244, 87, 168)")}
            >
              <Typography
                sx={{
                  color: "rgb(244, 87, 168)",
                  marginLeft: "6px",
                  fontSize: "17px",
                  "&:hover": { color: "rgb(244, 48, 152)" },
                }}
              >
                Change Image
              </Typography>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
          </ListItem>

          {/* Remove Image Option */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleOptionClick("Remove image")}>
              <Typography
                sx={{
                  color: "rgb(244, 87, 168)",
                  fontSize: "17px",
                  "&:hover": { color: "rgb(244, 48, 152)" },
                }}
              >
                Remove Image
              </Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>


      {/* modal for profile pic  */}
      <Dialog
        open={openImageModal}
        onClose={() => setOpenImageModal(false)}
        maxWidth="lg"
        sx={{
            "& .MuiPaper-root": {
              background: "transparent",
              backdropFilter: "blur(10px)",
              borderRadius: "12px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.9)",
              //make size large
              width: "50%",
              height: "50%",
            },
          }}
      >
        <DialogContent className="p-0">
          <div className="flex justify-center items-center w-full h-full">
            <img
              src={
                user.avatar.url ||
                "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
              }
              alt="Profile"
              className="w-full h-auto max-w-96 max-h-96"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
