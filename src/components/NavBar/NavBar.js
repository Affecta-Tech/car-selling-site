import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Link } from 'react-router-dom';



let NavBar = (props) => {
  return (
      <AppBar position="relative" style={{alignItems:'center'}}>
        <Tabs value={props.value}>
        <Tab value={0} label='Home'  to='/' component={Link} /> 
        <Tab value={1} label='Sign In'  to='/signin' component={Link} /> 
        <Tab value={2} label='Sign Up'  to='/signup' component={Link} /> 
        <Tab value={3} label='Checkout'  to='/checkout' component={Link} /> 
        <Tab value={4} label='Admin'  to='/admin-portal' component={Link} /> 
        </Tabs>
      </AppBar>
  );
}
export default NavBar;