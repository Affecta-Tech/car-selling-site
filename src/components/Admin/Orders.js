import React, {
  useEffect,
  useState
} from 'react';
import AdminNavBar from './AdminNavBar'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Pagination from '@material-ui/lab/Pagination';
import RefreshIcon from '@material-ui/icons/Refresh';
import CancelIcon from '@material-ui/icons/Cancel';
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
}));


const columns = [
  { id: '_id', label: 'ID', width: 70 },
  { id: 'name', label: 'Name', width: 130 },
  { id: 'address1', label: 'Address 1', width: 130 },
  { id: 'address2', label: 'Address 2', width: 130 },
  { id: 'city', label: 'City', width: 130 },
  { id: 'state', label: 'State', width: 130 },
  { id: 'zip', label: 'Zip', width: 130 },
  { id: 'country', label: 'Country', width: 130 },
  { id: 'stripeID', label: 'Stripe ID', width: 130 },
  { id: 'carVin', label: 'Car Vin', width: 130 },
];

// 
export default function Orders() {
  const [orders, setOrders] = useState([])
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("")
  const [searchBy, setSearchBy] = useState("_id")
  const [databaseID, setDatabaseID] = useState("")
  const [name, setName] = useState("")
  const [stripeID, setStripeID] = useState("")
  const [carVin, setCarVin] = useState("")
  const [page, setPage] = React.useState(1);
  const [pageLimit, setPageLimit] = React.useState(10);
  const [totalOrders, setTotalOrders] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 const pageLimitChange = (event) => {
      setPageLimit(event.target.value);
  }
  const searchDB = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }
  const refreshAll = () => {
    getOrders()
  }
  const clearAll = () => {
    setDatabaseID("")
    setName("")
    setStripeID("")
    setCarVin("")
    setSearchTerm("")
    getOrders()
  }
  const search = (e) => {
    e.preventDefault()
    if (searchBy === '_id'){
      setDatabaseID(searchTerm)
    } else if (searchBy === 'name'){
      setName(searchTerm)
    }  else if (searchBy === 'stripeID'){
      setStripeID(searchTerm)
    }  else if (searchBy === 'carVin'){
      setCarVin(searchTerm)
    }
    // getOrders()
  }
  const searchByChange = (event) => {
    setDatabaseID("")
    setName("")
    setStripeID("")
    setCarVin("")
    setSearchBy(event.target.value)
  }

    var getOrders = () => {
      fetch(`http://localhost:8080/admin/admin-orders?page=${page}&limit=${pageLimit}&_id=${databaseID}&name=${name}&stripeID=${stripeID}&carVin=${carVin}`, {
              method: 'get',
              headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
              }
          }).then(res => res.json())
          .then(res => {
              console.log(res)
              // setResultMessage(res.results)
              setOrders(res.data)
              setTotalOrders(res.total)
              // setListing(cars[0])
              // setTotalPages(res.results.count)
          })
          .catch(err => console.log(err))


  }
  useEffect(() => {
    getOrders()
  }, [page,pageLimit,databaseID,name,stripeID,carVin]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
      <div>
          <AdminNavBar value={3}/>
          <div style={{ height: 400, marginLeft:"25px", paddingTop:"25px"}}>
          <Paper component="form" className={classes.root}>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
              >
              <MenuIcon />
              </IconButton>
              <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              >
              <MenuItem>Place Holder For Menu</MenuItem>
              </Menu>
            <InputBase
                className={classes.input}
                placeholder="Search Orders"
                inputProps={{ 'aria-label': 'search orders' }}
                onChange={searchDB}
                value={searchTerm}
            />
          <IconButton onClick={search} className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
            <FormControl variant="outlined" className={classes.formControl} style={{width:"170px"}}>
              <InputLabel id="demo-simple-select-outlined-label">Search By</InputLabel>
              <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={searchBy}
                  onChange={searchByChange}
                  label="Page Limit"
                  >
                  <MenuItem value={"_id"}>Database ID</MenuItem>
                  <MenuItem value={"name"}>Name</MenuItem>
                  <MenuItem value={"stripeID"}>Stripe ID</MenuItem>
                  <MenuItem value={"carVin"}>Vin</MenuItem>
              </Select>
            </FormControl>
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
            <IconButton className={classes.iconButton} aria-label="menu"  onClick={refreshAll}>
                <RefreshIcon/>
            </IconButton>
            <IconButton className={classes.iconButton} aria-label="menu"  onClick={clearAll}>
                <CancelIcon/>
            </IconButton>
            </Paper>

            <TableContainer className={classes.container} component={Paper}>
            <Table stickyHeader className={classes.table} aria-label="sticky table">
              {/* <caption>A basic table example with a caption</caption> */}
              <TableHead>
              <TableRow>
              {columns.map((column,index) => (
                    <TableCell component="th" scope="row" key={index}>
                      {column.id}
                    </TableCell>
                ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((row,index) => (
                  <TableRow key={index}>
                    <TableCell >{row._id}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.address1}</TableCell>
                    <TableCell align="right">{row.address2}</TableCell>
                    <TableCell align="right">{row.city}</TableCell>
                    <TableCell align="right">{row.state}</TableCell>
                    <TableCell align="right">{row.zip}</TableCell>
                    <TableCell align="right">{row.country}</TableCell>
                    <TableCell align="right">{row.stripeID}</TableCell>
                    <TableCell align="right">{row.carVin}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br></br>
          {
          totalOrders === 1?
          <div style={{display:"flex", justifyContent:"center"}}>
          <Pagination count={1} page={page} onChange={(event,val)=>
          setPage(val)} color="primary" showFirstButton showLastButton/>
          </div>
          :
          <div style={{display:"flex", justifyContent:"center"}}>
          <Pagination count={Math.ceil(totalOrders/pageLimit)} page={page} onChange={(event,val)=>
          setPage(val)} color="primary" showFirstButton showLastButton/>
          </div>
          }
          </div>
      </div>

  );
}
