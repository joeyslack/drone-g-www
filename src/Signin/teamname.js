import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import PostData from './postDataDirect';
import Modal from '@material-ui/core/Modal';
import ClipLoader from 'react-spinners/ClipLoader';
import CircleLoader from 'react-spinners/CircleLoader';
import DotLoader from 'react-spinners/DotLoader';
import GetData from './getDataDirect';



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
     width:'100%',
      background:'white',
      padding:'10px'
    },
  
  });

class Team extends Component {
    constructor(props) {
        super(props);
        this.state = { team:'',loading:false,error:false }
        this.checkMe=this.checkMe.bind(this);
        this.getData=this.getData.bind(this);
    }
    checkMe(){
      if(this.state.team.length>0)
         {
          
          this.setState({loading:true})

          var credentials = { 'Method': 'ANONYMOUS', 'MethodIdentity': 'GUEST', 'TeamName': this.state.team, 'MethodPasscode': 'GUEST', 'DeviceKey': 'MyPC', 'ApplicationKey': 'MyBrowser', 'Platform': 'DESKTOP' };
          GetData("http://localhost:26805/teams/",credentials, this.getData  );

         }

         else alert("Please enter a valid team name")
      }

      getData(valid){

        this.setState({loading:false})
      console.log(valid)

if(valid)
{  
        if(valid.responseCode=="Success")
        {
          if(valid.response)
          {
            if(valid.response.isValid==true)
            {
                this.props.updateState('team',this.state.team);
                this.props.next();
            }
              else {  console.log('Invalid Team'); this.setState({error:true}) }
          }
            else alert("Undefined Response")
        }
        else
        {
          console.log(valid.validationErrorsList[0].errorMessage)
          this.setState({error:true})
        }
}
else{ alert("Undefined Response") }
        
      
      }

      updateState=(event)=>
      { 
        this.setState({ error:false,[event.target.name]:event.target.value})
      }
    render() { 
        const {classes}=this.props;
        return ( 
        
        <div style={{}}>


         
  {this.state.loading?
    
       <div style={{marginLeft:'calc(50% - 50px)',height:'130px'}} >
       <DotLoader sizeUnit={"px"} size={50} color={'#e7e7e7'} loading={true} />
        </div>
       
       
       :
         
         
        
        
        <div style={{width:'50%',margin:'auto'}}>
            <p style={{margin:'0px',fontSize:'24px',lineHeight:'32px',fontWeight:'bold',fontFamily:'SF UI Text'}}>Sign in to your team</p>
    <p style={{paddingTop:'0px',paddingBottom:'10px',marginBottom:'0px',fontSize:'15px',color:'grey',lineHeight:'24px'}}>Enter your teams's name</p>
    <Input
        placeholder="Team Name"
        className={classes.input}
        inputProps={{
          'aria-label': 'description',
        }}
        value={this.state.team}
        onChange={this.updateState}
        name='team'
        error={this.state.error}
      />
      <br/>
      {this.state.error?<div style={{color:'red'}}> Invalid Team Name !</div>:null}
    <Button variant="contained" color="primary" style={{background:'#2493F3'}} className={classes.button} onClick={this.checkMe}>
        Continue
      </Button>
      { /* <p style={{paddingTop:'10px',fontSize:'13px',color:'grey',lineHeight:'19px',fontFamily:'SF UI Text'}}>Dont know your team's name? <a className="link" href="./findYourTeam" onClick={(event)=>{ event.preventDefault(); this.props.history.push('./findYourTeam')}}>Find Your team</a></p> */}
        
        
        </div> }
        
        </div> );
    }
}
 
export default withStyles(styles1)(Team);