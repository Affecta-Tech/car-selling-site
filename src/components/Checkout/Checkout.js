import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import NavBar from '../NavBar/NavBar.js'

import './styles.css';
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    zIndex: 1,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Confirm Car', 'Payment details', 'Reciept'];



function Checkout() {
  console.log(window.location.search)
  let carID = window.location.search.split("?id=")[1].split("&vin=")[0]
  let carVin = window.location.search.split("&vin=")[1].split("&price=")[0]
  let carPrice = window.location.search.split("&price=")[1]
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const history = useHistory();
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm id={carID}/>;
      case 1:
        return <PaymentForm vin={carVin} price={carPrice}/>;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  return (
    <React.Fragment>
    <NavBar value={3}></NavBar>
      {/* <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Car ID: {carID}
          </Typography>
        </Toolbar>
      </AppBar> */}
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>

                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {/* {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )} */}
                  {
                    activeStep === 0?
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Confirm Car
                  </Button>
                  :
                  activeStep === 1?
                  <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Place Order
                </Button>
                :
                activeStep === 2?
                <div>
                <Button
                variant="contained"
                color="primary"
                onClick={() => history.push("/")}
                className={classes.button}
              >
                Home
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => window.print()}
                className={classes.button}
              >
                Print Page
              </Button>
                </div>

              :
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Confirm
                  </Button>}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />

      </main>
    </React.Fragment>
  );
}
export default Checkout;