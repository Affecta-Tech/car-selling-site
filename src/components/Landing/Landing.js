import React, { useEffect, useState } from 'react';
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
  return <Slide direction="up" ref={ref} {...props} />;
});
// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let Album = () => {
  const [cars, setCars] = useState([])
  const [page, setPage] = useState(1)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {/* {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'} */}
    </Typography>
  );
}

var getCars = () => {
  fetch('http://localhost:8080/cars/', {
    method: 'get', 
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  }).then(res=>res.json())
    .then(res => setCars(res))
    .catch(err => console.log(err))
  

}
  const getCars3 = (carID) => {
    console.log("Viewing car: ", carID)
  }

  const classes = useStyles();
  // var getCars2 = () => {
    
  //   const newList = cars.map((item, index) =>
  //   <div key={index} className="individual-dataset">
        
  // <button text="View" onClick={() => null}>{item.color}</button>
  //       {/* forms for hooking up buttons lol why
  //               <form onSubmit={deleteDataset}>
  //                   <input className="hidden" name="datasetMedia" value={item._id["$oid"]} onChange={onChangeErrorHandle} placeholder={item._id["$oid"]}></input>
  //               </form>
            
  //           <form onSubmit={getSpecificDatset}>
  //           <input className="hidden" name="datasetMedia" value={item._id["$oid"]} onChange={onChangeErrorHandle} placeholder={item._id["$oid"]}></input>
  //               <PrButton
  //               className="form-button"
  //               variant="outline-primary"
  //               type="submit" 
  //           >
  //               View This Dataset
  //                   </Button>{' '}
  //           </form> 
  //           */}
  //       {/* <p>Dataset ID: {item._id["$oid"]}</p>
  //       <p>Created At: {cleanDate(item.createdAt["$date"])}</p>
  //       <p>Complete: {(item.isActive).toString()}</p>
  //       <p>Dataset Name: {item.name}</p>
  //       <p>Updated At: {cleanDate(item.updatedAt["$date"])}</p>
  //       <SecondaryButton text="Delete" onClick={() => deleteDataset(item._id['$oid'])}></SecondaryButton> */}
  //   </div>
  //   // eslint-disable-line react-hooks/exhaustive-deps
  // );
  // return newList
  // }
  useEffect(() => {

    getCars()
}, []);
console.log(cars)

  return (
    <React.Fragment>
    <NavBar value={0}/>
    <main>
       {/* Hero unit */}
       <div className={classes.heroContent}>
          <Container maxWidth="sm">
             <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Album layout
             </Typography>
             <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Something short and leading about the collection below—its contents, the creator, etc.
                Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                entirely.
             </Typography>
             <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                   <Grid item>
                      <Button variant="contained" color="primary">
                      Main call to action
                      </Button>
                   </Grid>
                   <Grid item>
                      <Button variant="outlined" color="primary">
                      Secondary action
                      </Button>
                   </Grid>
                </Grid>
             </div>
          </Container>
       </div>
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
       <div styles={{width:"50%"}}>
          <Pagination count={10} color="primary"/>
       </div>
    </main>
    {/* Footer */}
    <footer className={classes.footer}>
       <Typography variant="h6" align="center" gutterBottom>
          Footer
       </Typography>
       <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
       </Typography>
       <Copyright />
    </footer>
    {/* End footer */}
 </React.Fragment>
  );
}
export default Album;