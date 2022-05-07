import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

import Aisle from './aisles'
import BottomRightMission from './BottomRight';



const useStyles = makeStyles(theme => ({
    root: {
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    paper: {
      padding: theme.spacing(1, 3),
    },
  }));

 

  
function SetMission(props){
    const classes = useStyles();
    function handleClick(event) {
      event.preventDefault();
    props.history.push('./home')
    }
    return(
        <div style={{minHeight:'calc(100vh - 65px - 30px)',marginTop:'65px',background:'#F7F8FC',position:'relative',overflowX:'hidden',paddingBottom:'30px'}}>

<Paper elevation={0} className={classes.paper}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/userview/home" onClick={handleClick}>
            Home
          </Link>
          <Typography color="textPrimary">Set Mission</Typography>
        </Breadcrumbs>
      </Paper>
      <div style={{paddingLeft:'50px',marginTop:'15px'}}>
      <Aisle aisleSide='Left' aisleName='A1' aisleLength={5} />

      <Aisle aisleSide='Right' aisleName='A1' aisleLength={8} />
      <Aisle aisleSide='Left' aisleName='A2' aisleLength={8} /> 

      <Aisle aisleSide='Right' aisleName='A2' aisleLength={8} />
      <Aisle aisleSide='Left' aisleName='A3' aisleLength={8} /> 

      <Aisle aisleSide='Right' aisleName='A3' aisleLength={8} />
      <Aisle aisleSide='Left' aisleName='A4' aisleLength={8} /> 
      
      <Aisle aisleSide='Right' aisleName='A4' aisleLength={8} />
      <Aisle aisleSide='Left' aisleName='A5' aisleLength={8} /> 

      <Aisle aisleSide='Right' aisleName='A5' aisleLength={8} />
      <Aisle aisleSide='Left' aisleName='A6' aisleLength={8} />
      </div>


      <BottomRightMission />



        </div>
    );
}
export default SetMission;