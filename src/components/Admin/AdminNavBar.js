import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';


let AdminNavBar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
      aria-label="more"
      aria-controls="long-menu"
      aria-haspopup="true"
      onClick={handleClick}
      >
      <MoreVertIcon />
      </IconButton>
      <Menu
      id="fade-menu"
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
      TransitionComponent={Fade}
      >
      <MenuItem component={Link} to='/'>Home</MenuItem>
      <MenuItem component={Link} to="/admin-inventory">Inventory</MenuItem>
      <MenuItem component={Link} to="/admin-add">Add Car</MenuItem>
      <MenuItem component={Link} to="/admin-orders">Orders</MenuItem>
      {/* <MenuItem component={Link} to="/admin-dash">Analytics</MenuItem> */}
      <MenuItem component={Link} to="/admin-portal">Log Out</MenuItem>
      </Menu>
    </div>

  );
}
export default AdminNavBar;