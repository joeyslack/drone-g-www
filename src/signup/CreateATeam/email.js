import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Toolbar from '@material-ui/core/Toolbar';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Google from './Google/Google';
import DotLoader from 'react-spinners/DotLoader';
import GetData from './getDataDirect';




const styles1 =theme => ({
    button: {
      marginBottom:'0px', 
      marginTop: '10px', 
      minWidth:'150px',
      width:'100%', 
      minHeight:'40px',

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
      minWidth:'150px',
      width:'100%',
      background:'white',
      padding:'10px',
     
    },
  
  });



class SignupEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {  email:'' ,  password:'',paslength:false,special:false,unique:false,error:false ,username:'',company:'',mobile:''}
        this.checkMe=this.checkMe.bind(this);
        this.handlePass=this.handlePass.bind(this);
        this.getData=this.getData.bind(this);

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

        hasUpperCase(str) {  return (/[A-Z]/.test(str));}
        hasSymbol(str) {return (/[-!$%^&*()_+|~=`{}\]:";'<>?,.]/.test(str));}
        hasNumber(str) {return (/[0-9]/.test(str));}
      isUnique(str){return !(/[password]/.test(str)); }






      checkMe(){

        if(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email))
  {
    if(this.state.paslength&&this.state.special&&this.state.unique){


     this.setState({loading:true})
      GetData("http://localhost:26805/users/"+this.state.email, this.getData );
    

     
    }
    else alert('Please enter a valid password')
  
  }
  else alert('Please enter a valid email address')
  
      }

      getData(valid){

        this.setState({loading:false})
      console.log(valid)

if(valid)
{  
        if(valid.responseCode==="Success")
        {
          if(valid.response)
          {
            if(valid.response.isExist===false)
            {
                this.props.updateState('email',this.state.email);
                this.props.updateState('password',this.state.password);
                this.props.next();
            }
              else {  console.log('User Already Exist'); this.setState({error:true}) }
          }
            else alert("Undefined Response")
        }
        else
        {
          console.log(valid)
          this.setState({error:true})
        }
}
else{ alert("Undefined Response") }
        
      
      }

        
handleEmail=(event)=>{

  this.setState({ [event.target.name]:event.target.value})
 }
    render() { 
        const {classes}=this.props;
        return ( 
          <div style={{}}>

          {
            this.state.loading?
            
               <div style={{marginLeft:'calc(50% - 50px)',height:'130px'}} >
               <DotLoader sizeUnit={"px"} size={50} color={'#e7e7e7'} loading={true} />
                </div>
               :
               
               <div style={{margin:'auto',width:'50%'}} >
          <Toolbar>
            <p style={{margin:'auto',fontSize:'24px',lineHeight:'32px',fontWeight:'bold',fontFamily:'SF UI Text'}}>Create a new team</p>
            </Toolbar> 
    <p style={{paddingTop:'0px',paddingBottom:'10px',marginBottom:'0px',fontSize:'15px',color:'grey',lineHeight:'24px'}}>Enter your email address</p>
    
    <Input
        placeholder="User Name"
        className={classes.input}
        inputProps={{
          'aria-label': 'description',
        }}
        value={this.state.username}
        onChange={this.handleEmail} 
        name='email'

      />
      <Input
        placeholder="Email Address"
        className={classes.input}
        inputProps={{
          'aria-label': 'description',
        }}
        value={this.state.email}
        onChange={this.handleEmail} 
        name='email'

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

      <Input
placeholder="Company Name"
        className={classes.input}
        inputProps={{
          'aria-label': 'description',
        }}
        value={this.state.company}
        onChange={this.handleEmail}
      />

<Input
placeholder="Mobile #"
        className={classes.input}
        inputProps={{
          'aria-label': 'description',
        }}
        value={this.state.mobile}
        onChange={this.handleEmail}
      />


{this.state.error?<div style={{color:'red'}}> User Already Exist !</div>:null}

    
<div style={{display:'block',textAlign:"left",paddingBottom:'5px',marginTop:'30px'}}>
   <CheckCircleOutlineIcon className={classes.tick} color={this.state.paslength===true?"primary":"default"} />
    <span style={{lineHeight:'26px',fontSize:'13px',color:'rgb(35, 39, 53,0.8)',verticalAlign:'top'}}> 8 or more characters</span>
     </div>
  

    
   <div style={{display:'block',textAlign:"left",paddingBottom:'5px'}}>
        <CheckCircleOutlineIcon className={classes.tick}  color={this.state.special===true?"primary":"default"} /> 
        <span style={{lineHeight:'26px',fontSize:'13px',color:'rgb(35, 39, 53,0.8)',verticalAlign:'top'}}> An upper-case letter, symbol, or number</span>
         </div> 


         <div style={{display:'block',textAlign:"left",paddingBottom:'5px'}}> 
   <CheckCircleOutlineIcon className={classes.tick}  color={this.state.unique===true?"primary":"default"} />
    <span style={{lineHeight:'26px',fontSize:'13px',color:'rgb(35, 39, 53,0.8)',verticalAlign:'top'}}> Not a common password</span> 
    </div> 
    


    <br/>
    <Button variant="contained" color="primary" style={{background:'#2493F3'}} className={classes.button} onClick={this.checkMe}>
        Continue
      </Button>
      {/* <Google history={this.props.history} /> */}
      <p style={{paddingTop:'10px',fontSize:'13px',color:'grey',lineHeight:'19px',fontFamily:'SF UI Text'}}>By continuing, you're agreeing to our 
       <a className="link" href="/TermsAndConditions"> Customer <br/> Terms of Service, Privacy Policy,</a> and <span className="link" onClick={()=>{this.props.history.push('./termsAndConditions')}} >  Cookie Policy</span></p>  
        
        
      </div> }
      </div>);
    }
}
 
export default withStyles(styles1)(SignupEmail);