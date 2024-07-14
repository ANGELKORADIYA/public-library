import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { post } from "../Rest"; // Assuming post is the function for making HTTP POST requests
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: theme.spacing(3),
    width: "40%", // Adjusted width to accommodate horizontal layout
  },
}));

const StyledDialogTitle = styled(DialogTitle)({
  display: "flex",
  alignItems: "center",
  padding: "1rem",
  borderBottom: "1px solid #ccc",
});

const StyledDialogContent = styled(DialogContent)({
  padding: "2rem",
});

const StyledTextField = styled(TextField)({
  marginBottom: "1rem",
  marginTop: "1rem",
  width: "100%",
});

const StyledSelect = styled(Select)({
  marginBottom: "1rem",
  marginTop: "1rem",
  width: "100%",
});

const StyledButton = styled(Button)({
  marginTop: "1rem",
  width: "100%",
});

const SignUpPopup = (props) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "member",
    address: "",
    pincode: "",
    phone: "",
  });

  const roleOptions = ["member", "librarian", "admin"]; // Added "admin"

  const handleSignUp = async (evt) => {
    evt.preventDefault();
    document.body.style.cursor = "wait"; // Change cursor to wait for the entire body

    const { username, email, password, confirmpassword, role, address, pincode, phone } = state;
    try {
      const response = await post("signup", {
        username,
        email,
        password,
        confirmpassword,
        role,
        address,
        pincode,
        phone,
      });

      if (response.okk) {
        toast.success("🦄 Sign Up Successfully !!");
        navigate("/login");
        props.changecookie(document.cookie);
      } else {
        toast.warn(response.message);
      }
    } catch (error) {
      console.error("Sign up failed:", error);
    } finally {
      document.body.style.cursor = "default"; // Reset cursor to default after processing
    }
  };

  return (
    <StyledDialog open={props.open} onClose={() => props.setinorout(null)}>
      <StyledDialogTitle>Sign Up</StyledDialogTitle>
      <StyledDialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              label="Username"
              variant="outlined"
              value={state.username}
              onChange={(e) => setState({ ...state, username: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              label="Email"
              variant="outlined"
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              label="Password"
              variant="outlined"
              type="password"
              value={state.password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={state.confirmpassword}
              onChange={(e) => setState({ ...state, confirmpassword: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledTextField
              label="Address"
              variant="outlined"
              multiline
              rows={3} // More rows for address field
              value={state.address}
              onChange={(e) => setState({ ...state, address: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              label="Pincode"
              variant="outlined"
              value={state.pincode}
              onChange={(e) => setState({ ...state, pincode: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              label="Phone"
              variant="outlined"
              value={state.phone}
              onChange={(e) => setState({ ...state, phone: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledSelect
              value={state.role}
              onChange={(e) => setState({ ...state, role: e.target.value })}
              label="Role"
              variant="outlined"
            >
              {roleOptions.map((role, index) => (
                <MenuItem key={index} value={role}>
                  {role}
                </MenuItem>
              ))}
            </StyledSelect>
          </Grid>
        </Grid>
        <StyledButton
          variant="contained"
          onClick={(evt) => handleSignUp(evt)}
          color="primary"
        >
          Sign Up
        </StyledButton>
        <StyledButton
          color="primary"
          onClick={() => props.setinorout(null)}
        >
          Cancel
        </StyledButton>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default SignUpPopup;
