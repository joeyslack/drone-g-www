import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import GetData from './getDatawithIndex';


import Fab from '@material-ui/core/Fab';






const styles1 =theme => ({
    button: {
      marginBottom:'0px',
      marginTop: '10px',
      minWidth:'150px',
      width:'100%', 
     

      
      marginLeft:'auto',
      marginRight:'auto',
      
    },
    textField: {
      borderRadius:'0px',
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
    fab: { marginLeft: theme.spacing(0),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
      input: {
        marginBottom:'10px',
        minWidh:'150px',
        width:'100%',
        background:'white',
        padding:'10px'
      },
  
  });
  
class TeamMember extends Component {
    constructor(props) {
        super(props);
        this.state = { teams:[ {0:"",error:false, errorMessage:""},{1:"",error:false, errorMessage:""},{2:"",error:false , errorMessage:""} ] }
        this.addMore=this.addMore.bind(this);
        this.checkMe=this.checkMe.bind(this);
        this.handleBlur=this.handleBlur.bind(this);
        this.getData=this.getData.bind(this);
       
    }
    handleState=(event)=>{
     let newteams=this.state.teams;
    
    newteams[event.target.name][event.target.name]=event.target.value
    newteams[event.target.name].error=false
    newteams[event.target.name].errorMessage=""
    
     this.setState({teams:newteams})
// this.state.teams[event.target.name])


    }





    checkMe(){
   
      //bool to check all emails
       let allcorrect=true;
let morethanone=false;
      this.state.teams.forEach( (items,index)=>{
        
 if(items[index]){ 
   
morethanone=true;
  //if email is entered
  if( !(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(items[index]) ) )
  {allcorrect=false;
  }
  //else {allcorrect=false;} 
 }
      
      })
      if(morethanone)
    {
      if(allcorrect===true){  this.props.next();  }
      else {alert("Please enter a valid email address")}
    }
    else alert("No team member email entered")
  
  }



    addMore(){
      let newteams=this.state.teams;
      newteams=[...this.state.teams,{ [this.state.teams.length+1]:'',error:false,errorMessage:""}]
        this.setState({teams:newteams});


    }

    handleBlur(event)
    {  let value=event.target.value;
      let index=event.target.name;
      if(value==="")
      {  }
      else if ( !(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ) )
     {
      let newteams=this.state.teams;
    
      
      newteams[index].error=true
      newteams[index].errorMessage="Please enter a valid email address";
       this.setState({teams:newteams})
       
     }
     else if (value===this.props.email)
     {
      let newteams=this.state.teams;
    
      
      newteams[index].error=true
      newteams[index].errorMessage="You cannot invite yourself"
      this.setState({teams:newteams})
       

     }
      else 
      {  
        GetData("http://localhost:26805/users/"+value,index, this.getData );
      
      } 
    }

    

      getData(valid,index){

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
              let newteams=this.state.teams;
    
      
      newteams[index].error=true
      newteams[index].errorMessage="Email Available"
      this.setState({teams:newteams})
            }
              else
              {
                let newteams=this.state.teams;
                newteams[index].error=true
                newteams[index].errorMessage="User already exist in a different team"
                this.setState({teams:newteams})
                
              }
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




    



    render() { 
        const {classes}=this.props;
        return ( <div style={{width:'50%',margin:'auto'}}>
            <Toolbar>
          <p style={{margin:'auto',fontSize:'24px',lineHeight:'32px',fontWeight:'bold',fontFamily:'SF UI Text'}}>Sign in to your team</p>
    </Toolbar>
    <p style={{paddingTop:'0px',paddingBottom:'10px',marginBottom:'0px',fontSize:'15px',color:'grey',lineHeight:'24px'}}>Enter your team's name</p>
    {this.state.teams.map((team,index)=>
    <div>
    
      
 <Input
        placeholder="Team member email address"
        className={classes.input}
        inputProps={{
          'aria-label': 'description',
        }}
        name={index}  
        value={team[index]} 
        onBlur={this.handleBlur} 
        onChange={this.handleState}
        type="email"
        />

      {team.error?team.errorMessage===""?<span>UNDEFINED ERROR</span> :<span>{team.errorMessage}</span>:null}

        
       
        
    </div>
    )}
 
    <div style={{float:'left',width:'100%',margin:'0px',padding:'0px'}}> 
    <Toolbar>
    <Fab  size="small" style={{background:'white',float:'left',color:'#2493F3'}}  aria-label="add" className={classes.fab} onClick={this.addMore} >
        <AddIcon /> 
      </Fab>
      <p style={{paddingTop:'0px',paddingBottom:'13px',marginBottom:'0px',fontSize:'13px',color:'grey'}}>Add more</p>
      </Toolbar>
   
    </div>
      <br/>
    <Button variant="contained" color="primary" style={{background:'#2493F3'}} className={classes.button} onClick={this.checkMe}>
        Add Team Members
      </Button>
      <p style={{paddingTop:'10px',fontSize:'13px',color:'grey',lineHeight:'19px',fontFamily:'SF UI Text'}}> Or <span className="link"  onClick={this.props.next}>Skip for now</span></p>  
        
        
        </div> );
    }
}
 
export default withStyles(styles1)(TeamMember);