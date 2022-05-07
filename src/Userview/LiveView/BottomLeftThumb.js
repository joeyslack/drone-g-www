import React, { Component } from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

// import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import '../../fonts/font.css'
import './LiveView.css'

// import Tab from '@material-ui/core/Tab';
// import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MapView from '../MapView/MapView.js'
 

const styles=theme=>({

    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        width:'100%',
        height:'100%'
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
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  // function a11yProps(index) {
  //   return {
  //     id: `simple-tab-${index}`,
  //     'aria-controls': `simple-tabpanel-${index}`,
  //   };
  // }





class BottomLeftThumb extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen:false ,value:0 }
    }

    updateValue=(event,newValue)=>{
      console.log(newValue)
        this.setState({value:newValue})
        }

    bottomleft=()=>{


        if(this.state.isOpen)
        {
          document.getElementById('LiveViewbottomleft').style.left='-290px'
          document.getElementById('LiveViewarrow1').style.transform="scaleX(1)"
          this.setState({isOpen:false})
    }
        else
        {
          document.getElementById('LiveViewarrow1').style.transform="scaleX(-1)";
          document.getElementById('LiveViewbottomleft').style.left='0px'
          this.setState({isOpen:true})}
    }


    render() { 
        const {classes}=this.props;
        return ( <div id="LiveViewbottomleft" className="LiveViewBottomLeftThumb">

      
<div className="LiveViewshadow LiveViewarrowbox2"  style={{float:'right'}} onClick={this.bottomleft}>
          <ArrowForwardIosIcon color="primary" style={{color:'#8B90A0'}} id='LiveViewarrow1'/>
        </div>


       
         <div  className="LiveViewshadow LiveViewlistbox1" style={{}}>


     <div className={classes.root}>
       <MapView StructureResponse={this.props.StructureResponse} Structure={this.props.Structure} LevelCount={this.props.LevelCount}/>
      {/* <AppBar position="static"        >  
        <Tabs  variant="scrollable" style={{width:'260px'}} value={this.state.value} onChange={this.updateValue} aria-label="simple tabs example">
          <Tab style={{width:"10px"}} label="Item One" {...a11yProps(0)} />
          <Tab style={{width:"33%"}} label="Item Two" {...a11yProps(1)} />
          <Tab style={{width:"33%"}}label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={this.state.value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={this.state.value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={this.state.value} index={2}>
        Item Three
      </TabPanel> */}
      
    </div>


       
        </div>
         
        
        
        
        
        </div>  );
    }
}
 
export default withStyles(styles)(BottomLeftThumb);