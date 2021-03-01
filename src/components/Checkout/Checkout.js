import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
import queryString from 'query-string';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  let carID = window.location.search.split("id=")[1]
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [loader, setLoader] = React.useState(0);
  const [resultMessage, setResultsMessage] = React.useState(<p></p>);
  const history = useHistory();
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm id={carID}/>;
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  var placeOrder = (e) => {
    e.preventDefault()
    setLoader(1)
    // setErrorMessage("")
    // // console.log(e.target.email.value)
    
    // console.log()
    // if (
    //     isNaN(parseInt(e.target.year.value))===true || 
    //     isNaN(parseInt(e.target.price.value))===true ||
    //     isNaN(parseInt(e.target.mileage.value))===true ||
    //     isNaN(parseInt(e.target.city.value))===true ||
    //     isNaN(parseInt(e.target.highway.value))===true
    //     ){
    //      setErrorMessage(<p style={{color:"red"}}>Year, Price, Mileage, City MPG and Highway MPG must all be numbers</p>)
    // } else{
        submiter(e.target)
        .then(
            res=> {
                //create function that takes in event values and creates mongo doc
                setResultsMessage(res === 200?<p style={{color:"green"}}>Order Placed!</p>:<p style={{color:"red"}}>{res.message}</p>)
                setActiveStep(res === 200?activeStep + 1:activeStep)
                setLoader(0)
            }
)
    // }
}

var submiter = (submission) => {

        console.log(submission)
        const fetchData = async () => {
            const result = await fetch(`http://localhost:8080/stripe/charge`, {
              headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
              "amount":999,
              "currency":"usd",
              "vin":"awbefuoawb3224",
              "id": "tok_visa",
              "receipt_email": "email",
              "shipping": "shipping_info",
              "billing_details": {
                "address": {
                  "city": "dank city",
                  "country": "country",
                  "line1": "line1",
                  "line2": "line2",
                  "postal_code": "postal_code",
                  "state": "state"
                },
                "email": "email yup",
                "name": "Jimy john",
                "phone": "phone"
              },
                }
              ),
              method: "POST", credentials: 'same-origin'
            });
            let response = await result.json();
            return response
          }
          return fetchData()
    
}
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
                  onClick={placeOrder}
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
                  
                  {resultMessage}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
        {loader === 0?
        <div></div>
        :
        <div className="loader-container">
          <div className="loader">
            <CircularProgress />
          </div>
        </div>
        }
      </main>
    </React.Fragment>
  );
}
export default Checkout;