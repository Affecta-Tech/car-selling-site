import React from 'react';
import Typography from '@material-ui/core/Typography';
import { BASE_URL } from '../../api/token';

function AddressForm(props) {
  const [car, setCar] = React.useState()
  var getCars = () => {
    fetch(`${BASE_URL}/cars/${props.id}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
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
}, []);// eslint-disable-line react-hooks/exhaustive-deps

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
        <img alt={car.year+" "+car.make+" "+car.model} style={{width:"100%", height:"auto"}} src={car.imgs[0]}></img>
      </div>
      
      :
      ""
      }
    </React.Fragment>
  );
}

export default AddressForm;