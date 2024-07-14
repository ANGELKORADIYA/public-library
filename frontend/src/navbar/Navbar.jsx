import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import logo from "./logo.png"; // Add your logo here
import ProfileDetailsPopup from "./Profile"; // Updated import

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  flexGrow: 1,
  background: "linear-gradient(135deg, #feb47f, #ff7e5f)",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  zIndex: 10000,
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontWeight: "bold",
}));

const StyledLogo = styled("img")(({ theme }) => ({
  height: 40,
  marginRight: theme.spacing(2),
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    color: theme.palette.common.white,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: "inherit",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
}));

const App = ({ isAuthenticated, role }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    document.cookie = "token=;expires=" + new Date().toUTCString();
    window.location = window.location.href;
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const isProfilePopupOpen = Boolean(anchorEl);

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Box display="flex" alignItems="center">
          <StyledLogo src={logo} alt="Wanderlogue Logo" />
          <StyledTitle variant="h6">Public Library</StyledTitle>
        </Box>

        <Box display="flex" alignItems="center">
          {isAuthenticated ? (
            <>
              <StyledLink to="/dashboard">
                <StyledButton>Home</StyledButton>
              </StyledLink>
              <StyledLink to="/policecrimereports">
                <StyledButton>Police Crime Reports</StyledButton>
              </StyledLink>
              <StyledLink to="/map">
                <StyledButton>Crime Map</StyledButton>
              </StyledLink>
            </>
          ) : (
            ""
          )}
        </Box>

        <Box display="flex" alignItems="center">
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleProfileClick}
          >
            <AccountCircle />
          </IconButton>

          {isAuthenticated ? (
            <StyledButton onClick={handleLogout}>Logout</StyledButton>
          ) : (
            <>
              <StyledLink to="/login">
                <StyledButton>Login</StyledButton>
              </StyledLink>
              <StyledLink to="/signup">
                <StyledButton>Signup</StyledButton>
              </StyledLink>
            </>
          )}
        </Box>
      </StyledToolbar>

      {/* Profile Details Popover */}
      <ProfileDetailsPopup open={isProfilePopupOpen} anchorEl={anchorEl} onClose={handleProfileClose} />
    </StyledAppBar>
  );
};

export default App;
