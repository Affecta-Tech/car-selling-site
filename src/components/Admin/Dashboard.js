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
import './styles.css';

function Dashboard() {
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("")
  const [carYear, setCarYear] = useState("")
    const history = useHistory();
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">

    </Typography>
  );
}


var SubmitLogin = (e) => {
  e.preventDefault()
  setErrorMessage("")
  console.log(e.target.email.value)
  console.log(e.target.password.value)
  submiter(e.target.email.value, e.target.password.value).then(res=>res.message=="Success"?history.push("/admin-dash"):setErrorMessage("Login Failed"))
  

//   fetch(`http://localhost:8080/cars/admin`, {
//     method: 'post',
//     body:
//       JSON.stringify({"username":e.target.email.value,
//       "pw":e.target.password.value}),
//     headers: {
//         'Accept': 'application/json, text/plain, */*',
//         'Content-Type': 'application/json'
//     },
//     credentials: 'same-origin'}).then(res => console.log(res))
// .then(res => console.log(res))
// .catch(err => console.log(err))
}
var submiter = (username,pw) => {
  const fetchData = async () => {
    const result = await fetch(`http://localhost:8080/cars/admin`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"username":username,
      "pw":pw}),
      method: "POST", credentials: 'same-origin'
    });
    let response = await result.json();
    return response
  }
  return fetchData()
} 
var lineData = {
  series: [{
    name: "Session Duration",
    data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
  },
  {
    name: "Page Views",
    data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
  },
  {
    name: 'Total Visits',
    data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
  }
],
options: {
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: [5, 7, 5],
    curve: 'straight',
    dashArray: [0, 8, 5]
  },
  title: {
    text: 'Page Statistics',
    align: 'left'
  },
  legend: {
    tooltipHoverFormatter: function(val, opts) {
      return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
    }
  },
  markers: {
    size: 0,
    hover: {
      sizeOffset: 6
    }
  },
  xaxis: {
    categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
      '10 Jan', '11 Jan', '12 Jan'
    ],
  },
  tooltip: {
    y: [
      {
        title: {
          formatter: function (val) {
            return val + " (mins)"
          }
        }
      },
      {
        title: {
          formatter: function (val) {
            return val + " per session"
          }
        }
      },
      {
        title: {
          formatter: function (val) {
            return val;
          }
        }
      }
    ]
  },
  grid: {
    borderColor: '#f1f1f1',
  }
},


};

var barData = {
  options: {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    }
  },
  series: [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }
  ]
};
  var pieData = {
  options: {},
  series: [44, 55, 41, 17, 15],
  labels: ['A', 'B', 'C', 'D', 'E']
}
function generateData(count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = "w" + (i + 1).toString();
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({
      x: x,
      y: y
    });
    i++;
  }
  return series;
}

var heatMapOptions = {
  series: [
    {
      name: "Metric1",
      data: generateData(18, {
        min: 0,
        max: 90
      })
    },
    {
      name: "Metric2",
      data: generateData(18, {
        min: 0,
        max: 90
      })
    },
    {
      name: "Metric3",
      data: generateData(18, {
        min: 0,
        max: 90
      })
    },
    {
      name: "Metric4",
      data: generateData(18, {
        min: 0,
        max: 90
      })
    },
    {
      name: "Metric5",
      data: generateData(18, {
        min: 0,
        max: 90
      })
    },
    {
      name: "Metric6",
      data: generateData(18, {
        min: 0,
        max: 90
      })
    },
    {
      name: "Metric7",
      data: generateData(18, {
        min: 0,
        max: 90
      })
    },
    {
      name: "Metric8",
      data: generateData(18, {
        min: 0,
        max: 90
      })
    },
    {
      name: "Metric9",
      data: generateData(18, {
        min: 0,
        max: 90
      })
    }
  ],
  chart: {
    height: 350,
    type: "heatmap"
  },
  plotOptions: {
     heatmap: {
       radius: 0
     }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 0
  },
  colors: ["#008FFB"]
};
  return (
<div>
   <AdminNavBar value={2}/>
   
   <div style={{display:"flex",marginLeft: "180px",
    flexDirection: "row",
    flexWrap: "wrap",width:"80vw"}}>
      <CssBaseline />
        <div style={{display:"flex", flexDirection: "row", flexWrap: "wrap",width:"100%",marginTop:"20px"}}>
        <div className="charts">
        <Chart 
        options={lineData.options} 
        series={lineData.series} 
        type="line" height={350} 
        width={500} 
        />
        </div>
        <div className="charts">
        <Chart
        options={barData.options}
        series={barData.series}
        type="bar"
        height={350}
        width={500}
        />
        </div>
        </div>
        <div style={{display:"flex", flexDirection: "row", flexWrap: "wrap",width:"100%",marginBottom:"20px"}}>
        <div className="charts">
        <Chart 
        options={heatMapOptions.plotOptions} 
        series={heatMapOptions.series} 
        type="heatmap" 
        height={350} 
        width={500}
        />
        </div>
        <div className="charts">
        <Chart 
        options={pieData.options} 
        series={pieData.series} 
        type="donut" 
        height={350} 
        width={500}
        />
        </div>
        </div>
   </div>
   
</div>
  );
}

export default Dashboard;