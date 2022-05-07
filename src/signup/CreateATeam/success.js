import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


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
    
  
  });

class Success extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {classes}=this.props;
        return ( <div style={{width:'50%',margin:'auto'}}>
            <p style={{margin:'0px',fontSize:'24px',lineHeight:'32px',fontWeight:'bold',fontFamily:'SF UI Text'}}>Team has created <br/> successfully!</p>
   
   
    <p style={{paddingTop:'10px',fontSize:'15px',color:'grey',lineHeight:'24px',fontFamily:'SF UI Text'}}>Now start to build your dashboard <br/> and drone flight plan</p> 
    <Button variant="contained" color="primary" style={{background:'#2493F3'}} className={classes.button} onClick={()=>{this.props.history.push('./Dashboard')}}>
        View Dashboard
      </Button>
      <p style={{paddingTop:'10px',fontSize:'13px',color:'grey',lineHeight:'19px',fontFamily:'SF UI Text'}}>Dont know your team's name? <span onClick={()=>{this.props.history.push('./findYourTeam')}} className="link" >Find Your team</span></p>  
        
        
        </div> );
    }
}
 
export default withStyles(styles1)(Success);