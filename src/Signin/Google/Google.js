import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import GoogleImage from './Google.png'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PostData from './postData';
import MyContext from '../../themeContext';

// function minHeight () {

//   if (window.innerWidth<736){
//     return ("70px");
//   }
//   else return ("40px");
// }

const styles1 =theme => ({
    button: {
      marginBottom:'0px',
      marginTop: '10px',
      minWidth:'150px',
      width:'100%',
     
      
      marginLeft:'auto',
      marginRight:'auto',}
    });

class Google extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
  
     responseGoogle = (response) => {
      

      if(response.error){

if(response.details)
      //  {alert(response.details)} 
       console.log(response)
       
      }
    else if (  (PostData(response,"null")) && ! (response.error) )
         {  this.context.updateValue('res',response)
     
         this.props.history.push("/Select")
      }
 
   }

    render() { 
    
        const {classes}=this.props;
        return ( 

            <div>
           <GoogleLogin
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
    clientId="716768602586-37q4jfko2gfv9l3rf8poijnllm5sfvpu.apps.googleusercontent.com"
    render={renderProps => (
        <Button   onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained" color="primary" style={{background:'white',color:'#2493F3',paddingLeft:'50px'}} className={classes.button} >
        <img style={{position:'absolute',left:'20px'}}width="24px" alt="Google" src={GoogleImage}/>
        Login with Google
      </Button>
    )}
    buttonText="Login"
   
    cookiePolicy={'single_host_origin'}
  />
 
 {/* <Button onClick={()=>{app.updateValue('res','aaa')}}>one </Button>
  <Button onClick={()=>{alert(app.state['res'])}}>two </Button> */}
                       </div>


            
         );
    }
}
Google.contextType = MyContext;
export default withStyles(styles1)(Google);