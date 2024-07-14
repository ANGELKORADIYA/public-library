import React from "react";
import { Button, Typography, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Mock user type for demonstration purposes

const HomePage = (props) => {
  const navigate = useNavigate();
  const policeDashboard = (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Crime Reports
            </Typography>
            <Typography variant="body2" color="textSecondary">
              View and manage crime reports submitted by citizens.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/policecrimereports")}
            >
              View Reports
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              View Map of Crime
            </Typography>
            <Typography variant="body2" color="textSecondary">
              View a map of crime incidents and their corresponding locations.
            </Typography>
           
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/map")}
            >
              Assign Cases
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const citizenDashboard = (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Report a Crime
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Submit a new crime report to the police.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/createreport")}
            >
              Report a Crime
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              View Reports
            </Typography>
            <Typography variant="body2" color="textSecondary">
              View the status of your submitted crime reports.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/yourreports")}
            >
              View Reports
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <div style={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Crime Reporting System
      </Typography>
      <Typography variant="body1" paragraph>
        Our application aims to facilitate a seamless process for reporting and managing crime-related information. 
        Whether you are a police officer looking to manage cases or a citizen wanting to report a crime, our system is here to assist you.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>
      {props.role === "police" ? policeDashboard : citizenDashboard}
    </div>
  );
};

export default HomePage;
