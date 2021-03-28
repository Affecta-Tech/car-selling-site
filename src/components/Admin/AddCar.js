import React, {
    useState
  } from 'react';
  import Button from '@material-ui/core/Button';
  import TextField from '@material-ui/core/TextField';
  import AdminNavBar from './AdminNavBar'
  import DragDrop from "./DragDrop"
  import { useHistory } from "react-router-dom";
  import { BASE_URL } from "../../api/token"
  function AddCar() {
    const history = useHistory();
    if (!localStorage.getItem("tok")){
        history.push("/admin-portal")
    }
    const [errorMessage, setErrorMessage] = useState(<p></p>)
    const [carID, setCarID] = useState("")
    var submitNewCar = (e) => {
        e.preventDefault()
        setErrorMessage("")
        // console.log(e.target.email.value)
        
        console.log()
        if (
            isNaN(parseInt(e.target.year.value))===true || 
            isNaN(parseInt(e.target.price.value))===true ||
            isNaN(parseInt(e.target.mileage.value))===true ||
            isNaN(parseInt(e.target.city.value))===true ||
            isNaN(parseInt(e.target.highway.value))===true
            ){
             setErrorMessage(<p style={{color:"red"}}>Year, Price, Mileage, City MPG and Highway MPG must all be numbers</p>)
        } else{
            submiter(e.target)
            .then(
                res=> {
                    console.log(res)
                    res.message === undefined?
                    setErrorMessage(<p style={{color:"green"}}>Car Added!</p>)
                    :
                setErrorMessage(<p style={{color:"red"}}>{res.message}</p>)
                    res._id !== undefined?
                        setCarID(res._id)
                    :
                    setCarID("")
                }
)
        }
    }
    
    var submiter = (submission) => {
            const fetchData = async () => {
                const result = await fetch(`${BASE_URL}/admin/add-car`, {
                  headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization':localStorage.getItem("tok")
                  },
                  body: JSON.stringify({
                  "make":submission.make.value,
                  "model":submission.model.value,
                  "color":submission.color.value,
                  "year":submission.year.value,
                  "price":submission.price.value,
                  "mileage":submission.mileage.value,
                  "drivetrain":submission.drivetrain.value,
                  "transmission":submission.transmission.value,
                  "engine":submission.engine.value,
                  "fuelType":submission.fuelType.value,
                  "cityMpg":submission.city.value,
                  "highwayMpg":submission.highway.value,
                  "vin":submission.vin.value,
                  "features":submission.features.value,
                  "description":submission.description.value,
                    }
                  ),
                  method: "POST", credentials: 'same-origin'
                });
                let response = await result.json();
                return response
              }
              return fetchData()
        
    }
    var uploadComplete = (val) => {
        console.log(val)
    }
    return (
        <div>
            <AdminNavBar value={2}/>
            
            <form
            onSubmit={submitNewCar}
             style={{marginLeft:"25px",paddingTop:"25px",maxWidth:"300px",display:"flex",flexDirection:"column"}}>
                
                <TextField name="make" id="standard-basic" label="Make" />
                <TextField name="model" id="standard-basic" label="Model" />
                <TextField name="color" id="standard-basic" label="Color" />
                <TextField name="year" id="standard-basic" label="Year" />
                <TextField name="price" id="standard-basic" label="Price" />
                <TextField name="mileage" id="standard-basic" label="Mileage" />
                <TextField name="drivetrain" id="standard-basic" label="Drivetrain" />
                <TextField name="transmission" id="standard-basic" label="Transmission" />
                <TextField name="engine" id="standard-basic" label="Engine" />
                <TextField name="fuelType" id="standard-basic" label="Fuel Type" />
                <TextField name="city" id="standard-basic" label="City MPG" />
                <TextField name="highway" id="standard-basic" label="Highway MPG" />
                <TextField name="vin" id="standard-basic" label="Vin" />
                <TextField
                name="features"
                id="standard-textarea"
                label="Car Features"
                placeholder="Features"
                multiline
                />
                <TextField
                name="description"
                id="standard-textarea"
                label="Car Description"
                placeholder="Description"
                multiline
                />
                <br></br>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className=""
                >
                    Submit Car
                </Button>
                {errorMessage}

            </form>
            
            {
                carID === ""?
                <div></div>
                :
                <div style={{marginLeft:"25px"}}>
                    <DragDrop id={carID} sendData={uploadComplete}/>
                </div>
                
            }
        </div>
    );
  }
  
  export default AddCar;