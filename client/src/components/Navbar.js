import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Toolbar,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUser();
    localStorage.removeItem('token');
    enqueueSnackbar('You have been logged out.', { variant: 'info' });
    handleClose();
    navigate('/');
  };

  return (
    <Box>
      <AppBar variant="dense" color="primary" position="sticky">
        <Toolbar>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Box sx={{ flexGrow: 1 }}></Box>

          {user ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 320,
                    minWidth: 275,
                    borderRadius: '10px',
                  }}
                >
                  <ListItemButton onClick={handleClose} component={Link} to="/profile">
                    <ListItemIcon>
                      <SettingsIcon size="1.3rem" />
                    </ListItemIcon>
                    <ListItemText primary={<Typography variant="body2">Your profile</Typography>} />
                  </ListItemButton>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon size="1.3rem" />
                    </ListItemIcon>
                    <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                  </ListItemButton>
                </List>
              </Menu>
            </div>
          ) : (
            <>
              <Button variant="outlined" component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button variant="outlined" component={Link} to="/signup" color="inherit" sx={{ marginLeft: '5px' }}>
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
