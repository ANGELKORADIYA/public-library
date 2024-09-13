import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  InputBase,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import logo from "./logo.png"; // Add your logo here
import Profile from "./Profile";
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  flexGrow: 1,
  background: "linear-gradient(135deg, #feb47f, #ff7e5f)",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  zIndex: 10000,
}));

const StyledMenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontWeight: "bold",
}));

const StyledSearch = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledSearchIcon = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create("width"),
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "20ch",
  },
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



const App = ({ isAuthenticated, role ,email,data}) => {
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
          <StyledTitle variant="h6">LibraEase</StyledTitle>
        </Box>
       
        <Box display="flex" alignItems="center">
          {isAuthenticated&& role == "member" ? (
            <>
              <StyledLink to="/dashboard">
                <StyledButton>Home</StyledButton>
              </StyledLink>
              <StyledLink to="/checkout">
                <StyledButton>Checkout Form</StyledButton>
              </StyledLink>
              <StyledLink to="/checkoutdetails">
                <StyledButton>Checkout Details</StyledButton>
              </StyledLink>
            </>
          ) :""}
          { isAuthenticated && role == "librarian" ? (
            <>
            <StyledLink to="/dashboard">
                <StyledButton>Home</StyledButton>
              </StyledLink>
              <StyledLink to="/addbook">
                <StyledButton>Add Book</StyledButton>
              </StyledLink>
              <StyledLink to="/updatebook">
                <StyledButton>Update book</StyledButton>
              </StyledLink></>
          ):""
          }
        </Box>
        <Box display="flex" alignItems="center">
          {isAuthenticated ? (
            <>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleProfileClick}
                >
                <AccountCircle />
              </IconButton>
              <StyledButton onClick={handleLogout}>Logout</StyledButton>
            </>
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
        <Profile open={isProfilePopupOpen} anchorEl={anchorEl} email={email} role={role} onClose={handleProfileClose} />
        </Box>

      </StyledToolbar>
    </StyledAppBar>
  );
};

export default App;
