import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button'

const styles1 =theme => ({
    button: {
      marginBottom:'0px',
      marginTop: '10px',
      width:'100%',
      height:'3vw',
      marginLeft:'auto',
      marginRight:'auto',
      
    },
 
    input: {
     width:'100%',
      background:'white',
      padding:'10px',
      marginBottom:'10px',
    },
  
  });
class Email extends Component {
    constructor(props){
        super(props);
        this.state={
email:null,
        }
        this.checkMe=this.checkMe.bind(this);
    }
    handleEvent=(event)=>{

        this.setState({ [event.target.name]:event.target.value})
       }

    checkMe(){
if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email))
   {
this.props.updateEmail(this.state.email)
this.props.next();
   }
   else alert("Please enter a valid email address")
}
    render() { 
        const {classes}=this.props;
        return ( <div style={{width:'50%',margin:'auto'}}>
        <p style={{margin:'0px',fontSize:'24px',lineHeight:'32px',fontWeight:'bold',fontFamily:'SF UI Text'}}> Password Reset </p>
 <p style={{paddingTop:'0px',paddingBottom:'10px',marginBottom:'0px',fontSize:'15px',color:'grey',lineHeight:'24px'}}> To reset your password, enter the email address you use to sign in to <span style={{color:'#2493F3'}}>NablaTest</span> </p>

 <Input
     placeholder="Your email"
     className={classes.input}
     onChange={this.handleEvent}
     inputProps={{
       'aria-label': 'description',
     }}
     name='email'
     value={this.state.email}
   />
  
     
 <Button onClick={this.checkMe} variant="contained" color="primary" style={{background:'#2493F3'}} className={classes.button}>
     Continue
   </Button>
 
          
     
     
     </div>  );
    }
}
 
export default withStyles(styles1)(Email);