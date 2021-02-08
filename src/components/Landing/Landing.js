import React, {
  useEffect,
  useState
} from 'react';
import AppBar from '@material-ui/core/AppBar';
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
import NavBar from '../NavBar/NavBar.js'
import { Link } from 'react-router-dom'
import Pagination from '@material-ui/lab/Pagination';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [resultMessage, setResultMessage] = useState("")
  const [carYear, setCarYear] = useState("")
  const [pageLimit, setPageLimit] = useState(10)
  const [carColor, setCarColor] = useState("")
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  var getCars = () => {
      fetch(`http://localhost:8080/cars/?page=${page}&limit=${pageLimit}&color=${carColor}&year=${carYear}`, {
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
  }, [page, pageLimit, carColor, carYear]);

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
      resultMessage == undefined?
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
               <Card className={classes.card}>
                  <CardMedia
                     className={classes.cardMedia}
                     image="https://images.pexels.com/photos/2071/broken-car-vehicle-vintage.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                     title="Image title"
                     />
                  <CardContent className={classes.cardContent}>
                     <Typography gutterBottom variant="h5" component="h2">
                        {item.year} {item.make} {item.model}
                     </Typography>
                     <Typography>
                        {item.sold === false?"Available":"Sold"}
                     </Typography>
                     <Typography>
                        Color: {item.color}
                     </Typography>
                     <Typography>
                        description: {item.description}          
                     </Typography>
                     <Typography>
                        drivetrain: {item.drivetrain}
                     </Typography>
                     <Typography>
                        Features: {item.features.map((feature,featureIndex) => 
                        <span key={featureIndex}>
                        {/* We need a break tag until we add the css to create line breaks */}
                        <br></br>
                        --{feature}
                        </span>)}
                     </Typography>
                     <Typography>
                        city mpg: {item.mpg.city}
                     </Typography>
                     <Typography>
                        highway mpg: {item.mpg.highway}
                     </Typography>
                     <Typography>
                        price: {item.price.$numberDecimal}
                     </Typography>
                     <Typography>
                        transmission: {item.transmission}
                     </Typography>
                     <Typography>
                        fuelType: {item.fuelType}
                     </Typography>
                     <Typography>
                        engine: {item.engine}
                     </Typography>
                  </CardContent>
                  <CardActions>
                     <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                     View
                     </Button>
                     <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                        <AppBar className={classes.appBar}>
                           <Toolbar>
                              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                 <CloseIcon />
                              </IconButton>
                              <Typography variant="h6" className={classes.title}>
                                 {item._id}
                              </Typography>
                              <Link autoFocus color="inherit" onClick={handleClose} to={{
                              pathname: '/checkout',
                              search: `?id=${item._id}`,}}>
                              Buy
                              </Link>
                           </Toolbar>
                        </AppBar>
                        <Card className={classes.card} style={{overflow:'auto'}}>
                           <CardMedia
                              className={classes.cardMedia}
                              image="https://images.pexels.com/photos/2071/broken-car-vehicle-vintage.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                              title="Image title"
                              />
                           <CardContent className={classes.cardContent}>
                              <Typography gutterBottom variant="h5" component="h2">
                                 {item.year} {item.make} {item.model}
                              </Typography>
                              <Typography>
                                 {item.sold === false?"Available":"Sold"}
                              </Typography>
                              <Typography>
                                 Color: {item.color}
                              </Typography>
                              <Typography>
                                 description: {item.description}          
                              </Typography>
                              <Typography>
                                 drivetrain: {item.drivetrain}
                              </Typography>
                              <Typography>
                                 Features: {item.features.map((feature,featureIndex) => 
                                 <span key={featureIndex}>
                                 {/* We need a break tag until we add the css to create line breaks */}
                                 <br></br>
                                 --{feature}
                                 </span>)}
                              </Typography>
                              <Typography>
                                 city mpg: {item.mpg.city}
                              </Typography>
                              <Typography>
                                 highway mpg: {item.mpg.highway}
                              </Typography>
                              <Typography>
                                 price: {item.price.$numberDecimal}
                              </Typography>
                              <Typography>
                                 transmission: {item.transmission}
                              </Typography>
                              <Typography>
                                 fuelType: {item.fuelType}
                              </Typography>
                              <Typography>
                                 engine: {item.engine}
                              </Typography>
                           </CardContent>
                        </Card>
                     </Dialog>
                  </CardActions>
               </Card>
            </Grid>
            ))}
         </Grid>
      </Container>
      }
      {
      totalPages == 1?
      <div style={{display:"flex", justifyContent:"center"}}>
      <Pagination count={1} page={page} onChange={(event,val)=>
      setPage(val)} color="primary" showFirstButton showLastButton/>
      </div>
      :
      <div style={{display:"flex", justifyContent:"center"}}>
      <Pagination count={Math.round(totalPages/pageLimit)} page={page} onChange={(event,val)=>
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