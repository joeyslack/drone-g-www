import React, { Component } from 'react';
import Image from './findyourteam.png';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types'; 
import SwipeableViews from 'react-swipeable-views';
import Email from './Email';
import Sent from './Sent';
import './findyourTeam.css';


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

class FindYourTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {  value:0,email:null }
        this.handleNext=this.handleNext.bind(this);
        this.updateEmail=this.updateEmail.bind(this);
        this.handleBack=this.handleBack.bind(this);
    }
    handleNext(){
        this.setState({value:this.state.value+1})
           }
           handleBack(){
            this.setState({value:this.state.value-1})
               }
           updateEmail(email){
            
            this.setState({email:email})
               }
    render() { 
        return ( <div>
{console.log("aaa")}
<div style={{textAlign:'center',background:'white',float:'left',margin:'0px',padding:'0px',width:'40%', height:"100vh"}}>
<img src={Image} alt={"Find Your Team"} style={{marginTop:'40vh'}}/>
           </div>
            
            
            
            <div className="rightdiv">
               
                <div style={{height:'85vh'}}className="flex-containercol">
            <SwipeableViews
                   axis={'x'}
                   index={this.state.value}
                   onChangeIndex={this.handleValue}
                 >
           <TabPanel value={this.state.value} index={0}>
           
           <Email next={()=>this.handleNext()}  updateEmail={(email)=>this.updateEmail(email)} history={this.props.history}/>
                
                 </TabPanel>
                 <TabPanel value={this.state.value} index={1}>
                 <Sent  history={this.props.history} email={this.state.email}/>
                 </TabPanel>
                
                 </SwipeableViews>
           
           </div>
           
           { this.state.value===0? <p style={{paddingTop:'10px',fontSize:'13px',color:'grey',lineHeight:'19px',fontFamily:'SF UI Text'}}>Need a new team? <span onClick={()=>{this.props.history.push('./createATeam')}} className="link">Create a team</span></p> :
           <p style={{paddingTop:'10px',fontSize:'13px',color:'grey',lineHeight:'19px',fontFamily:'SF UI Text'}}>Wrong email? Please <span onClick={this.handleBack} className="link">re-enter email</span></p>
          }
           
           
                       </div>
           
                       </div>  );
    }
}
 
export default FindYourTeam;