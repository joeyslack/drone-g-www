import React, { Component } from 'react';
import Image2 from './images/image2.png';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Logo from './images/logo.png'
import Input from '@material-ui/core/Input';

import './signup.css';

const styles1 =theme => ({
  button: {
    marginBottom:'0px',
    marginTop: '10px',
    width:'100%',
    height:'3vw',
    marginLeft:'auto',
    marginRight:'auto',
    
  },
  textField: {
    marginBottom:'0px',
    marginTop: '10px',
      boxSizing:'border-box',
      background:'white',
      width:'100%',
      marginLeft:'auto',
      marginRight:'auto',
  },
  dense: {
    marginTop: theme.spacing(1),
  },
  input: {
    margin: theme.spacing(1),
    background:'white',
    padding:'10px'
  },

});


class ManagerSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {classes}=this.props;
        return ( <div>
           <img src={Image2}  alt={"SignUp"} style={{float:'left',margin:'0px',padding:'0px',width:'40%', height:"100vh"}}/>

<div className="rightdiv">
    <img src={Logo} style={{paddingTop:'50px'}} alt="Nabla Ascent" />
    <div style={{height:'80vh',width:'40%',margin:'auto'}}className="flex-containercol">
    <p style={{margin:'0px',fontSize:'24px',lineHeight:'32px',fontWeight:'bold',fontFamily:'SF UI Text'}}>Sign in to your team</p>
    <p style={{paddingTop:'0px',paddingBottom:'0px',marginBottom:'0px',fontSize:'15px',color:'grey',lineHeight:'24px'}}>Enter your email</p>
    <Input
        placeholder="Team Name"
        className={classes.input}
        inputProps={{
          'aria-label': 'description',
        }}
      />
     


    <Button variant="contained" color="primary" style={{background:'#2493F3'}} className={classes.button}>
        Continue
      </Button>
      <p style={{paddingTop:'10px',fontSize:'13px',color:'grey',lineHeight:'19px',fontFamily:'SF UI Text'}}>Dont know your team's name? <a className="link" href='./findyourTeam' onClick={(event)=>{ event.preventDefault(); this.props.history.push('./findYourTeam')}}>Find Your team</a></p>
      </div>
      <p style={{paddingTop:'10px',fontSize:'13px',color:'grey',lineHeight:'19px',fontFamily:'SF UI Text'}}>Need a new team? <span onClick={()=>{this.props.history.push('./createATeam')}} className="link">Create a team</span></p>
    
    
    </div>


        </div>  );
    }
}
 
export default withStyles(styles1)(ManagerSignup);