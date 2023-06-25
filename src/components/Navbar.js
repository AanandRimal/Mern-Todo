import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <header>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Link to="/">
            <h1>TODO Buddy</h1>
          </Link>
        </div>
        <nav>
          {user && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{ marginRight: '8px', cursor: 'pointer' }}
                onClick={handleClick}
                aria-controls="logout-menu"
                aria-haspopup="true"
              >
                {user.email[0]}
              </Avatar>
              <span className='span'>{user.email}</span>
              <Menu
                id="logout-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">
                <Button variant="outlined">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="outlined">SignUp</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
