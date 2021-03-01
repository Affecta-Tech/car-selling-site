import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function AddressForm(props) {
  const [car, setCar] = React.useState()
  var getCars = () => {
    fetch(`http://localhost:8080/cars/${props.id}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(res => {
            console.log(res)
            setCar(res)
        })
        .catch(err => console.log(err))
}
React.useEffect(() => {
  getCars()
}, []);

  return (
    <React.Fragment>
      {
      car !== undefined?
      <div style={{width:"100%", height:"auto", display:"flex",flexDirection:"column"}}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        {car.year} {car.make} {car.model}
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          ${car.price.$numberDecimal}
        </Typography>
        <img style={{width:"100%", height:"auto"}} src={car.imgs[0]}></img>
      </div>
      
      :
      ""
      }
    </React.Fragment>
  );
}

export default AddressForm;