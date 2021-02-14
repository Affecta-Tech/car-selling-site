import React, {
  useEffect,
  useState
} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NavBar from '../NavBar/NavBar.js'
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';





function Admin() {
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("")
  const [carYear, setCarYear] = useState("")
    const history = useHistory();
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">

    </Typography>
  );
}


var SubmitLogin = (e) => {
  e.preventDefault()
  setErrorMessage("")
  console.log(e.target.email.value)
  console.log(e.target.password.value)
  submiter(e.target.email.value, e.target.password.value).then(res=>res.message=="Success"?history.push("/admin-dash"):setErrorMessage("Login Failed"))
  

//   fetch(`http://localhost:8080/cars/admin`, {
//     method: 'post',
//     body:
//       JSON.stringify({"username":e.target.email.value,
//       "pw":e.target.password.value}),
//     headers: {
//         'Accept': 'application/json, text/plain, */*',
//         'Content-Type': 'application/json'
//     },
//     credentials: 'same-origin'}).then(res => console.log(res))
// .then(res => console.log(res))
// .catch(err => console.log(err))
}
var submiter = (username,pw) => {
  const fetchData = async () => {
    const result = await fetch(`http://localhost:8080/cars/admin`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"username":username,
      "pw":pw}),
      method: "POST", credentials: 'same-origin'
    });
    let response = await result.json();
    return response
  }
  return fetchData()
} 

  return (
    <div>
      <NavBar value={1}/>
    <Container component="main" maxWidth="xs">
      
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={SubmitLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
        <Typography variant="body2" color="error" align="center">
          {errorMessage}
</Typography>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </div>
  );
}

export default Admin;