import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CarIcon from '@material-ui/icons/DirectionsCar';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';



let NavBar = (props) => {
  return (
      <AppBar position="relative" style={{alignItems:'center'}}>
        <Tabs value={props.value} style={{display:'flex', width:"100%", justifyContent:'space-between'}}>
        <div style={{padding:"10px"}}>
          <Link to="/">
          <Avatar>
          <CarIcon />
        </Avatar>
          </Link>
        </div>
        <div style={{padding:"10px"}}>
        <Button
        
        >
          <ShoppingCartIcon />
        </Button>
        </div>
        {/* <Tab value={0} label='Home'  to='/' component={Link} />  */}
        {/* <Tab value={1} label='Sign In'  to='/signin' component={Link} /> 
        <Tab value={2} label='Sign Up'  to='/signup' component={Link} /> 
        <Tab value={3} label='Checkout'  to='/checkout' component={Link} />  */}
        {/* <Tab value={4} label='Admin'  to='/admin-portal' component={Link} />  */}
        </Tabs>
      </AppBar>
  );
}
export default NavBar;