import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';

import DotLoader from 'react-spinners/DotLoader';
import GetData from './getDataDirect';
import MyContext from '../../themeContext';


const styles1 =theme => ({
    button: {
      marginBottom:'0px',
      marginTop: '10px',
      minWidth:'150px',
      minHeight:'40px',
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
      minWidth:'150px',
     width:'100%',
      background:'white',
      padding:'10px'
    },
  
  });

class Team extends Component {
    constructor(props) {
        super(props);
        this.state = { team:'',error:false,loading:false,errorMessage:'' }
        this.checkMe=this.checkMe.bind(this)
        this.getData=this.getData.bind(this);
    }
    checkMe(){
      if(this.state.team.length>0)
         {
         
          this.setState({loading:true})
          GetData("http://localhost:26805/teams/"+this.state.team,this.context.state.token, this.getData );
      //this.props.updateEmail(this.state.email)
      
         }
         else alert("Please enter a valid team name")
      }

      getData(valid){

        this.setState({loading:false})
      console.log(valid,"valid")

if(valid)
{   
        if(valid.responseCode==="Success")
        {  console.log(valid.response,"valid . response")
          if(valid.response)
          {
            if(valid.response.isExist===false)
            {
                this.props.updateState('team',this.state.team);
                this.props.next();
            }
              else {   this.setState({error:true, errorMessage:'Team Name already Exist'}) }
          }
            else {this.setState({error:true, errorMessage:'Undefined Response'}) }
        }
        else
        {
          this.setState({error:true, errorMessage:'UnAuthoraized , Please Refresh the page'}) 
        }
}
else{ this.setState({error:true, errorMessage:'Undefined Response'}) }
        
      
      }


    UpdateState=(event)=>{

      this.setState({ error:false, [event.target.name]:event.target.value})
     }
    render() { 
        const {classes}=this.props;
        return ( 
          <div style={{}}>


         
          {
            this.state.loading?
            
               <div style={{marginLeft:'calc(50% - 50px)',height:'150px'}} >
               <DotLoader sizeUnit={"px"} size={50} color={'#e7e7e7'} loading={true} />
                </div>
               
               
               :
        
        
        <div style={{width:'50%',margin:'auto'}}>
           <Toolbar>
            <p style={{margin:'auto',fontSize:'24px',lineHeight:'32px',fontWeight:'bold',fontFamily:'SF UI Text'}}>Name your team</p>
            </Toolbar>
    <p style={{paddingTop:'0px',paddingBottom:'10px',marginBottom:'0px',fontSize:'15px',color:'grey',lineHeight:'24px'}}>What's the name of your team?</p>
    <Input
        placeholder="Team Name"
        className={classes.input}
        inputProps={{
          'aria-label': 'description',
        

        }}
        name='team'
        value={this.state.team}
        onChange={this.UpdateState}
      />
       {this.state.error?<div style={{color:'red'}}> {this.state.errorMessage}</div>:null}

      <br/>
    <Button variant="contained" color="primary" style={{background:'#2493F3'}} className={classes.button} onClick={this.checkMe}>
        Continue
      </Button>
      
        
        
      </div>}

      </div> );
    }
}
Team.contextType = MyContext;
export default withStyles(styles1)(Team);