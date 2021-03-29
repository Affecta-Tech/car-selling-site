import React, {
    useEffect,
    useState
  } from 'react';
  import Button from '@material-ui/core/Button';
  import Typography from '@material-ui/core/Typography';
  import { makeStyles } from '@material-ui/core/styles';
  import Container from '@material-ui/core/Container';
  import AdminNavBar from './AdminNavBar'
  import DragDrop from "./DragDrop"
  import TextField from '@material-ui/core/TextField';
  import { useHistory } from "react-router-dom";
  import { BASE_URL,SPECIFIC_CAR } from '../../api/token';

  
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

  
  let Inventory = () => {
    const history = useHistory();
    if (!localStorage.getItem("tok")){
        history.push("/admin-portal")
    }
    // let carID = window.location.search.split("id=")[1]
    let carID = SPECIFIC_CAR
    const [car, setCar] = useState()
    const [deleteError, setDeleteError] = useState("")
    const [uploadError, setUploadError] = useState("")
    const [errorMessage, setErrorMessage] = useState(<p></p>)

    var getCars = () => {
        fetch(`${BASE_URL}/cars/${carID}`, {
                method: 'get',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    "Authorization":localStorage.getItem("tok")
                }
            }).then(res => res.json())
            .then(res => {
                console.log(res)
                setCar(res)
                setDeleteError("")
                setUploadError("")
            })
            .catch(err => console.log(err))
    }
    
    const classes = useStyles();

    var deleteCar = (id) => {
        const fetchData = async () => {
            const result = await fetch(`${BASE_URL}/admin/delete-car`, {
              headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization":localStorage.getItem("tok")
              },
              body: JSON.stringify({"id":id}),
              method: "POST", credentials: 'same-origin'
            });
            let response = await result.json();
            history.push("/admin-inventory")
            setDeleteError((response.message))
            
            return response
          }
          return fetchData()
          
    }

    var deleteAllImage = (id) => {
        const fetchData = async () => {
            const result = await fetch(`${BASE_URL}/admin/delete-all-photos`, {
              headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization":localStorage.getItem("tok")
              },
              body: JSON.stringify({"id":id}),
              method: "POST", credentials: 'same-origin'
            });
            let response = await result.json();
            setDeleteError((response.message))
            return response
          }
          return fetchData()
          
    }
    var deleteImage = (img) => {
        const fetchData = async () => {
            const result = await fetch(`${BASE_URL}/admin/delete-photo`, {
              headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization":localStorage.getItem("tok")
              },
              body: JSON.stringify({"photoURL":img}),
              method: "POST", credentials: 'same-origin'
            });
            let response = await result.json();
            setDeleteError((response.message))
            
            return response
          }
          
          return fetchData()
          
    }

    var uploadComplete = (val) => {
        console.log(val)
        setUploadError(val)
    }

    var submitNewCar = (e) => {
        e.preventDefault()
        setErrorMessage("")
        // console.log(e.target.email.value)
        
        console.log()
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
            // .then(
            //     res=> {
            //         console.log(res)
            //         res.message === undefined?
            //         setErrorMessage(<p style={{color:"green"}}>Car Added!</p>)
            //         :
            //     setErrorMessage(<p style={{color:"red"}}>{res.message}</p>)
                    
            //     }
// )
        // }
    }
    var submiter = (submission) => {
            let make = submission.make.value
            let model = submission.model.value
            let color = submission.color.value
            let year = submission.year.value
            let price = submission.price.value
            let mileage = submission.mileage.value
            let drivetrain = submission.drivetrain.value
            let transmission = submission.transmission.value
            let engine = submission.engine.value
            let fuelType = submission.fuelType.value
            let city = submission.city.value
            let highway = submission.highway.value
            let vin = submission.vin.value
            let features = submission.features.value
            let description = submission.description.value
            if (make === ""){
                make= car.make
            }
            if (model === ""){
                model = car.model
            }
            if (color === ""){
                color = car.color
            }
            if (year === ""){
                year = car.year
            }
            if (price === ""){
                price = car.price.$numberDecimal
            }
            if (mileage === ""){
                mileage = car.mileage
            }
            if (drivetrain === ""){
                drivetrain = car.drivetrain
            }
            if (transmission === ""){
                transmission = car.transmission
            }
            if (engine === ""){
                engine = car.engine
            }
            if (fuelType === ""){
                fuelType = car.fuelType
            }
            if (city === ""){
                city = car.mpg.city
            }
            if (highway === ""){
                highway = car.mpg.highway
            }
            if (vin === ""){
                vin = car.vin
            }
            if (features === ""){
                features = car.features
            }
            if (description === ""){
                description = car.description
            }
            const fetchData = async () => {
                const result = await fetch(`${BASE_URL}/admin/update/${car._id}`, {
                  headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    "Authorization":localStorage.getItem("tok")
                  },
                  body: JSON.stringify({
                  "id":car._id,
                  "make":make,
                  "model":model,
                  "color":color,
                  "year":year,
                  "price":price,
                  "mileage":mileage,
                  "drivetrain":drivetrain,
                  "transmission":transmission,
                  "engine":engine,
                  "fuelType":fuelType,
                  "cityMpg":city,
                  "highwayMpg":highway,
                  "vin":vin,
                  "features":features,
                  "description":description,
                    }
                  ),
                  method: "PUT", credentials: 'same-origin'
                });
                let response = await result.json();
                setDeleteError((response.message))
                return response
              }
              return fetchData()
        
    }
    useEffect(() => {
      getCars()
    }, [deleteError, uploadError]);// eslint-disable-line react-hooks/exhaustive-deps
  
    return (
  <React.Fragment>
     
     <main>
     <AdminNavBar value={1}/>
        {
        car === undefined?
        <div>
           <br></br>
           <br></br>
           <Typography gutterBottom variant="h5" component="h2"  style={{display:"flex", justifyContent:"center"}}>
           No Matches Found
           </Typography>
           <br></br>
           <br></br>
        </div>
        :
        <Container className={classes.cardGrid} maxWidth="md" style={{marginLeft:"25px"}}>
            <h1>{car._id}</h1>
            <Button 
                variant="contained"
               color="primary"
               style={{width:"300px",height:"auto",marginBottom:"15px"}}
               onClick={() => deleteCar(car._id)}
               >
                   Delete Car
               </Button>
               <br></br>
            {
                car.imgs.length === 0?
                <div>No Images</div>
                :
                <Button 
                variant="contained"
               color="primary"
               style={{width:"300px",height:"auto"}}
               onClick={() => deleteAllImage(car._id)}
               >
                   Delete All Photos
               </Button>
            }
            {
                deleteError === ""?
                <div></div>:
                <div>{deleteError}</div>
            }
            <div style={{display:"flex",flexDirection:"row",marginBottom:"150px",alignItems:"center",flexWrap:"wrap"}}>
            {
            car.imgs.map((img,imgIndex) => 
            <div
            style={{width:"300px",height:"auto",margin:"15px"}}
             key={imgIndex}>
            <img 
             style={{width:"300px",height:"auto",
             boxShadow: "0 4px 8px 0 rgb(0 0 0 / 10%), 0 4px 8px 0 rgb(0 0 0 / 10%)"}}
            src={img}
            alt="new"
            />    
            <Button 
             variant="contained"
            color="primary"
            style={{width:"300px",height:"auto"}}
            onClick={() => deleteImage(img)}
            >
                Delete
            </Button>
            </div>

            )
            }
            
            </div>
            <DragDrop id={car._id} sendData={uploadComplete}/>
            <br></br>
            <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
           <form
            onSubmit={submitNewCar}
             style={{paddingTop:"25px",maxWidth:"300px",display:"flex",flexDirection:"column"}}>
                <div style={{display:"flex",alignItems:"baseline"}}>
                <span style={{height:"auto", paddingRight:"10px"}}>Make: </span><TextField name="make" id="standard-basic" label={car.make} />
                </div>
                <div style={{display:"flex",alignItems:"baseline"}}>
                <span style={{height:"auto", paddingRight:"10px"}}>Model: </span><TextField name="model" id="standard-basic" label={car.model} />
                </div>
                <div style={{display:"flex",alignItems:"baseline"}}>
                <span style={{height:"auto", paddingRight:"10px"}}>Color: </span><TextField name="color" id="standard-basic" label={car.color} />
                </div>
                <div style={{display:"flex",alignItems:"baseline"}}>
                <span style={{height:"auto", paddingRight:"10px"}}>Year: </span><TextField name="year" id="standard-basic" label={car.year}  />
                </div>
                <div style={{display:"flex",alignItems:"baseline"}}>
                <span style={{height:"auto", paddingRight:"10px"}}>Price: </span><TextField name="price" id="standard-basic" label={car.price.$numberDecimal}  />
                </div>
                <div style={{display:"flex",alignItems:"baseline"}}>
                <span style={{height:"auto", paddingRight:"10px"}}>Mileage: </span><TextField name="mileage" id="standard-basic" label={car.mileage}  />
                </div>
                <div style={{display:"flex",alignItems:"baseline"}}>
                <span style={{height:"auto", paddingRight:"10px"}}>Drivetrain: </span><TextField name="drivetrain" id="standard-basic" label={car.drivetrain}  />
                </div>
                <div style={{display:"flex",alignItems:"baseline"}}>
                <span style={{height:"auto", paddingRight:"10px"}}>Transmission: </span><TextField name="transmission" id="standard-basic" label={car.transmission}  />
                </div>
                <div style={{display:"flex",alignItems:"baseline"}}>
                <span style={{height:"auto", paddingRight:"10px"}}>Engine: </span><TextField name="engine" id="standard-basic" label={car.engine}  />
                </div>
                <div style={{display:"flex",alignItems:"baseline"}}>
                <span style={{height:"auto", paddingRight:"10px"}}>Fuel Type: </span><TextField name="fuelType" id="standard-basic" label={car.fuelType}  />
                </div>
                <div style={{display:"flex",alignItems:"baseline"}}>
                <span style={{height:"auto", paddingRight:"10px"}}>City MPG: </span><TextField name="city" id="standard-basic" label={car.mpg.city} />
                </div>
                <div style={{display:"flex",alignItems:"baseline"}}>
                <span style={{height:"auto", paddingRight:"10px"}}>Highway MPG: </span><TextField name="highway" id="standard-basic" label={car.mpg.highway} />
                </div>
                <div style={{display:"flex",alignItems:"baseline"}}>
                <span style={{height:"auto", paddingRight:"10px"}}>Vin: </span><TextField name="vin" id="standard-basic" label={car.vin}  />
                </div>
                <br></br>
                <span style={{height:"auto", paddingRight:"10px"}}>Current Features: <br></br>{car.features.map((feature,featureIndex) => 
                          <span key={featureIndex}>
                          {/* We need a break tag until we add the css to create line breaks */}
                          <br></br>
                          --{feature}
                          </span>)}</span><TextField
                name="features"
                id="standard-textarea"
                label="New Car Features"
                placeholder="Features"
                multiline
                />
                <br></br>
                <span style={{height:"auto", paddingRight:"10px"}}>Current Description: <br></br>{car.description}</span><TextField
                name="description"
                id="standard-textarea"
                label="New Car Description"
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
            </div>
        </Container>
        }
     </main>
  </React.Fragment>
    );
  }
  export default Inventory;