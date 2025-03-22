import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Popover from "@mui/material/Popover";
import Backdrop from "@mui/material/Backdrop";
import { Typography } from "@mui/material";

export default function ThreeDotMenu({ handleOptionClick,handleProfileFileChange, r, sr, user }) {
  const open = Boolean(r);

  const handleClose = () => sr(null);

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
                if (user?.avatar?.url) {
                  window.open(user.avatar.url, "_blank"); // Open image in new tab
                }
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
    </div>
  );
}
