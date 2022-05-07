import React, { Component } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import '../../fonts/font.css'
import './setmission.css'
import Button from '@material-ui/core/Button';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Paper } from '@material-ui/core';
 

const styles=theme=>({

    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        width:'100%'
      },

});



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
      
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box p={0}>{children}</Box>
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }





class BottomRightMission extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen:true ,value:0 }
    }

    updateValue=(event,newValue)=>{
      console.log(newValue)
        this.setState({value:newValue})
        }

    bottomleft=()=>{


        if(this.state.isOpen)
        {  
          
            document.getElementById('arrow1').style.transform="scaleX(-1)";
            document.getElementById('bottomleft').style.right='0'
        
    this.setState({isOpen:false})
    }
        else
        {
          //let screenWidth = window.screen.width;
          //let goBack='-22.5%'
          //Sconsole.log()
          // if(screenWidth*0.25<300){
          //       goBack='-270px'
          // }

        document.getElementById('bottomleft').style.right="-301px";
          document.getElementById('arrow1').style.transform="scaleX(1)"
        this.setState({isOpen:true})}
    }


    render() { 
        const {classes}=this.props;
        return ( <div id="bottomleft" className="BottomRightMission" >

      
<div className="shadow arrowbox3" style={{}} onClick={this.bottomleft}>
          <ArrowBackIosIcon color="primary" id='arrow1'/>
        </div>


       
         <div  className="shadow listbox3" style={{}}>


     <div className={classes.root}>
      <Paper position="static" square>
        <Tabs value={this.state.value} onChange={this.updateValue} aria-label="simple tabs example"
         centered
        indicatorColor="primary"
        textColor="primary"
        >
          <Tab label="Mission Details" style={{color:this.state.value===0?'black':'',textTransform:'none',fontSize:'13px',fontFamily:'SF UI Text Bold'}} {...a11yProps(0)} />
          <Tab label="Past Missions"   style={{color:this.state.value===1?'black':'',textTransform:'none',fontSize:'13px',fontFamily:'SF UI Text Bold'}} {...a11yProps(1)} />
          
        </Tabs>
      </Paper>
      <TabPanel value={this.state.value} index={0}>
      <p style={{margin:'0px',padding:'10px',fontFamily:'SF UI Text Regular',fontSize:'11px',color:'#8B90A0'}}>Selected units to scan:</p>
      <div style={{position:'absolute',bottom:'10px',padding:'10px',width:'calc(300px - 20px)',background:''}}> <Button style={{borderRadius:'0px',width:"calc(100%)"}} variant='contained' color='primary'>Set Mission</Button></div>
      </TabPanel>
      <TabPanel value={this.state.value} index={1}>
      <p style={{margin:'0px',padding:'10px',fontFamily:'SF UI Text Regular',fontSize:'11px',color:'#8B90A0'}}>Missions:</p>
      </TabPanel>
      
      
    </div>


       
        </div>
         
        
        
        
        
        </div>  );
    }
}
 
export default withStyles(styles)(BottomRightMission);