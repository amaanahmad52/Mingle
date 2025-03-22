import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Popover from "@mui/material/Popover";
import Backdrop from "@mui/material/Backdrop";
import { Typography } from "@mui/material";

const options = ["Remove image", "View image", "Change image"];

export default function ThreeDotMenu({ handleOptionClick, r, sr }) {
  const open = Boolean(r);

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
              <ListItemButton
                onClick={() => {
                  handleOptionClick(option);
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
