import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { UserContext } from '../context/UserProvider';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <Box>
      <AppBar variant="dense" color="primary" position="sticky">
        <Toolbar>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button variant="outlined" component={Link} to="/login" color="inherit">
            Login
          </Button>
          <Button variant="outlined" component={Link} to="/signup" color="inherit" sx={{ 'margin-left': '5px' }}>
            Sign Up
          </Button>
          {user && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
