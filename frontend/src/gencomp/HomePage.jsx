import React from "react";
import { TextField, InputAdornment, IconButton, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

// Define the styled component for the search bar
const SearchBar = styled(TextField)(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  '& .MuiInputBase-root': {
    fontSize: '1.5rem', // Larger font size
  },
}));

const CenteredContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  textAlign: 'center',
  padding: '24px',
});

const HomePage = (props) => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = () => {
    console.log("Searching for: " + value);
  };

  return (
    <CenteredContainer>
      <Grid container direction="column" alignItems="center" justifyContent="center" spacing={3}>
        
        <Grid item>
          <SearchBar
            value={value}
            onChange={onChange}
            variant="outlined"
            placeholder="Search..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={onSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </CenteredContainer>
  );
};

export default HomePage;
