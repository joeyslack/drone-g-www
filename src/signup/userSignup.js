import React, { Component } from 'react';
import Image2 from './images/image2.png';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Logo from '../images/logo.png'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Toolbar from '@material-ui/core/Toolbar';
import Input from '@material-ui/core/Input';
import MyContext from '../themeContext';


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
    marginTop: '0px',
     
      background:'white',
      width:'100%',
      marginLeft:'auto',
      marginRight:'auto',
    
      paddingBottom:'-40px',
      height:'35px'
  },
  dense: {
    marginTop: theme.spacing(1),
  },
  tick:{
  
  
    verticalAlign:'text-top'
  },
  input: {
    margin: theme.spacing(1),
    background:'white',
    padding:'10px'
  },

});



class UserSignup extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          eState:false,
          email:'',
password:'',paslength:false,special:false,unique:false
         }
         this.handlePass=this.handlePass.bind(this);
         this.updateState=this.updateState.bind(this);
         this.checkMe=this.checkMe.bind(this)
    }
    componentDidMount(){

      if(this.context.state['res']!=null){


        
        if(this.context.state['res'].profileObj!=null)
       { this.updateState(this.context.state['res'])}
       else{
alert("response error "+ this.context.state['res'].details)

       }
      }
  
     
      
    }
    checkMe(){

      if(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email))
{
  if(this.state.paslength&&this.state.special&&this.state.unique){
    alert('Sign up Approved')
  }
  else alert('Please enter a valid password')

}
else alert('Please enter a valid email address')

    }


    hasUpperCase(str) {  return (/[A-Z]/.test(str));}
  hasSymbol(str) {return (/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(str));}
  hasNumber(str) {return (/[0-9]/.test(str));}
isUnique(str){return !(/[password]/.test(str)); }
   

handleEmail=(event)=>{

 this.setState({ [event.target.name]:event.target.value})
}


handlePass(event){

  this.setState({ password:event.target.value });
  if(event.target.value)
  {
if(event.target.value.length>=8  ){ this.setState({paslength:true}) }
else {this.setState({paslength:false}) }

if(this.hasUpperCase(event.target.value)||this.hasSymbol(event.target.value)||this.hasNumber(event.target.value)) {this.setState({special:true}) }
else{this.setState({special:false}) } 

if(event.target.value.length>7&&this.isUnique(event.target.value)){this.setState({unique:true})}
else{this.setState({unique:false})}
  }

  else{
    this.setState({unique:false,special:false,paslength:false})
  }


    }

    updateState(res){
      this.setState({email:res.profileObj.email,eState:true})
  
    }
    
  
    render() { 
      
     
        const {classes}=this.props;
      
       
        return ( <div>
           <img src={Image2}  alt={"SignUp"} style={{float:'left',margin:'0px',padding:'0px',width:'40%', height:"100vh"}}/>

<div className="rightdiv">
    <img src={Logo} style={{paddingTop:'50px'}} alt="Nabla Ascent" />
    <div style={{height:'80vh',margin:'auto',width:'40%'}}className="flex-containercol">
    <p style={{margin:'0px',fontSize:'24px',lineHeight:'32px',fontWeight:'bold',fontFamily:'SF UI Text'}}> Sign up to <span style={{color:'#2493F3'}}>NablaTest</span></p>
    <p style={{paddingTop:'0px',paddingBottom:'10px',marginBottom:'0px',fontSize:'15px',color:'grey',lineHeight:'24px'}}>Enter your email</p>
    <Input
        disabled={this.state.eState}
        placeholder="Email address"
        className={classes.input}
        name='email'
        inputProps={{
          'aria-label': 'description',
          
        }}
        value={this.state.email}
        onChange={this.handleEmail}
      />
       <Input
        placeholder="Password"
        className={classes.input}
        inputProps={{
          'aria-label': 'description',
        }}
        value={this.state.password}
        onChange={this.handlePass}
      />

      <Toolbar disableGutters={true} >
   <div style={{}}> 
   <CheckCircleOutlineIcon className={classes.tick} color={this.state.paslength===true?"primary":"default"} />
    <span style={{lineHeight:'32px',fontSize:'13px',color:'rgb(35, 39, 53,0.8)'}}> 8 or more characters</span>
     </div>
    </Toolbar>

    <Toolbar style={{marginTop:'-30px'}} disableGutters={true} >
   <div style={{}}>
        <CheckCircleOutlineIcon className={classes.tick}  color={this.state.special===true?"primary":"default"} /> 
        <span style={{lineHeight:'32px',fontSize:'13px',color:'rgb(35, 39, 53,0.8)'}}> An upper-case letter, symbol, or number</span>
         </div> 
    </Toolbar>

    <Toolbar style={{marginTop:'-30px'}} disableGutters={true} >
   <div style={{}}> 
   <CheckCircleOutlineIcon className={classes.tick}  color={this.state.unique===true?"primary":"default"} />
    <span style={{lineHeight:'32px',fontSize:'13px',color:'rgb(35, 39, 53,0.8)'}}> Not a common password</span> 
    </div> 
    </Toolbar>


   
    <Button variant="contained" color="primary" style={{background:'#2493F3'}} className={classes.button} onClick={this.checkMe}>
       Sign Up
      </Button>
      <p style={{paddingTop:'10px',fontSize:'13px',color:'grey',lineHeight:'19px',fontFamily:'SF UI Text'}}>Need a new team? <span onClick={()=>{this.props.history.push('./createATeam')}} className="link">Create a team</span></p>
      </div>
    
    
    </div>


        </div>  );
    }
}
UserSignup.contextType = MyContext;
export default withStyles(styles1)(UserSignup);