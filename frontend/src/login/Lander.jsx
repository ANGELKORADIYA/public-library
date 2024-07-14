import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import SignInPopup from "./SignIn";
import SignUpPopup from "./SignUp";
let backgroundImage =
  "https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=600";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const RootBox = styled(Box)({
  display: "flex",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f0f0f0",
  overflow: "hidden",
});

const ContentContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  width: "80%",
  height: "60%",
  borderRadius: "15px",
  overflow: "hidden",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  transition: "border 0.3s ease-in-out",
  "&:hover": {
    border: "2px solid #ff7e5f",
  },
}));

const ImageContainer = styled(Box)({
  flex: 1,
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  animation: `${slideIn} 1s ease-out`,
});

const TextContainer = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "2rem",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  animation: `${fadeIn} 2s ease-in`,
});

const ButtonContainer = styled(Box)({
  marginTop: "1rem",
  display: "flex",
  justifyContent: "flex-start",
  animation: `${fadeIn} 2.5s ease-in`,
});

const LandingPage = (props) => {
  const [inorout, setinorout] = useState(props.type);
  useEffect(() => {
    setinorout(props.type);
  }, [props.type]);

  return (
    <>
      <RootBox>
        <ContentContainer>
          <ImageContainer />
          <TextContainer>
            <Typography variant="h2" gutterBottom>
              Welcome to Wanderlogue
            </Typography>
            <Typography variant="h5" gutterBottom>
              Explore the world, one post at a time.
            </Typography>
            <ButtonContainer>
              <Button
                variant="contained"
                onClick={() => setinorout("signIn")}
                color="primary"
                sx={{ mr: 2 }}
              >
                Sign In
              </Button>
              <Button
                variant="outlined"
                onClick={() => setinorout("signUp")}
                color="primary"
              >
                Sign Up
              </Button>
            </ButtonContainer>
          </TextContainer>
        </ContentContainer>
      </RootBox>
      {inorout == "signIn" && (
        <SignInPopup open={true} setinorout={setinorout} changecookie={props.changecookie} />
      )}
      {inorout == "signUp" && (
        <SignUpPopup open={true} setinorout={setinorout} />
      )}
    </>
  );
};

export default LandingPage;
