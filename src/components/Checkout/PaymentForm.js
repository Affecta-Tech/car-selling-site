import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import './styles.css';

function PaymentForm(props) {
  console.log(props.vin, props.price)
  const [loader, setLoader] = React.useState(0);
  const [resultMessage, setResultMessage] = React.useState(0);
  const [popOpen, setPopOpen] = React.useState(1);
  const [errorMessage, setErrorMessage] = React.useState(<p></p>)
  var placeOrder = (e) => {
    e.preventDefault()
    console.log(e.target)
    setLoader(1)
    setErrorMessage("")
    if (
        isNaN(parseInt(e.target.sZip.value))===true
        ){
         setErrorMessage(<p style={{color:"red"}}>Invalid Zip</p>)
    } else{
        submiter(e.target)
        .then(res => {
          console.log(res)
          setErrorMessage(<span className="result-span">{res.message}</span>)
          setLoader(0)
          setResultMessage(1)
        })
    }
}

var submiter = (submission) => {

        console.log(submission)
        // Billing and Shipping are same
        let reqBody = {
          "amount":props.price * 100,
          "currency":"usd",
          "vin":props.vin,
          "id": "tok_visa",
          "receipt_email": submission.email.value,
          "billing_details": {
            "address": {
              "city": submission.sCity.value,
              "country": submission.sCountry.value,
              "line1": submission.sAddress1.value,
              "line2": submission.sAddress2.value,
              "postal_code": submission.sZip.value,
              "state": submission.sState.value
            },
            "email": submission.email.value,
            "name": submission.sFirstName.value + " " + submission.sLastName.value,
            "phone": submission.phone.value,
            "carrier":"carrier",
            "trackingNum":"tracking Num"
          },
          "metadata": {
            "shipping_address": {
              "name": submission.sFirstName.value + " " + submission.sLastName.value,
              "city": submission.sCity.value,
              "country": submission.sCountry.value,
              "line1": submission.sAddress1.value,
              "line2": submission.sAddress2.value,
              "postal_code": submission.sZip.value,
              "state": submission.sState.value
            },
          },
          }
          if (popOpen === 1) {
            // Billing and Shipping are NOT same
            reqBody = {
              "amount":props.price * 100,
              "currency":"usd",
              "vin":props.vin,
              "id": "tok_visa",
              "receipt_email": submission.email.value,
              "shipping": "shipping_info",
              "billing_details": {
                "address": {
                  "city": submission.bCity.value,
                  "country": submission.bCountry.value,
                  "line1": submission.bAddress1.value,
                  "line2": submission.bAddress2.value,
                  "postal_code": submission.bZip.value,
                  "state": submission.bState.value
                },
                "email": submission.email.value,
                "name": submission.bFirstName.value + " " + submission.bLastName.value,
                "phone": submission.phone.value,
                "carrier":"carrier",
                "trackingNum":"tracking Num"
              },
              "metadata": {
                "shipping_address": {
                  "name": submission.sFirstName.value + " " + submission.sLastName.value,
                  "city": submission.sCity.value,
                  "country": submission.sCountry.value,
                  "line1": submission.sAddress1.value,
                  "line2": submission.sAddress2.value,
                  "postal_code": submission.sZip.value,
                  "state": submission.sState.value
                },
              },
              }
          }

        const fetchData = async () => {
            const result = await fetch(`http://localhost:8080/stripe/charge`, {
              headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(reqBody),
              method: "POST", credentials: 'same-origin'
            });
            let response = await result.json();
            
            return response
          }
          return fetchData()
    
}
let popOpenSection = () => {
  if (popOpen === 1) {
    setPopOpen(0)
  } else {
    setPopOpen(1)
  }
  
}
  return (
<React.Fragment>
   <form onSubmit={placeOrder}>
      <Typography variant="h6" gutterBottom>
         Shipping address
      </Typography>
      <Grid container spacing={3}>
         <Grid item xs={12} sm={6}>
            <TextField
               required
               id="sFirstName"
               name="sFirstName"
               label="First name"
               fullWidth
               autoComplete="given-name"
               />
         </Grid>
         <Grid item xs={12} sm={6}>
            <TextField
               required
               id="sLastName"
               name="sLastName"
               label="Last name"
               fullWidth
               autoComplete="family-name"
               />
         </Grid>
         <Grid item xs={12}>
            <TextField
               required
               id="sAddress1"
               name="sAddress1"
               label="Address line 1"
               fullWidth
               autoComplete="shipping address-line1"
               />
         </Grid>
         <Grid item xs={12}>
            <TextField
               id="sAddress2"
               name="sAddress2"
               label="Address line 2"
               fullWidth
               autoComplete="shipping address-line2"
               />
         </Grid>
         <Grid item xs={12} sm={6}>
            <TextField
               required
               id="sCity"
               name="sCity"
               label="City"
               fullWidth
               autoComplete="shipping address-level2"
               />
         </Grid>
         <Grid item xs={12} sm={6}>
            <TextField
               id="sState"
               name="sState"
               label="State/Province/Region" 
               fullWidth />
         </Grid>
         <Grid item xs={12} sm={6}>
            <TextField
               required
               id="sZip"
               name="sZip"
               label="Zip / Postal code"
               fullWidth
               autoComplete="shipping postal-code"
               />
         </Grid>
         <Grid item xs={12} sm={6}>
            <TextField
               required
               id="sCountry"
               name="sCountry"
               label="Country"
               fullWidth
               autoComplete="shipping country"
               />
         </Grid>
         <Grid item xs={12} sm={6}>
            <TextField
               required
               id="phone"
               name="phone"
               label="Phone Number"
               fullWidth
               autoComplete="shipping country"
               />
         </Grid>
         <Grid item xs={12} sm={6}>
            <TextField
               required
               id="email"
               name="email"
               label="Email"
              //  type="email"
               fullWidth
               autoComplete="shipping country"
               />
         </Grid>
         <Grid item xs={12}>
            <FormControlLabel
            control={
            <Checkbox color="secondary" name="saveAddress" value="yes" onClick={popOpenSection}/>
            }
            label="Shipping is the same as Billing address"
            />
         </Grid>
      </Grid>
      {
      popOpen === 1?
      <div>
         <br></br>
         <br></br>
         <Typography variant="h6" gutterBottom>
            Billing address
         </Typography>
         <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
               <TextField
                  required
                  id="bFirstName"
                  name="bFirstName"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  required
                  id="bLastName"
                  name="bLastName"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  />
            </Grid>
            <Grid item xs={12}>
               <TextField
                  required
                  id="bAddress1"
                  name="bAddress1"
                  label="Address line 1"
                  fullWidth
                  autoComplete="shipping address-line1"
                  />
            </Grid>
            <Grid item xs={12}>
               <TextField
                  id="bAddress2"
                  name="bAddress2"
                  label="Address line 2"
                  fullWidth
                  autoComplete="shipping address-line2"
                  />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  required
                  id="bCity"
                  name="bCity"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField id="bState" name="bState" label="State/Province/Region" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  required
                  id="bZip"
                  name="bZip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                  />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  required
                  id="bCountry"
                  name="bCountry"
                  label="Country"
                  fullWidth
                  autoComplete="shipping country"
                  />
            </Grid>
         </Grid>
      </div>
      :
      <div></div>
      }
      <br></br>
      <br></br>
      <Typography variant="h6" gutterBottom>
         Payment method
      </Typography>
      <Grid container spacing={3}>
         <Grid item xs={12} md={6}>
            <TextField required id="cardName" label="Name on card" fullWidth autoComplete="cc-name" />
         </Grid>
         <Grid item xs={12} md={6}>
            <TextField
               required
               id="cardNumber"
               label="Card number"
               fullWidth
               autoComplete="cc-number"
               />
         </Grid>
         <Grid item xs={12} md={6}>
            <TextField required id="expDate" label="Expiry date" fullWidth autoComplete="cc-exp" />
         </Grid>
         <Grid item xs={12} md={6}>
            <TextField
               required
               id="cvv"
               label="CVV"
               helperText="Last three digits on signature strip"
               fullWidth
               autoComplete="cc-csc"
               />
         </Grid>
         {
         errorMessage === ""?
         <div></div>
         :
         resultMessage === 1?
         <div className="result-container">
            <div className="result">
               {errorMessage}
               <Button
               style={{backgroundColor:"#3f51b5", color:"white"}}
                  type="submit"
                  onClick={() => setResultMessage(0)}
               >
               Close
               </Button>
            </div>
         </div>
         :
         <div></div>
         }
      </Grid>
      <Button
      style={{backgroundColor:"#3f51b5", color:"white"}}
         type="submit"
         >
      Place Order
      </Button>
   </form>
   {loader === 0?
   <div></div>
   :
   <div className="loader-container">
      <div className="loader">
         <CircularProgress />
      </div>
   </div>
   }
</React.Fragment>
  );
}

export default PaymentForm;