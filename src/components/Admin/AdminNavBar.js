import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/PersonSharp';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {/* {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'} */}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

let AdminNavBar = (props) => {
  const classes = useStyles();
  return (
      <AppBar position=""         
      style={{
        width:"162px",
        height:"100vh",
        position:"fixed"
        }}>
        <Tabs orientation="vertical" value={props.value}>
          <div style={{        
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            height: "100px",
            width: "100%"
            }}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          </div>
        <Tab value={0} label='Home'  to='/' component={Link} /> 
        <Tab value={1} label='Add Car'  to='/admin-add' component={Link} /> 
        <Tab value={2} label='Analytics'  to='/admin-dash' component={Link} /> 
        <Tab value={3} label='Log Out'  to='/admin-portal' component={Link} /> 
        </Tabs>
      </AppBar>
  );
}
export default AdminNavBar;