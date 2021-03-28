import React, {
  useEffect,
  useState
} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import NavBar from '../NavBar/NavBar.js'
import { Link } from 'react-router-dom'
import Pagination from '@material-ui/lab/Pagination';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './styles.css';
import StarIcon from '@material-ui/icons/StarBorder';
import CheckIcon from '@material-ui/icons/CheckCircleOutline';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import OpacityIcon from '@material-ui/icons/Opacity';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { blue, lightGreen, orange, purple, red, yellow } from '@material-ui/core/colors';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import { BASE_URL } from '../../api/token';

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
      justifyContent:"center",
      flexDirection: 'column',
  },
  cardMedia: {
      paddingTop: '56.25%', // 16:9
  },
  cardContent: {
      flexGrow: 1,
      display: 'flex',
      justifyContent:"center",
      flexDirection: 'column',
      alignItems:"center"
  },
  footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
  },
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction = "up"
  ref = {
      ref
  } {
      ...props
  }
  />;
});

let Landing = () => {
  const [cars, setCars] = useState([])
  const [listing, setListing] = useState("")
  const [totalPages, setTotalPages] = useState(1)
  const [carImageNum, setCarImageNum] = useState(1)
  const [page, setPage] = useState(1)
  const [resultMessage, setResultMessage] = useState("")
  const [carYear, setCarYear] = useState("")
  const [pageLimit, setPageLimit] = useState(10)
  const [carColor, setCarColor] = useState("")
  const [open, setOpen] = useState(false);


  const handleClose = () => {
      setCarImageNum(1)
      setOpen(false);
  };

  var getCars = () => {
      fetch(`${BASE_URL}/cars/?page=${page}&limit=${pageLimit}&color=${carColor}&year=${carYear}`, {
              method: 'get',
              headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
              }
          }).then(res => res.json())
          .then(res => {
              console.log(res)
              setResultMessage(res.results)
              setCars(res.results.data)
              setListing(cars[0])
              setTotalPages(res.results.count)
          })
          .catch(err => console.log(err))


  }
  
  const classes = useStyles();

  const pageLimitChange = (event) => {
      setPageLimit(event.target.value);
  }
  const carColorChange = (event) => {
      setCarColor(event.target.value);
  }
  const carYearChange = (event) => {
      setCarYear(event.target.value);
  }

  useEffect(() => {
    getCars()
  }, [page, pageLimit, carColor, carYear]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
<React.Fragment>
   <NavBar value={0}/>
   <main>
      <div className={classes.heroContent}>
         <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
               WE SELL CARS
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
               You can buy a car from us... wow!
            </Typography>
            <div className={classes.heroButtons}>
               <Grid container spacing={2} justify="center">
                  <Grid item>
                     <Button variant="contained" color="primary">
                     Buy Car
                     </Button>
                  </Grid>
                  <Grid item>
                     <Button variant="outlined" color="primary">
                     Sorry, you must buy car
                     </Button>
                  </Grid>
               </Grid>
            </div>
         </Container>
      </div>
      <div style={{display:"flex",justifyContent:"space-evenly", alignItems:"center"}}>
      <FormControl variant="outlined" className={classes.formControl} style={{width:"100px"}}>
         <InputLabel id="demo-simple-select-outlined-label">Page Limit</InputLabel>
         <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={pageLimit}
            onChange={pageLimitChange}
            label="Page Limit"
            >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={75}>75</MenuItem>
            <MenuItem value={100}>100</MenuItem>
         </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl} style={{width:"100px"}}>
         <InputLabel id="demo-simple-select-outlined-label">Color</InputLabel>
         <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={carColor}
            onChange={carColorChange}
            label="Car Color"
            >
            <MenuItem value={""}>Any</MenuItem>
            <MenuItem value={"Blue"}>Blue</MenuItem>
            <MenuItem value={"Black"}>Black</MenuItem>
            <MenuItem value={"Red"}>Red</MenuItem>
            <MenuItem value={"Yellow"}>Yellow</MenuItem>
            <MenuItem value={"Green"}>Green</MenuItem>
            <MenuItem value={"Green"}>Green</MenuItem>
         </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl} style={{width:"100px"}}>
         <InputLabel id="demo-simple-select-outlined-label">Year</InputLabel>
         <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={carYear}
            onChange={carYearChange}
            label="Car Year"
            >
            <MenuItem value={""}>Any</MenuItem>
            <MenuItem value={2020}>2020</MenuItem>
            <MenuItem value={2019}>2019</MenuItem>
            <MenuItem value={2018}>2018</MenuItem>
            <MenuItem value={2017}>2017</MenuItem>
            <MenuItem value={2016}>2016</MenuItem>
            <MenuItem value={2015}>2015</MenuItem>
            <MenuItem value={2014}>2014</MenuItem>
            <MenuItem value={2013}>2013</MenuItem>
            <MenuItem value={2012}>2012</MenuItem>
            <MenuItem value={2011}>2011</MenuItem>
            <MenuItem value={2010}>2010</MenuItem>
            <MenuItem value={2009}>2009</MenuItem>
            <MenuItem value={2008}>2008</MenuItem>
            <MenuItem value={2007}>2007</MenuItem>
            <MenuItem value={2006}>2006</MenuItem>
            <MenuItem value={2005}>2005</MenuItem>
            <MenuItem value={2004}>2004</MenuItem>
            <MenuItem value={2003}>2003</MenuItem>
         </Select>
      </FormControl>
      </div>
      {/* make */}
      {/* model
      color
      year
      drivetrain
      transmission
      fuelType
      vin */}
      {
      resultMessage === undefined?
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
      <Container className={classes.cardGrid} maxWidth="md">
         {/* End hero unit */}
         <Grid container spacing={4}>
            {cars.map((item,index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
               <Card className="card">
                  {
                     item.imgs.length === 0?
                     <CardMedia
                     className={classes.cardMedia}
                     image="https://vectorified.com/images/no-image-icon-17.PNG"
                     title="No Images"
                     />
                     :
                     <CardMedia
                     className={classes.cardMedia}
                     image={item.imgs[0]}
                     title="Image title"
                     onClick={() => {setOpen(true); setListing(item)}}
                     />
                     }


                  <CardContent className={classes.cardContent}
                  style={{}}
                  onClick={() => {setOpen(true); setListing(item)}}
                  >
                     <Typography gutterBottom variant="h5" component="h2">
                        {item.year} {item.make} {item.model}
                     </Typography>
                     {/* <Typography>
                        Color: {item.color}
                     </Typography>
                     <Typography>
                        description: {item.description}          
                     </Typography>
                     <Typography>
                        drivetrain: {item.drivetrain}
                     </Typography> */}
                     {/* <Typography>
                        Features: {item.features.map((feature,featureIndex) => 
                        <span key={featureIndex}>
                        <br></br>
                        --{feature}
                        </span>)
                        }
                     </Typography> */}
                     {/* <Typography>
                        city mpg: {item.mpg.city}
                     </Typography>
                     <Typography>
                        highway mpg: {item.mpg.highway}
                     </Typography> */}
                     <Typography>
                        ${item.price.$numberDecimal}
                     </Typography>
                     {/* <Typography>
                        transmission: {item.transmission}
                     </Typography>
                     <Typography>
                        fuelType: {item.fuelType}
                     </Typography>
                     <Typography>
                        engine: {item.engine}
                     </Typography> */}
                     {/* <Typography>
                        {item.sold === false?"Available":"Sold"}
                     </Typography> */}
                  </CardContent>
                  <CardActions>
                     {/* <Button variant="outlined" color="primary" onClick={() =>{setOpen(true); setListing(item)}}>
                     View
                     </Button> */}
                     {                       
                     listing === "" || listing=== undefined?
                     <div></div>
                     :
                     <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                        <AppBar className={classes.appBar}>
                           <Toolbar>
                              <IconButton edge="start" color="inherit" onClick={() =>
                                 {setOpen(false);setCarImageNum(1)}} aria-label="close">
                                 <CloseIcon />
                              </IconButton>
                              <Typography gutterBottom variant="h5" component="h2">
                                {listing.year} {listing.make} {listing.model}
                              </Typography>

                           </Toolbar>
                           
                        </AppBar>
                        
                        <Card className={classes.card} style={{display:"block",overflow:'auto'}}>
                           
                           <div style={{margin:"63px auto",display:"flex",maxWidth:"75%",height:"auto",justifyContent:"center"}}>
                           <img alt ="car" style={{marginTop:"63px",width:"100%",height:"auto",boxShadow: "0 4px 8px 0 rgb(0 0 0 / 10%), 0 4px 8px 0 rgb(0 0 0 / 10%)"}} src={listing.imgs[carImageNum-1]} ></img>
                           </div>
                              <div style={{display:"flex", justifyContent:"center"}}>
                              <Pagination count={listing.imgs.length} page={carImageNum} onChange={(event,val)=>
                              {setCarImageNum(val)}
                              } color="primary" showFirstButton showLastButton/>
                              </div>
                           <CardContent className="card-container">
                           <Link 
                           className="buyBtn"
                           autoFocus 
                           onClick={() =>
                              {setOpen(false);setCarImageNum(1)}} to={{
                              pathname: '/checkout',
                              search: `?id=${listing._id}&vin=${listing.vin}&price=${listing.price.$numberDecimal}`,}}
                              >
                              <Button style={{color:"white"}}>                                                                           
                              Buy
                              </Button>
                              </Link>
                           <div className="info-container">
                              {listing.sold === false?
                              <div className="infoBox">
                              <CheckIcon style={{ fontSize: 32, color:lightGreen[600] }}/>
                              <Typography variant="h4" component="h2">Available</Typography>
                              </div>
                              :
                              <div>Sold</div>}


                              <div className="infoBox">
                              <Typography variant="h5" component="h2">
                                 Color
                              </Typography>  
                              <Typography variant="h3" component="h2">
                              <OpacityIcon  style={{ fontSize: 32}}/> {listing.color}
                              </Typography>
                              </div>

                              <div className="infoBox">
                              <Typography variant="h5" component="h2">
                              drivetrain
                              </Typography>
                              <Typography variant="h3" component="h2">
                              <DriveEtaIcon style={{ fontSize: 32, color:blue[600] }}/> {listing.drivetrain}
                              </Typography>
                              </div>

                              <div className="infoBox"> 
                              <Typography variant="h5" component="h2">
                                 City 
                              </Typography> 
                              <Typography variant="h3" component="h2">
                              <LocalGasStationIcon style={{ fontSize: 32, color:purple[500] }}/> {listing.mpg.city}
                              </Typography>
                              </div>
                              <div className="infoBox">
                              <Typography variant="h5" component="h2">
                              Highway    
                              </Typography>   
                              <Typography variant="h3" component="h2">
                              <LocalGasStationIcon style={{ fontSize: 32, color:red[500] }}/>   {listing.mpg.highway}
                              </Typography>
                              </div>
                              <div className="infoBox"> 
                              
                              <Typography variant="h3" component="h2">
                                <MonetizationOnIcon style={{ fontSize: 32, color:lightGreen[600] }}/> {listing.price.$numberDecimal}
                              </Typography>
                              </div>
                              <div className="infoBox"> 
                              <Typography variant="h5" component="h2">
                                 Transmission
                              </Typography>
                              <Typography variant="h3" component="h2">
                              <DriveEtaIcon style={{ fontSize: 32, color:orange[600] }}/> {listing.transmission}
                              </Typography>
                              </div>
                              <div className="infoBox">
                              <Typography variant="h5" component="h2">
                              Fuel Type
                              </Typography>
                              <Typography variant="h3" component="h2">
                              <InvertColorsIcon style={{ fontSize: 32, color:blue[600] }}/> {listing.fuelType}
                              </Typography>
                              </div>
                              <div className="infoBox">
                              <Typography variant="h5" component="h2">
                                 Engine
                              </Typography>
                              <Typography variant="h3" component="h2">
                              <DriveEtaIcon style={{ fontSize: 32, color:purple[600] }}/> {listing.engine}
                              </Typography>
                              </div>

                              </div>
                              <div className="info-container-bottom">
                              <div className="infoBoxFeat"> 
                              <Typography variant="h3" component="h2">
                              <StarIcon  style={{ fontSize: 32, color:yellow[600]}}/>Features
                              </Typography>
                              <Typography variant="h5" component="h2">
                                 {listing.features.map((feature,featureIndex) => 
                                 <span key={featureIndex}>
                                 {/* We need a break tag until we add the css to create line breaks */}
                                 <br></br>
                                 &#9679; {feature}
                                 </span>)}
                              </Typography>
                              </div>
                              <br></br>
                              <div className="infoBoxDesc">
                              <Typography variant="h3" component="h2">
                                 <InfoOutlinedIcon style={{ fontSize: 32, color:blue[600]}}/> Description       
                              </Typography>               
                              <Typography>
                                 {listing.description}          
                              </Typography>
                              </div>
                              </div>
                           </CardContent>
                        </Card>
                     </Dialog>
                     }
                  </CardActions>
               </Card>
            </Grid>
            ))}
         </Grid>
      </Container>
      }
      {
      totalPages === 1?
      <div style={{display:"flex", justifyContent:"center"}}>
      <Pagination count={1} page={page} onChange={(event,val)=>
      setPage(val)} color="primary" showFirstButton showLastButton/>
      </div>
      :
      <div style={{display:"flex", justifyContent:"center"}}>
      <Pagination count={Math.ceil(totalPages/pageLimit)} page={page} onChange={(event,val)=>
      setPage(val)} color="primary" showFirstButton showLastButton/>
      </div>
      }
   </main>
   {/* Footer */}
   <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
         Footer
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
         Something here to give the footer a purpose!
      </Typography>
   </footer>
   {/* End footer */}
</React.Fragment>
  );
}
export default Landing;