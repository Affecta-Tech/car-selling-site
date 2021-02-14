import React, {
    useEffect,
    useState
  } from 'react';
  import Avatar from '@material-ui/core/Avatar';
  import Button from '@material-ui/core/Button';
  import CssBaseline from '@material-ui/core/CssBaseline';
  import TextField from '@material-ui/core/TextField';
  import FormControlLabel from '@material-ui/core/FormControlLabel';
  import Checkbox from '@material-ui/core/Checkbox';
  import Link from '@material-ui/core/Link';
  import Grid from '@material-ui/core/Grid';
  import Box from '@material-ui/core/Box';
  import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
  import Typography from '@material-ui/core/Typography';
  import Container from '@material-ui/core/Container';
  import AdminNavBar from './AdminNavBar'
  import { useHistory } from "react-router-dom";
  import { makeStyles } from '@material-ui/core/styles';
  import Chart from "react-apexcharts";
  import DragDrop from "./DragDrop"

  
  function AddCar() {
    return (
        <div>
            <AdminNavBar value={1}/>
            <div style={{marginLeft:"180px"}}>
                <span>Still gotta make this, but don't worry it's ez af lol</span>
            </div>
            <DragDrop />
        </div>
    );
  }
  
  export default AddCar;