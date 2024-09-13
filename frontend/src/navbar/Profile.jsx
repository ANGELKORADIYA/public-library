import React from "react";
import { Popover, Typography, Box } from "@mui/material";

const ProfileDetailsPopup = ({ open, anchorEl, onClose ,role,email}) => {
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
          Email: {email}<br />
          Role: {role}
        </Typography>
      </Box>
    </Popover>
  );
};

export default ProfileDetailsPopup;
