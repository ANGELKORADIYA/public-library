import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = ({ setIsSidebarActive, isSidebarActive }) => {
  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  return (
    <>
      
      <Drawer 
        anchor="left" 
        open={isSidebarActive} 
        onClose={toggleSidebar}
        sx={{ 
          '& .MuiDrawer-paper': { 
            backgroundColor: '#333', 
            color: '#fff', 
            paddingTop: '100px' // Add paddingTop to account for the navbar
            
          }
        }}
      >
        <List sx={{ width: 275 }}>
          <ListItem button component={Link} to="/dashboard" onClick={toggleSidebar}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/contactus" onClick={toggleSidebar}>
            <ListItemText primary="Contact Us" />
          </ListItem>
          <ListItem button component={Link} to="/aboutus" onClick={toggleSidebar}>
            <ListItemText primary="About Us" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
