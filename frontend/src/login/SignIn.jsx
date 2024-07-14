import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { post } from "../Rest";
import { useNavigate } from "react-router-dom";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: theme.spacing(3),
  },
}));

const StyledDialogTitle = styled(DialogTitle)({
  display: "flex",
  alignItems: "center",
  padding: "1rem",
  borderBottom: "1px solid #ccc",
});

const StyledDialogContent = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
});

const StyledTextField = styled(TextField)({
  marginBottom: "1rem",
  marginTop: "1rem",
  width: "100%",
});

const StyledButton = styled(Button)({
  marginTop: "1rem",
});

const SignInPopup = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (evt) => {
    evt.preventDefault();
    document.body.style.cursor = "wait"; // Change cursor to wait for the entire body
    try {
      const response = await post("login", { email, password });

      if (response.okk) {
        document.cookie = `token=${response.token};expires=${new Date(
          new Date().getTime() + 1 * 60 * 60 * 10000
        ).toUTCString()};`;
        toast.success("🦄 log in Sucessfully !!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        await props.changecookie(document.cookie);
        navigate("/dashboard");
      } else {
        toast.warn(response.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setTimeout(() => {
        document.body.style.cursor = "default"; // Reset cursor to default after processing
      }, 1500);
    }
  };

  return (
    <StyledDialog open={props.open} onClose={() => props.setinorout(null)}>
      <StyledDialogTitle>Sign In</StyledDialogTitle>
      <StyledDialogContent>
        <StyledTextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledTextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledButton
          variant="contained"
          color="primary"
          onClick={(evt) => handleSignIn(evt)}
          fullWidth
        >
          Sign In
        </StyledButton>
        <StyledButton
          color="primary"
          onClick={() => {
            props.setinorout(null);
          }}
          fullWidth
        >
          Cancel
        </StyledButton>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default SignInPopup;
