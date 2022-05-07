import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import PasswordDialog from './PasswordDialog';
// // import EmailDialog from './EmailDialog';
 import UpdateDialog from './UpdateDialog';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import Paper from '@material-ui/core/Paper';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';


import './Profile.css'


// import RingLoader from 'react-spinners/RingLoader';


import MyContext from '../themeContext';



class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {  NdialogOpen:false, PdialogOpen:false, email:null,name:null,credits:null,lastLogin:null, memberType:null , userSince:null ,oldpassword:null }
        this.initialize=this.initialize.bind(this);

    }

    componentDidUpdate(prevProps) {
        
    }

    componentDidMount()
    {  
        document.getElementById('ProfileDiv').classList.add(this.context.state.activeClass);
        this.initialize();
    }

    initialize()
    {

    }

      


    PhandleClickOpen = () => {
        this.setState({PdialogOpen:true});
    };

    PhandleClose = () => {
        this.setState({PdialogOpen:false});
    };


    NhandleClickOpen = () => {
    this.setState({NdialogOpen:true});
    };

    NhandleClose = () => {
        this.setState({NdialogOpen:false});
    };

      
     


    render() { 
        return ( 
        
            <div id="ProfileDiv">
             
                <div style={{width:'calc(100% - 20px)',height:'100%',padding:'10px'}}>
                <PasswordDialog open={this.state.PdialogOpen} handleClose={this.PhandleClose} userid={this.context.state.userid} />
                {/* <EmailDialog    open={this.state.EdialogOpen} handleClose={this.EhandleClose}  /> */}
                <UpdateDialog     open={this.state.NdialogOpen} handleClose={this.NhandleClose}  fName={this.context.state.firstName}  userid={this.context.state.userid} lName={this.context.state.lastName} mobile={this.context.state.mobile} user={this.context.state.user}/>
                    <Paper id="ProfilePaper" >

                        <span className="ProfileBlock ProfileAlignRight">

                        <span id="ProfileEditIcon" >
                        <IconButton aria-label="edit"  size="medium" onClick={this.NhandleClickOpen}>
                            <EditIcon fontSize="inherit" />
                            </IconButton>
                        </span>

                        </span>
                        

                        <span className="ProfileBlock">
                        <span className="ProfileText1" >
                            <span className="ProfileText3">Name :</span>
                            <span className="ProfileText4"> {this.context.state.firstName + " " + this.context.state.lastName} </span>
                        </span>
                       
                        </span>
                        <br/> <br/>

                        <span className="ProfileBlock">
                        <span  className="ProfileText1">
                            <span className="ProfileText3"> Email :  </span>
                            <span className="ProfileText4">{this.context.state.email}</span>
                            </span>
                        </span>
                        <br/> <br/>

                        <span className="ProfileBlock">
                        <span  className="ProfileText1">
                            <span className="ProfileText3"> Mobile :  </span>
                            <span className="ProfileText4"> {this.context.state.mobile}</span>
                            </span>
                        </span>
                        
                        <br/> <br/>

                    

                        <br/> <br/>

                        
                    </Paper>

                    <div id="ProfileChangePassword">
                    <Button style={{width:'100%',background:'white',color:'#2493F3'}} variant="contained" onClick={this.PhandleClickOpen}>
                        <div style={{display: 'flex',alignItems: 'center'}}>
                            <RotateLeftIcon/> 
                            <span style={{fontFamily:'SF UI Text Bold',paddingLeft:'15px'}}> Change Password </span>
                            
                        </div> 
                    </Button>
                    </div>
            
                </div>
                 {/* :
                 <div style={{background:'',position: 'fixed',top: '50%',left: '50%', transform: 'translate(-50%, -50%)'}}>
                   <Loader
                   type="RevolvingDot"
                   color="#00BFFF"
                   height={100}
                   width={100}
                   timeout={3000} //3 secs
                   />
                 </div></div> */}
            </div>
            
        
        );
    }
}

Profile.contextType=MyContext;
 
export default Profile ;