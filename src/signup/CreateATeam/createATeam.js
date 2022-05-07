import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types'; 
import SwipeableViews from 'react-swipeable-views';
import NewTeam from '../images/NewTeam.png';
import Successfully from '../images/successfully.png';
import Email from './email';
import Team from './team';  
import TeamMember from './teamMember';
import Success from './success';
import Logo from '../images/logo.png';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';


import './createATeam.css';
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
       style={{padding:'0px',margin:'0px'}}
      >
        <Box style={{padding:'0px'}} p={1}>{children}</Box>
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

class CreateATeam extends Component {
    constructor(props) {
        super(props);
        this.state = {  value:0 }
        this.handleNext=this.handleNext.bind(this);
        this.handleBack=this.handleBack.bind(this);
    }

    updateState(state,value){

      this.setState({[state]:value})
    
    }
    handleIndex(index){}
    handleNext(){
 this.setState({value:this.state.value+1})
    }
    handleBack(){
        
        if(this.state.value===0){
            this.props.history.push('/Signin')
        }
else this.setState({value:this.state.value-1})
    }
    render() { 
        return (
            <div>

 <div style={{textAlign:'center',background:'white',float:'left',margin:'0px',padding:'0px',width:'40%', height:"100vh"}}>

 {this.state.value <3 ? <img src={NewTeam} alt="NewTeam" style={{marginTop:'40vh'}}/> : <img src={Successfully} alt="Successfull" style={{marginTop:'40vh'}}/> }
 </div>
 
 
 
 <div className="rightdiv">


   <div style={{ textAlign:'left',marginTop:'10px' }}>
   <Button style={{position:'',left:'0px',margin:'0px',paddingLeft:'20px'}} onClick={this.handleBack} startIcon={<ArrowBackIosIcon />} > Back </Button>
   </div>


   <div style={{marginTop:'10px' }}>
   <img src={Logo} style={{}} alt="Nabla Ascent" />
   </div>
 
     <div style={{height:'84vh'}} className="flex-containercol">
 <SwipeableViews
        axis={'x'}
        index={this.state.value}
        onChangeIndex={this.handleValue}
      >
<TabPanel value={this.state.value} index={0}>

<Team  updateState={(state,value)=>this.updateState(state,value)} back={()=>this.handleBack()} next={()=>this.handleNext()} history={this.props.history}/>
     
      </TabPanel>
      <TabPanel value={this.state.value} index={1}>
      <Email  updateState={(state,value)=>this.updateState(state,value)} back={()=>this.handleBack()} next={()=>this.handleNext()}  history={this.props.history}/>
      </TabPanel>
      <TabPanel value={this.state.value} index={2}>
      <TeamMember  back={()=>this.handleBack()} next={()=>this.handleNext()} email={this.state.email} password={this.state.password} team={this.state.team}  history={this.props.history}/>
      </TabPanel>
      <TabPanel value={this.state.value} index={3}>
      <Success  history={this.props.history}/>
      </TabPanel>
      </SwipeableViews>

</div>
{/*this.state.value===0?
<p style={{paddingTop:'10px',fontSize:'13px',color:'grey',lineHeight:'19px',fontFamily:'SF UI Text'}}>Dont know your team's name? <a className="link" href="./findYourTeam" onClick={(event)=>{event.preventDefault(); this.props.history.push('./findYourTeam')}}>Find Your team</a></p>
:null*/}

            </div>

            </div>
          );
    }
}

export default CreateATeam;