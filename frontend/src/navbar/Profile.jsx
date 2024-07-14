import React from "react";
import { Popover, Typography, Box } from "@mui/material";

const ProfileDetailsPopup = ({ open, anchorEl, onClose }) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Box p={2}>
        <Typography variant="h6">User Profile</Typography>
        <Typography variant="body2">
          {/* Replace with actual user profile details */}
          Name: John Doe <br />
          Email: john.doe@example.com <br />
          Role: Admin
        </Typography>
      </Box>
    </Popover>
  );
};

export default ProfileDetailsPopup;
