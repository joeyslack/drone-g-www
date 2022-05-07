import React, { Component } from 'react';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'; 
import withStyles from '@material-ui/core/styles/withStyles';

import AddUserDialog from './AddUserDialog';
import ResetPasswordDialog from './ResetPasswordDialog';
import UpdateUserDialog from './UpdateUserDialog';

import LockIcon from '@material-ui/icons/LockOutlined';

// import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

import Switch from '@material-ui/core/Switch';

import Fab from '@material-ui/core/Fab';

import MyContext from '../../themeContext';
import './ManageUser.css';

// import ResetImage from './reset.png';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

import GetData from './getData';
import PutData from './putData';

import DotLoader from 'react-spinners/DotLoader';





var rows = [
    {id:'1',name:'Jero Juujarvi',role:'Manager (MA)',email:'jero@gatherai.com' , enable:true },
    {id:'2',name:'Jess Singh',role:'Device (DE)',email: 'js@gatherai.com' , enable:true},
    {id:'3',name:'Ralph Jergensen',role:'Device (DE)',email:'ralph@gatherai.com' , enable:true },
    {id:'4',name:'Thomas Hansen',role:'Manager (MA)',email:'thomas@gatherai.com' , enable:true },
    {id:'5',name:'Rita Silva',role:'Device (DE)',email:'rita@gatherai.com' , enable:true},
    {id:'6',name:'Catarina Lopez',role:'Device (DE)',email:'catarina@gatherai.com' , enable:true },
    {id:'7',name:'Patricia Jansen',role:'Device (DE)',email:'patricia@gatherai.com' ,enable: true },
    {id:'8',name:'Lars Thomnsen',role:'Device (DE)',email:'lars@gatherai.com' , enable:true},
    {id:'9',name:'Tom Jones',role:'Employee (Em)',email:'tom@gatherai.com' ,enable: true},
    {id:'10',name:'Kasper Sol',role:'Employee (Em)',email:'kasper@gatherai.com' , enable:true },
    {id:'11',name:'Tiago Gomes',role:'Manager (MA)',email:'tiago@gatherai.com' , enable:true},
  ];  

  const styles8=theme=>({
    root: {
        marginLeft:'2%',
        width: '92%',
        
        overflowX: 'auto',
        paddingLeft:'2%',
        paddingRight:'2%',
      },
      table: {
        minWidth: 650,
        fontWeight:'bold'
      },
  });

  


class ManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = { rows:[] , dialogopen:false , resetdialogopen:false, updatedialogopen:false}
        this.initialize=this.initialize.bind(this);
        this.setUser=this.setUser.bind(this);


    }

    componentDidMount()
    {
        document.getElementById('ManageUserDiv').classList.add(this.context.state.activeClass);
        this.initialize();
    }

  

    

    initialize(){
      // let additionalData={
      //     token:this.context.state.token,
      // }
      // GetData(this.context.state.baseUrl+'/teams/users',additionalData,this.setUser)
      this.getUser();
    }

    getUser=()=>{
      this.setState({UserResponse:null})
      let additionalData={
          token:this.context.state.token,
      }
      GetData(this.context.state.baseUrl+'/teams/users',additionalData,this.setUser)

    }

    setUser(response,token){
      
      if(response.responseCode=='Success')
      {   
          this.context.updateValue('token',token)
          this.setState({rows:response.response.users,UserResponse:'Success'})
          this.context.updateSession(token)
      }
      else if (response.status==401){
        this.context.logout();
      }
    
      else console.log(response)

    }
    handleSwitch = id => event =>  {

      if(event.target.checked==false)
      {
        this.BlockUser(id)
      }
      else if (event.target.checked==true)
      {
        this.UnblockUser(id)
      }
    

      // const rows=this.state.rows;
      // rows.find(row => row.profileId==id ).isActive=event.target.checked;
      // this.setState({ rows });
    };

    handleDialogClose = (updated) => {
      this.setState({dialogopen:false})
      if(updated==true)
      {
        this.getUser();
      }
    }

    handleDialogOpen = () => {
      this.setState({dialogopen:true})
    }

    handleResetDialogClose = () => {
      this.setState({resetdialogopen:false})
    }

    handleResetDialogOpen = () => {
      this.setState({resetdialogopen:true})
    }

    handleUpdateDialogClose = () => {
      this.setState({updatedialogopen:false})
    }

    handleUpdateDialogOpen = () => {
      this.setState({updatedialogopen:true})
    }

    resetClick = (userId) =>
    {
      this.setState({userId});
      this.handleResetDialogOpen();
    }

    updateClick = (fname,lname,mobile,role) =>
    {
      console.log(fname,lname,mobile,role);
    }

    BlockUser = (userId) =>
    {
      let additionalData={
        token:this.context.state.token,
        body:{}
      }
      PutData(this.context.state.baseUrl+'/users/'+userId+'/block',additionalData,this.block)
    }
    
    UnblockUser = (userId) =>
    {
      let additionalData={
        token:this.context.state.token,
        body:{}
      }
      PutData(this.context.state.baseUrl+'/users/'+userId+'/unblock',additionalData,this.block) 
    }

    block= () =>
    {
      this.getUser();
    }

    render() { 
        const {classes}=this.props;
        return ( 
        <div id="ManageUserDiv">
        
        <AddUserDialog handleClose={this.handleDialogClose} open={this.state.dialogopen} />
        <UpdateUserDialog fname={this.state.fname} lname={this.state.lname} mobile={this.state.mobile} role={this.state.role} userId={this.state.userId} handleClose={this.handleDialogClose} open={this.state.updatedialogopen}/>
        <ResetPasswordDialog handleClose={this.handleResetDialogClose} open={this.state.resetdialogopen} userId={this.state.userId}/>
        {this.state.UserResponse==='Success'?<div style={{width:'calc(100% - 20px)',height:'100%',padding:'10px'}}>
        <Paper className={classes.root} style={{}}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell style={{fontFamily:' SF UI Text Regular',fontSize: 13,color: '#8B90A0',}} align="left">Name</TableCell>
                  <TableCell style={{fontFamily:' SF UI Text Regular',fontSize: 13,color: '#8B90A0',}} align="left">Role</TableCell>
                  <TableCell style={{fontFamily:' SF UI Text Regular',fontSize: 13,color: '#8B90A0',}} align="left">Email</TableCell>
                  {/* <TableCell style={{fontFamily:' SF UI Text Regular',fontSize: 13,color: '#8B90A0',}} align="center">Manage</TableCell> */}
                  <TableCell style={{fontFamily:' SF UI Text Regular',fontSize: 13,color: '#8B90A0',}} align="center">Reset password</TableCell>
                  <TableCell style={{fontFamily:' SF UI Text Regular',fontSize: 13,color: '#8B90A0',}} align="center">Enable/Disable</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.map( (row,index) => (
                  <TableRow key={row.profileId + '_' + row.firstName}>
                    <TableCell style={{fontFamily:' SF UI Text Regular',fontSize: 13,}} component="th" scope="row">
                      {row.firstName + " " + row.lastName} 
                    </TableCell>
                    {/* <TableCell style={{fontFamily:' SF UI Text Regular',fontSize: 13,}} align="left">{row.type}</TableCell> */}
                    <TableCell style={{fontFamily:' SF UI Text Regular',fontSize: 13,}} align="left">User</TableCell>
                    <TableCell style={{fontFamily:' SF UI Text Regular',fontSize: 13,}} align="left">{row.email}</TableCell>
                    {/* <TableCell align="center">
                      <Button size="small" style={{height:'40px',backgroundColor:'white'}}  variant="contained" color="default"> <EditIcon size="small" color="primary"/></Button>
                    </TableCell> */}

                    <TableCell align="center">
                      <Button size="small" style={{height:'40px',backgroundColor:'white'}}  variant="contained" color="default">
                        {/* <img src={ResetImage} alt="Reset password"></img> */}
                        <RotateLeftIcon size="small" color="primary" onClick={()=>this.resetClick(row.profileId)}/>
                      </Button>
                    </TableCell>

                    <TableCell align="center">
                      {/* <Switch
                          checked={row.isActive}
                          onChange={this.handleSwitch(row.profileId)}
                          color="primary"
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        /> */}
                        <LockIcon fontSize="large" color="primary" />
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          <Fab onClick={this.handleDialogOpen}  color="primary" style={{position:'fixed',bottom:'20px',right:'30px',height:'40px'}}  variant="extended" >
            <AddIcon />
          </Fab>
        </div>
        :
        <div style={{textAlign:'center',paddingTop:'20px',height:'calc(100vh - 144px)', width:'100%'}}>
          <div style={{background:'',position: 'fixed',top: '50%',left: '50%', transform: 'translate(-50%, -50%)'}}>
  
              <DotLoader sizeUnit={"px"} size={50} color={'#e7e7e7'} loading={true} />
      
              
          </div>
        </div>}

        </div> );
    }
}
ManageUser.contextType=MyContext; 
export default withStyles(styles8)(ManageUser);